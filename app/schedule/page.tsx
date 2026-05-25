'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react'
import AuthModal from '@/components/common/AuthModal'

export default function SchedulePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get('propertyId')
  const propertyTitle = searchParams.get('title') || 'Property'
  const rescheduleId = searchParams.get('reschedule')
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      setShowAuthModal(true)
      setIsLoggedIn(false)
    } else {
      const userData = JSON.parse(user)
      setFormData(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email
      }))
      setIsLoggedIn(true)
    }
  }, [])

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to schedule a property visit</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => {
          setShowAuthModal(false)
          router.back()
        }} />
      </>
    )
  }
  
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      dates.push({
        value: `${year}-${month}-${day}`,
        label: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      })
    }
    return dates
  }
  
  const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits'
    if (!formData.date) newErrors.date = 'Please select a date'
    if (!formData.time) newErrors.time = 'Please select a time'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const booking = {
      id: rescheduleId ? parseInt(rescheduleId) : Date.now(),
      propertyId,
      propertyTitle,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    
    if (rescheduleId) {
      // Update existing booking
      const index = existingBookings.findIndex((b: any) => b.id === parseInt(rescheduleId))
      if (index !== -1) {
        existingBookings[index] = { ...existingBookings[index], ...formData, status: 'pending' }
      }
    } else {
      // Add new booking
      existingBookings.push(booking)
    }
    
    localStorage.setItem('bookings', JSON.stringify(existingBookings))
    setSubmitted(true)
    
    setTimeout(() => {
      router.push('/dashboard/bookings')
    }, 2000)
  }
  
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {rescheduleId ? 'Booking Rescheduled!' : 'Booking Request Sent!'}
          </h2>
          <p className="text-gray-600 mb-4">
            Your viewing for <strong>{propertyTitle}</strong> has been {rescheduleId ? 'rescheduled' : 'requested'}.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            An agent will confirm your booking within 2 hours.
          </p>
          <button 
            onClick={() => router.push('/dashboard/bookings')}
            className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            View My Bookings
          </button>
        </div>
      </div>
    )
  }
  
  const availableDates = getAvailableDates()
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition text-sm"
          >
            <ArrowLeft className="size-4" />
            Back
          </button>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {rescheduleId ? 'Reschedule Property Visit' : 'Schedule a Property Visit'}
            </h1>
            <p className="text-gray-500 mt-1">{propertyTitle}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User className="size-5 text-gray-600" />
                Personal Details
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    errors.name ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    errors.email ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    errors.phone ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'
                  }`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="size-5 text-gray-600" />
                Schedule Details
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    errors.date ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'
                  }`}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                >
                  <option value="">Select a date</option>
                  {availableDates.map((date) => (
                    <option key={date.value} value={date.value}>
                      {date.label}
                    </option>
                  ))}
                </select>
                {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 ${
                    errors.time ? 'border-red-500' : 'border-gray-200 focus:border-gray-400'
                  }`}
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                >
                  <option value="">Select a time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message (Optional)</label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Any specific requirements or questions?"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          
          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md"
            >
              {rescheduleId ? 'Confirm Reschedule' : 'Confirm Schedule'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            * An agent will confirm your booking within 2 hours
          </p>
        </form>
      </div>
    </div>
  )
}
