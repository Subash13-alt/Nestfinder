'use client'

import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { optimizedImages } from '@/lib/images'

export default function HeroSection() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold mb-4">
              <ShieldCheck className="size-3 text-gray-600" />
              <span className="text-gray-700">RERA Verified</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find your dream home with confidence.
            </h1>
            
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              NestFinder connects buyers, renters, and sellers with verified properties and trusted agents.
            </p>
            
            <Link href="/search">
              <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-gray-800 transition">
                Start Searching →
              </button>
            </Link>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100">
              <div><dt className="text-xl font-bold text-gray-900">15K+</dt><dd className="text-xs text-gray-500">Properties</dd></div>
              <div><dt className="text-xl font-bold text-gray-900">8K+</dt><dd className="text-xs text-gray-500">Happy clients</dd></div>
              <div><dt className="text-xl font-bold text-gray-900">340+</dt><dd className="text-xs text-gray-500">Agents</dd></div>
              <div><dt className="text-xl font-bold text-gray-900">4.9★</dt><dd className="text-xs text-gray-500">Rating</dd></div>
            </div>
          </div>
          
          <div className="hidden lg:block relative mt-8 lg:mt-0">
            <div className="overflow-hidden rounded-xl bg-gray-100 shadow-lg">
              <img 
                src={optimizedImages.hero}
                alt="Premium apartment"
                className="w-full h-auto object-cover"
                width="400"
                height="300"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 left-4 max-w-xs rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              <div className="flex items-start gap-2">
                <span className="rounded-lg bg-green-500 p-1 text-white text-xs">✓</span>
                <div><p className="text-xs text-gray-500">Verified</p><p className="text-xs font-semibold">Documents checked</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
