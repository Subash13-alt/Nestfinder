'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  propertyId?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ propertyId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store booking in localStorage for demo
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ ...formData, propertyId, id: Date.now() });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    router.push('/bookings/success');
  };

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 sm:px-8">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-10">
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">Schedule a Site Visit</h2>
        <p className="text-muted-foreground mb-6">Fill in your details and our agent will contact you shortly.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <Input
            label="Preferred Date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <Input
            label="Preferred Time"
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
          <Button variant="primary" size="md" type="submit" className="w-full">
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
};
