import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products-service-mongo';

export async function GET() {
  try {
    const products = await getProducts();
    
    return NextResponse.json({
      data: products,
      message: 'Products fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        data: [],
        message: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}