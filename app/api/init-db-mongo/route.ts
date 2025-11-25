import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    
    // Insert categories
    const categories = await Category.insertMany([
      {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Latest gadgets and electronics'
      },
      {
        name: 'Clothing',
        slug: 'clothing', 
        description: 'Fashionable clothing for everyone'
      },
      {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Everything for your home'
      }
    ]);
    
    // Insert products
    await Product.insertMany([
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
        price: 99.99,
        originalPrice: 129.99,
        images: [],
        category: 'electronics',
        inventory: 15,
        featured: true,
        slug: 'wireless-bluetooth-headphones'
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track your health and fitness with this advanced smartwatch',
        price: 199.99,
        images: [],
        category: 'electronics', 
        inventory: 8,
        featured: true,
        slug: 'smart-fitness-watch'
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt',
        price: 29.99,
        images: [],
        category: 'clothing',
        inventory: 25,
        featured: false,
        slug: 'organic-cotton-tshirt'
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Keep your drinks hot or cold for hours with this premium water bottle',
        price: 34.99,
        originalPrice: 39.99,
        images: [],
        category: 'home-garden',
        inventory: 30,
        featured: true,
        slug: 'stainless-steel-water-bottle'
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable and stylish laptop backpack with multiple compartments',
        price: 49.99,
        images: [],
        category: 'electronics',
        inventory: 12,
        featured: false,
        slug: 'laptop-backpack'
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 beautiful ceramic coffee mugs',
        price: 24.99,
        images: [],
        category: 'home-garden',
        inventory: 40,
        featured: false,
        slug: 'ceramic-coffee-mug-set'
      }
    ]);
    
    return NextResponse.json({ 
      success: true,
      message: 'MongoDB database initialized and seeded successfully' 
    });
  } catch (error) {
    console.error('Error initializing MongoDB:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to initialize database' 
      },
      { status: 500 }
    );
  }
}