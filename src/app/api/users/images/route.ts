import { NextRequest, NextResponse } from 'next/server';
import { desc, eq, and, lt, count } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { request } from '@/drizzle/schema';
import { checkUserSession } from '@/utils/server/checkUserSession';

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  try {
    const userId = await checkUserSession(req);

    const limitParam = Number(params.get('limit'));
    const cursorParam = params.get('cursor');

    const limit = limitParam > 0 ? Math.min(limitParam, 20) : 5;
    const cursor = cursorParam ? new Date(cursorParam) : undefined;

    const [totalRequest] = await db
      .select({
        total: count(),
      })
      .from(request)
      .where(eq(request.userId, userId));

    const where = cursor
      ? and(eq(request.userId, userId), lt(request.createdAt, cursor))
      : eq(request.userId, userId);

    const response = await db.query.request.findMany({
      where,
      orderBy: [desc(request.createdAt)],
      columns: {
        id: true,
        prompt: true,
        createdAt: true,
      },
      with: {
        images: {
          columns: {
            id: true,
            storageKey: true,
            order: true,
            mimeType: true,
            seed: true,
            uploadedAt: true,
          },
        },
      },
      limit: limit + 1,
    });

    if (!response || response.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No image found',
          data: [],
          meta: {
            total: totalRequest.total,
            limit: limit,
            nextCursor: null,
          },
        },
        { status: 200 },
      );
    }

    let nextCursor = null;
    if (response.length > limit) {
      const nextItem = response.pop();
      nextCursor = nextItem?.createdAt.toISOString();
    }

    const parsedData = response.map((item) => {
      return {
        ...item,
        images: item.images.map((image) => {
          return {
            id: image.id,
            imageUrl: `${process.env.CLOUDFRONT_URL}/${image.storageKey}`,
            order: image.order,
            contentType: image.mimeType,
            seed: image.seed,
          };
        }),
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Images retrieved successfully',
        data: parsedData,
        meta: {
          total: totalRequest.total,
          limit: Number(limit),
          nextCursor: nextCursor,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Failed to retrieve users images', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error : null,
      },
      { status: 500 },
    );
  }
};
