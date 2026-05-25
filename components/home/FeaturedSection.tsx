'use client'

import { CheckCircle, Calendar } from 'lucide-react'

export default function FeaturedSection() {
  return (
    <section className="border-y border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000" 
            alt="Luxury villa with pool"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">Premium complex</p>
          <h2 className="text-4xl font-bold tracking-normal text-gray-900">Skyline Residences, Boat Club Road</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
            A RERA-approved luxury address with clubhouse, pool, concierge access, and verified ownership records.
          </p>
          
          <ul className="mt-6 grid gap-3 text-sm font-semibold text-gray-700 sm:grid-cols-2">
            <li className="flex items-center gap-2"><CheckCircle className="size-5 text-green-500" />Legal documents verified</li>
            <li className="flex items-center gap-2"><CheckCircle className="size-5 text-green-500" />Price benchmarked locally</li>
            <li className="flex items-center gap-2"><CheckCircle className="size-5 text-green-500" />Agent response under 10 min</li>
            <li className="flex items-center gap-2"><CheckCircle className="size-5 text-green-500" />Site visit slots available</li>
          </ul>
          
          <button className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-7 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-gray-800 hover:-translate-y-0.5">
            <Calendar className="size-4" />
            Schedule Visit
          </button>
        </div>
      </div>
    </section>
  )
}
