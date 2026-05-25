'use client'

import PropertyCard from '@/components/property/PropertyCard'
import { properties } from '@/lib/properties'

export default function ListingsPage() {
  const allProperties = [
    ...properties.featured,
    ...properties.forSale,
    ...properties.forRent
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-100 px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-500 mt-1">Browse all {allProperties.length} verified properties</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-8 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProperties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  )
}
