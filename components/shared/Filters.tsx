'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';

export const Filters = () => {
  const [location, setLocation] = useState('Chennai, TN');
  const [propertyType, setPropertyType] = useState('Any Property');
  const [budget, setBudget] = useState('₹50L – ₹1.5Cr');

  return (
    <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
      <div className="rounded-xl border border-border bg-surface-glass p-3 shadow-lift backdrop-blur-xl">
        <div className="grid gap-2 sm:gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
          <div className="rounded-lg px-3 py-1.5 transition hover:bg-secondary sm:py-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full bg-transparent font-semibold text-foreground focus:outline-none"
            >
              <option>Chennai, TN</option>
              <option>Bengaluru, KA</option>
              <option>Mumbai, MH</option>
              <option>Delhi, DL</option>
              <option>Hyderabad, TG</option>
            </select>
          </div>
          <div className="rounded-lg px-3 py-1.5 transition hover:bg-secondary sm:py-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary">Property type</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="mt-1 block w-full bg-transparent font-semibold text-foreground focus:outline-none"
            >
              <option>Any Property</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Independent House</option>
              <option>Plot</option>
            </select>
          </div>
          <div className="rounded-lg px-3 py-1.5 transition hover:bg-secondary sm:py-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-primary">Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 block w-full bg-transparent font-semibold text-foreground focus:outline-none"
            >
              <option>₹50L – ₹1.5Cr</option>
              <option>Below ₹50L</option>
              <option>₹1.5Cr – ₹3Cr</option>
              <option>₹3Cr – ₹5Cr</option>
              <option>₹5Cr+</option>
            </select>
          </div>
          <Button variant="accent" size="md" className="w-full md:w-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
