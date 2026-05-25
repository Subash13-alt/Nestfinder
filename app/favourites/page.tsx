'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import PropertyCard from '@/components/property/PropertyCard'
import { properties } from '@/lib/properties'

export default function FavouritesPage() {
  const [savedIds, setSavedIds] = useState<number[]>([])
  
  useEffect(() => {
    const saved = localStorage.getItem('favourites')
    if (saved) {
      setSavedIds(JSON.parse(saved))
    }
  }, [])
  
  const allProperties = [
    ...properties.featured,
    ...properties.forSale,
    ...properties.forRent
  ]
  
  const savedProperties = allProperties.filter(p => savedIds.includes(p.id))

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-100 px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          <p className="text-gray-500 mt-1">Properties you've marked as favourites</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 py-8 sm:px-8">
        {savedProperties.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((property: any) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No saved properties</h3>
            <p className="text-gray-500 mt-1">Click the heart icon on any property to save it here</p>
          </div>
        )}
      </div>
    </div>
  )
}
