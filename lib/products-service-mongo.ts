import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { Product as ProductType } from '@/types';

export async function getProducts(): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 });
    
    return products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      inventory: product.inventory,
      featured: product.featured,
      slug: product.slug,
      createdAt: product.createdAt
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    
    return products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      inventory: product.inventory,
      featured: product.featured,
      slug: product.slug,
      createdAt: product.createdAt
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug });
    
    if (!product) return null;
    
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      inventory: product.inventory,
      featured: product.featured,
      slug: product.slug,
      createdAt: product.createdAt
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductType[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ category: categorySlug }).sort({ createdAt: -1 });
    
    return products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      images: product.images,
      category: product.category,
      inventory: product.inventory,
      featured: product.featured,
      slug: product.slug,
      createdAt: product.createdAt
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}