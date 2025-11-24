import { sql } from '@vercel/postgres';

export async function seedDatabase() {
  try {
    // Insert categories
    await sql`
      INSERT INTO categories (name, slug, description) VALUES
      ('Electronics', 'electronics', 'Latest gadgets and electronics'),
      ('Clothing', 'clothing', 'Fashionable clothing for everyone'),
      ('Home & Garden', 'home-garden', 'Everything for your home')
      ON CONFLICT (slug) DO NOTHING;
    `;

    // Insert products
    await sql`
      INSERT INTO products (name, description, price, original_price, category_id, inventory, featured, slug) VALUES
      ('Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 99.99, 129.99, 1, 15, true, 'wireless-bluetooth-headphones'),
      ('Smart Fitness Watch', 'Track your health and fitness with this advanced smartwatch', 199.99, NULL, 1, 8, true, 'smart-fitness-watch'),
      ('Organic Cotton T-Shirt', 'Comfortable and sustainable organic cotton t-shirt', 29.99, NULL, 2, 25, false, 'organic-cotton-tshirt'),
      ('Stainless Steel Water Bottle', 'Keep your drinks hot or cold for hours', 34.99, 39.99, 3, 30, true, 'stainless-steel-water-bottle'),
      ('Laptop Backpack', 'Durable and stylish laptop backpack with multiple compartments', 49.99, NULL, 1, 12, false, 'laptop-backpack'),
      ('Ceramic Coffee Mug Set', 'Set of 4 beautiful ceramic coffee mugs', 24.99, NULL, 3, 40, false, 'ceramic-coffee-mug-set')
      ON CONFLICT (slug) DO NOTHING;
    `;

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}