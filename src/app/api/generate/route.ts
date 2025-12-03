import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import {
  GenerateImageSchema,
  GenerateImage,
} from '@/utils/server/generateImage';
import { db } from '@/drizzle/db';
import { model, request, image as requestImage } from '@/drizzle/schema';
import { checkUserSession } from '@/utils/server/checkUserSession';
import { uploadObject } from '@/utils/s3';
import { MODEL_CONFIG, ModelKeyType } from '@/utils/server/modelConfig';
import { AspectRatioTypeFlux, AspectRatioTypeSD } from '@/utils/imageDimension';

export const POST = async (req: NextRequest) => {
  const userId = await checkUserSession(req);

  if (!userId) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
        data: null,
      },
      { status: 401 },
    );
  }
  try {
    const requestBody = await req.json();

    const { success, data, error } = GenerateImageSchema.safeParse(requestBody);

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Validation error', error: error?.issues },
        { status: 400 },
      );
    }

    // Verify model
    const [imageModel] = await db
      .select({ id: model.id, model: model.modelId })
      .from(model)
      .where(and(eq(model.id, data?.modelId), eq(model.isActive, true)));

    if (!imageModel) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
        },
        { status: 400 },
      );
    }

    const config = MODEL_CONFIG[imageModel.model as ModelKeyType];

    if (!config) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unsupported model',
        },
        { status: 400 },
      );
    }

    if (data.imageCount > config.maxImages) {
      return NextResponse.json(
        {
          success: false,
          message: `This model only supports up to ${config.maxImages} image`,
        },
        { status: 400 },
      );
    }

    // Generate image
    const Generate = new GenerateImage(
      data.prompt,
      data.imageCount,
      data.aspectRatio as AspectRatioTypeSD | AspectRatioTypeFlux,
    );

    let response;
    switch (config.type) {
      case 'sd':
        response = await Generate.StableDiffusion(config.steps);
        break;
      case 'flux':
        response = await Generate.Flux(
          imageModel.model as Exclude<
            ModelKeyType,
            'stable-diffusion-xl-1024-v1-0'
          >,
          config.steps,
        );
        break;
      default:
        throw new Error('No image model found');
        break;
    }

    if (!response) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to generate Image',
          data: response,
        },
        { status: 500 },
      );
    }

    // Add request inside request table
    const [requestResponse] = await db
      .insert(request)
      .values({
        prompt: data?.prompt ?? '',
        imageCount: data?.imageCount,
        height: response.height,
        width: response.width,
        userId: userId.toString(),
        modelId: imageModel.id,
        steps: 35,
      })
      .returning({ requestId: request.id });

    if (!requestResponse || !requestResponse.requestId) {
      throw new Error('Failed to insert request in db');
    }

    // Upload all images to s3
    const uploadResults = await Promise.allSettled(
      response.images.map(async (image, index) => {
        const type = 'image/png';
        const imageBuffer = Buffer.from(image.base64, 'base64');

        const uploadKey = `${Date.now()}-${image.seed}.${response.format}`;
        await uploadObject(uploadKey, `image/${response.format}`, imageBuffer);

        return { key: uploadKey, seed: image.seed, order: index };
      }),
    );

    // Insert all image metadata inside image table
    const insertValues = uploadResults
      .filter((item) => item.status === 'fulfilled')
      .map((item, index) => {
        return {
          requestId: requestResponse.requestId,
          storageKey: item.value.key,
          order: item.value.order,
          mimeType: 'image/png',
          seed: item.value.seed,
        };
      });

    await db.insert(requestImage).values(insertValues).returning();

    const finalResponse = await db
      .select({
        prompt: request.prompt,
        imageUrl: requestImage.storageKey,
        contentType: requestImage.mimeType,
        order: requestImage.order,
        seed: requestImage.seed,
      })
      .from(request)
      .innerJoin(requestImage, eq(request.id, requestImage.requestId))
      .where(eq(request.id, requestResponse.requestId));

    return NextResponse.json(
      {
        success: true,
        message: 'Image generated successfully',
        data: finalResponse.map((item) => {
          return {
            imageUrl: `https://d16z51xdzcc5lg.cloudfront.net/${item.imageUrl}`,
            contentType: item.contentType,
            order: item.order,
            seed: item.seed,
          };
        }),
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error?.cause : null,
      },
      { status: 500 },
    );
  }
};
