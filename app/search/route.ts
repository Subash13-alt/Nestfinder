import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const filters = await request.json();
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    // Build query
    const query: any = { status: 'verified' };
    
    // Location filter
    if (filters.location && filters.location !== 'all') {
      query.location = { $regex: filters.location, $options: 'i' };
    }
    
    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = parseInt(filters.minPrice);
      if (filters.maxPrice) query.price.$lte = parseInt(filters.maxPrice);
    }
    
    // BHK filter
    if (filters.bhk && filters.bhk !== 'all') {
      query.bedrooms = parseInt(filters.bhk);
    }
    
    // Property type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      query.propertyType = filters.propertyType;
    }
    
    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $all: filters.amenities };
    }
    
    // Sort
    let sortOption = {};
    switch (filters.sortBy) {
      case 'price_low':
        sortOption = { price: 1 };
        break;
      case 'price_high':
        sortOption = { price: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
    
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 12;
    const skip = (page - 1) * limit;
    
    const [properties, total] = await Promise.all([
      db.collection('properties')
        .find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection('properties').countDocuments(query),
    ]);
    
    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}