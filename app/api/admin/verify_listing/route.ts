import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    
    const { propertyId } = await request.json();
    
    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    const result = await db.collection('properties').updateOne(
      { _id: new ObjectId(propertyId) },
      { 
        $set: { 
          status: 'verified',
          verifiedBy: admin.userId,
          verifiedAt: new Date(),
        },
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Listing verified successfully' });
  } catch (error) {
    console.error('Verify listing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}