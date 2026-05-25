'use client'

import PropertyCard from './PropertyCard'
import { properties } from '@/lib/properties'

export default function PropertyGrid() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-14 sm:px-8 lg:py-20">
      {/* Featured Properties - 3 cards */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">Premium Selection</p>
          <h2 className="text-4xl font-bold text-gray-900">Featured Properties</h2>
          <p className="mt-2 text-gray-500">Handpicked luxury homes curated exclusively for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.featured.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Properties for Sale - Show only 3 */}
      <div className="mb-20">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🏠 Properties for Sale</h2>
            <p className="text-gray-500 mt-1">Discover your dream home</p>
          </div>
          <a href="/listings" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">
            View All {properties.forSale.length} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.forSale.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Properties for Rent - Show only 3 */}
      <div>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🔑 Properties for Rent</h2>
            <p className="text-gray-500 mt-1">Find your perfect rental home</p>
          </div>
          <a href="/listings" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition">
            View All {properties.forRent.length} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.forRent.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
