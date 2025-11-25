import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed-data';
import { initializeDatabase } from '@/lib/db';


export async function GET() {
  try {
    await initializeDatabase();
    await seedDatabase();
    
    return NextResponse.json({ 
      message: 'Database initialized and seeded successfully' 
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}