import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Property from '@/lib/models/Property';

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({});
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Return fallback data if MongoDB fails
    const fallbackProperties = [
      { id: 1, title: 'Ocean View Penthouse', price: 45000000, location: 'Besant Nagar, Chennai', beds: 5, baths: 5, area: 3200, type: 'sale', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', featured: true },
      { id: 2, title: 'Luxury Villa with Pool', price: 12000000, location: 'ECR, Chennai', beds: 4, baths: 4, area: 3800, type: 'sale', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', featured: true },
    ];
    return NextResponse.json(fallbackProperties);
  }
}
