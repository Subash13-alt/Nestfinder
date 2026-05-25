import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Transaction from '@/lib/models/Transaction';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    body.transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
