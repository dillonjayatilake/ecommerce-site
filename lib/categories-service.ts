import { sql } from '@vercel/postgres';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { rows } = await sql`
      SELECT * FROM categories ORDER BY name
    `;
    return rows as Category[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { rows } = await sql`
      SELECT * FROM categories WHERE slug = ${slug}
    `;
    return rows[0] as Category || null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}