import { NextResponse } from 'next/server';
import { getCategories } from '@/lib/categories-service-mongo';

export async function GET() {
  try {
    const categories = await getCategories();
    
    return NextResponse.json({
      data: categories,
      message: 'Categories fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      {
        data: [],
        message: 'Failed to fetch categories',
      },
      { status: 500 }
    );
  }
}