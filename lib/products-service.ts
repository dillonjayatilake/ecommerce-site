import { sql } from '@vercel/postgres';
import { Product } from '@/types'; // Import from shared types

// Remove the local Product interface and use the shared one


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
    
    // Transform database rows to match your Product type
    return rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
      images: [], // Add empty images array or get from database if you have images
      category: row.category_slug, // Use category_slug as category
      inventory: row.inventory,
      featured: row.featured,
      slug: row.slug,
      createdAt: new Date(row.created_at)
    })) as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}