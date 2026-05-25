'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle, Home, BookOpen, Calendar } from 'lucide-react'

export default function PaymentSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">
          Your transaction has been completed successfully. A confirmation has been sent to your email.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard/bookings')}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            <Calendar className="size-4" />
            View My Bookings
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Home className="size-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
