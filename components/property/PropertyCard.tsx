'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, BedDouble, Bath, Square, Heart, Calendar, ShoppingBag, Key } from 'lucide-react'

interface Property {
  id: number
  title: string
  price: number
  location: string
  beds: number
  baths: number
  area: number
  type: string
  image: string
  featured?: boolean
}

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  
  const formatPrice = () => {
    if (property.type === 'rent') return `₹${(property.price / 1000).toFixed(0)}K/mo`
    if (property.price >= 10000000) return `₹${(property.price / 10000000).toFixed(1)}Cr`
    return `₹${(property.price / 100000).toFixed(0)}L`
  }
  
  const checkAuth = () => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      router.push('/login')
      return false
    }
    return true
  }
  
  const handleBuyNow = () => {
    if (!checkAuth()) return
    router.push(`/checkout?propertyId=${property.id}&title=${encodeURIComponent(property.title)}&price=${property.price}&action=buy`)
  }
  
  const handleRentNow = () => {
    if (!checkAuth()) return
    router.push(`/checkout?propertyId=${property.id}&title=${encodeURIComponent(property.title)}&price=${property.price}&action=rent`)
  }
  
  const handleScheduleVisit = () => {
    if (!checkAuth()) return
    router.push(`/schedule?propertyId=${property.id}&title=${encodeURIComponent(property.title)}`)
  }
  
  return (
    <div className="group rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={property.image} 
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        <div className="absolute top-3 left-3">
          <div className="bg-white/95 backdrop-blur px-2 py-1 rounded-lg shadow-md">
            <p className="text-base font-bold text-gray-900">{formatPrice()}</p>
          </div>
        </div>
        
        {property.featured && (
          <div className="absolute top-3 right-3">
            <div className="bg-gray-900 px-2 py-0.5 rounded-full">
              <span className="text-xs font-bold text-white">FEATURED</span>
            </div>
          </div>
        )}
        
        {!property.featured && property.type === 'sale' && (
          <div className="absolute top-3 right-3">
            <div className="bg-blue-600 px-2 py-0.5 rounded-full">
              <span className="text-xs font-bold text-white">FOR SALE</span>
            </div>
          </div>
        )}
        
        {property.type === 'rent' && (
          <div className="absolute top-3 right-3">
            <div className="bg-emerald-600 px-2 py-0.5 rounded-full">
              <span className="text-xs font-bold text-white">FOR RENT</span>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className="absolute bottom-3 right-3 bg-white rounded-full p-1.5 shadow-md hover:shadow-lg transition"
        >
          <svg className={`size-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-bold text-gray-900 mb-1 truncate">{property.title}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin className="size-3" />
          <span className="truncate">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-2 mb-2">
          <div className="text-center flex-1">
            <BedDouble className="size-3 text-gray-500 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-gray-900">{property.beds}</p>
          </div>
          <div className="text-center flex-1 border-x border-gray-100">
            <Bath className="size-3 text-gray-500 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-gray-900">{property.baths}</p>
          </div>
          <div className="text-center flex-1">
            <Square className="size-3 text-gray-500 mx-auto mb-0.5" />
            <p className="text-xs font-semibold text-gray-900">{property.area}</p>
          </div>
        </div>
        
        <div className="space-y-1.5">
          {property.type === 'sale' ? (
            <button 
              onClick={handleBuyNow}
              className="w-full bg-gray-900 text-white font-semibold py-1.5 rounded-lg hover:bg-gray-800 transition text-xs flex items-center justify-center gap-1"
            >
              <ShoppingBag className="size-3" />
              Buy Now
            </button>
          ) : (
            <button 
              onClick={handleRentNow}
              className="w-full bg-emerald-600 text-white font-semibold py-1.5 rounded-lg hover:bg-emerald-700 transition text-xs flex items-center justify-center gap-1"
            >
              <Key className="size-3" />
              Rent Now
            </button>
          )}
          
          <button 
            onClick={handleScheduleVisit}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-1.5 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition text-xs flex items-center justify-center gap-1"
          >
            <Calendar className="size-3" />
            Schedule Visit
          </button>
        </div>
      </div>
    </div>
  )
}
