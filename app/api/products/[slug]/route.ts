import { NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/products-service';

interface Context {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(request: Request, { params }: Context) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: product,
      message: 'Product fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch product',
      },
      { status: 500 }
    );
  }
}