'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, Phone, ArrowLeft, CheckCircle, XCircle, ClockIcon } from 'lucide-react'
import Link from 'next/link'

interface Booking {
  id: number
  propertyTitle: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
  status: string
  createdAt: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      router.push('/login')
      return
    }
    setIsLoggedIn(true)
    const stored = localStorage.getItem('bookings')
    if (stored) {
      setBookings(JSON.parse(stored))
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs"><CheckCircle className="w-3 h-3" /> Confirmed</span>
      case 'pending':
        return <span className="inline-flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs"><ClockIcon className="w-3 h-3" /> Pending</span>
      case 'cancelled':
        return <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs"><XCircle className="w-3 h-3" /> Cancelled</span>
      default:
        return <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500 mt-1">Track your property viewing appointments</p>
          </div>
        </div>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
            <p className="text-gray-500 mb-6">You haven't scheduled any property visits yet.</p>
            <Link href="/listings">
              <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                Browse Properties
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{booking.propertyTitle}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Booking ID: #{booking.id}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{booking.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                </div>
                
                {booking.message && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600"><span className="font-medium">Message:</span> {booking.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
