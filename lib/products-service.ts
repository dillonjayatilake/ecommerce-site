import { sql } from '@vercel/postgres';

export interface Product {
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
    return rows as Product[];
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
    return rows[0] as Product || null;
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
    return rows as Product[];
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
    return rows as Product[];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}