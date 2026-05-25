'use client';

import { PropertyDetails } from '@/components/property/PropertyDetails';
import { properties } from '@/lib/dummy-data';
import { notFound } from 'next/navigation';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find(p => p.id === params.id);
  
  if (!property) {
    notFound();
  }

  return <PropertyDetails property={property} />;
}
