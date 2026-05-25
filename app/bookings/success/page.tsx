'use client';

import { Button } from '@/components/common/Button';
import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-20">
      <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 shadow-lift text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-success p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-12">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-6">Your site visit has been scheduled. Our agent will contact you shortly.</p>
        <div className="space-y-3">
          <Link href="/dashboard">
            <Button variant="primary" size="md" className="w-full">View My Bookings</Button>
          </Link>
          <Link href="/listings">
            <Button variant="outline" size="md" className="w-full">Browse More Properties</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
