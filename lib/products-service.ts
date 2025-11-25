import { sql } from '@vercel/postgres';
import { Product } from '@/types';

interface DbProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category_id: number;
  inventory: number;
  featured: boolean;
  slug: string;
  category_name?: string;
  category_slug?: string;
  created_at: string;
}

const mapDbProductToProduct = (dbProduct: DbProduct): Product => ({
  id: dbProduct.id.toString(),
  name: dbProduct.name,
  description: dbProduct.description,
  price: Number(dbProduct.price),
  originalPrice: dbProduct.original_price ?? undefined,
  images: [], // No image column yet, provide empty placeholder
  category: dbProduct.category_slug ?? 'uncategorized',
  categoryId: dbProduct.category_id,
  categorySlug: dbProduct.category_slug,
  categoryName: dbProduct.category_name,
  inventory: dbProduct.inventory,
  featured: dbProduct.featured,
  slug: dbProduct.slug,
  createdAt: dbProduct.created_at,
});

export async function getProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `;
    return rows.map(mapDbProductToProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { rows } = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ${slug}
    `;
    const product = rows[0] as DbProduct | undefined;
    return product ? mapDbProductToProduct(product) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.featured = true
      ORDER BY p.created_at DESC
      LIMIT 6
    `;
    return rows.map(mapDbProductToProduct);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const { rows } = await sql`
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ${categorySlug}
      ORDER BY p.created_at DESC
    `;
    return rows.map(mapDbProductToProduct);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}