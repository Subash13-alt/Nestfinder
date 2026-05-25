'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export default function CreateListingPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Demo: Property listing creation would be implemented here');
  };

  return (
    <div className="min-h-screen px-5 py-10 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">List Your Property</h1>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Property Title" type="text" placeholder="e.g., Luxury 3BHK Apartment" required />
            <Input label="Price" type="text" placeholder="e.g., ₹84,00,000 or ₹28,000/mo" required />
            <Input label="Location" type="text" placeholder="e.g., Adyar, Chennai" required />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Bedrooms" type="number" placeholder="3" required />
              <Input label="Bathrooms" type="number" placeholder="2" required />
              <Input label="Area" type="text" placeholder="e.g., 1,420 sq.ft" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-1">Property Type</label>
              <select className="min-h-12 w-full rounded-lg border border-hero-foreground/18 bg-hero-foreground/10 px-4">
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-1">Property Images</label>
              <input type="file" multiple className="min-h-12 w-full rounded-lg border border-hero-foreground/18 bg-hero-foreground/10 px-4" />
            </div>
            <Button variant="primary" size="md" type="submit" className="w-full">
              Submit Listing
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
