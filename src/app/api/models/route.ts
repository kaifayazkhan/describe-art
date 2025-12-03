import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { model } from '@/drizzle/schema';
import { NextRequest, NextResponse } from 'next/server';
import { modelAspectRatioSupport } from '@/utils/imageDimension';

export const GET = async (req: NextRequest) => {
  try {
    const response = await db
      .select({
        id: model.id,
        displayName: model.displayName,
        modelId: model.modelId,
        provider: model.provider,
      })
      .from(model)
      .where(eq(model.isActive, true));

    if (!response || response.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'Models not found',
          data: [],
        },
        { status: 200 },
      );
    }

    const data = response.map((item) => ({
      ...item,
      supportedDimensions:
        modelAspectRatioSupport[
          item.modelId as keyof typeof modelAspectRatioSupport
        ] ?? [],
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'Models retrieved successfully',
        data: data,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : null,
      },
      { status: 500 },
    );
  }
};
