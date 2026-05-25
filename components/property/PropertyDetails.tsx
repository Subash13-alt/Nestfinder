'use client';

import React from 'react';
import { Property } from '@/lib/dummy-data';
import { Button } from '@/components/common/Button';
import Link from 'next/link';

interface PropertyDetailsProps {
  property: Property;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-14 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl bg-hero shadow-lift">
          <img
            src={property.image}
            alt={property.title}
            width={1024}
            height={768}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover opacity-90"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Premium complex</p>
          <h2 className="font-display text-4xl font-bold tracking-normal text-foreground">{property.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">
            A RERA-approved luxury address with clubhouse, pool, concierge access, and verified ownership records.
          </p>
          <ul className="mt-6 grid gap-3 text-sm font-semibold text-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-success">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Legal documents verified
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-success">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Price benchmarked locally
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-success">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Agent response under 10 min
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-success">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              Site visit slots available
            </li>
          </ul>
          <Link href={`/bookings?property=${property.id}`}>
            <Button variant="primary" size="md" className="mt-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="m9 16 2 2 4-4"></path>
              </svg>
              Schedule Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
