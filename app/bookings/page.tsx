'use client';

import { BookingForm } from '@/components/shared/BookingForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookingContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property') || undefined;

  return <BookingForm propertyId={propertyId} />;
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
