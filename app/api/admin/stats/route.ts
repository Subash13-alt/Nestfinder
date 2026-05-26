import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    
    const client = await clientPromise;
    const db = client.db('nestfinder');
    
    // Get all counts in parallel
    const [
      totalProperties,
      verifiedProperties,
      pendingProperties,
      totalUsers,
      totalBookings,
      recentBookings,
      recentUsers,
    ] = await Promise.all([
      db.collection('properties').countDocuments(),
      db.collection('properties').countDocuments({ status: 'verified' }),
      db.collection('properties').countDocuments({ status: 'pending' }),
      db.collection('users').countDocuments(),
      db.collection('bookings').countDocuments(),
      db.collection('bookings').find().sort({ createdAt: -1 }).limit(5).toArray(),
      db.collection('users').find().sort({ createdAt: -1 }).limit(5).toArray(),
    ]);
    
    // Calculate revenue
    const revenueAgg = await db.collection('bookings')
      .aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ])
      .toArray();
    
    const totalRevenue = revenueAgg[0]?.total || 0;
    
    // Monthly bookings for chart
    const monthlyBookings = await db.collection('bookings')
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
            revenue: { $sum: '$amount' },
          },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
      ])
      .toArray();
    
    return NextResponse.json({
      stats: {
        totalProperties,
        verifiedProperties,
        pendingProperties,
        totalUsers,
        totalBookings,
        totalRevenue,
      },
      recentBookings,
      recentUsers,
      monthlyBookings: monthlyBookings.reverse(),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}