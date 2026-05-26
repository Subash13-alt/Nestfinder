import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Get user's favourites
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    const favourites = await db.collection('favourites')
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: 'properties',
            localField: 'propertyId',
            foreignField: '_id',
            as: 'property',
          },
        },
        { $unwind: '$property' },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
    
    return NextResponse.json(favourites);
  } catch (error) {
    console.error('Favourites GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Add to favourites
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { propertyId } = await request.json();
    
    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    // Check if already exists
    const existing = await db.collection('favourites').findOne({
      userId: new ObjectId(userId),
      propertyId: new ObjectId(propertyId),
    });
    
    if (existing) {
      return NextResponse.json({ message: 'Already in favourites' }, { status: 200 });
    }
    
    await db.collection('favourites').insertOne({
      userId: new ObjectId(userId),
      propertyId: new ObjectId(propertyId),
      createdAt: new Date(),
    });
    
    return NextResponse.json({ message: 'Added to favourites' }, { status: 201 });
  } catch (error) {
    console.error('Favourites POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Remove from favourites
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get('propertyId');
    
    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    await db.collection('favourites').deleteOne({
      userId: new ObjectId(userId),
      propertyId: new ObjectId(propertyId),
    });
    
    return NextResponse.json({ message: 'Removed from favourites' });
  } catch (error) {
    console.error('Favourites DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}