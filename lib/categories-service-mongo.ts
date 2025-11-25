import { connectToDatabase } from '@/lib/mongodb';
import Category from '@/models/Category';
import { Category as CategoryType } from '@/types';

export async function getCategories(): Promise<CategoryType[]> {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 });
    
    return categories.map(category => ({
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.createdAt
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryType | null> {
  try {
    await connectToDatabase();
    const category = await Category.findOne({ slug });
    
    if (!category) return null;
    
    return {
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      createdAt: category.createdAt
    };
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}