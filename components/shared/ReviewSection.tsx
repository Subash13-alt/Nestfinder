'use client';

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent service! Found my dream home within a week.',
      date: '2024-12-15',
    },
    {
      id: 2,
      name: 'Priya Patel',
      rating: 4,
      comment: 'Verified properties saved me from potential scams.',
      date: '2024-12-10',
    },
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 sm:px-8">
      <h2 className="font-display text-3xl font-bold text-foreground mb-6">Client Reviews</h2>
      
      {/* Review Form */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft mb-8">
        <h3 className="text-lg font-bold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Your Name"
            type="text"
            placeholder="Enter your name"
            required
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-1">Rating</label>
            <select
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="min-h-12 w-full rounded-lg border border-hero-foreground/18 bg-hero-foreground/10 px-4"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-1">Your Review</label>
            <textarea
              placeholder="Share your experience..."
              required
              rows={4}
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="min-h-12 w-full rounded-lg border border-hero-foreground/18 bg-hero-foreground/10 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button variant="primary" size="sm" type="submit">Submit Review</Button>
        </form>
      </div>
      
      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-card-foreground">{review.name}</h4>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={i < review.rating ? '#e11d48' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 text-accent"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
