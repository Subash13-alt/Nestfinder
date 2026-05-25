'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Shield, CreditCard, Building2, Calendar, Clock, CheckCircle, ArrowLeft, Lock, Truck, Home, Users } from 'lucide-react'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const propertyId = searchParams.get('propertyId')
  const propertyTitle = searchParams.get('title') || 'Property'
  const propertyPrice = searchParams.get('price') || '0'
  const action = searchParams.get('action') || 'buy' // buy or rent
  
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    acceptTerms: false
  })
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (!user) {
      router.push('/auth/login')
      return
    }
    setCurrentUser(JSON.parse(user))
  }, [router])

  const formatPrice = () => {
    const price = parseFloat(propertyPrice)
    if (action === 'rent') return `₹${(price / 1000).toFixed(0)}K/month`
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`
    return `₹${(price / 100000).toFixed(0)} Lakhs`
  }

  const getTotalAmount = () => {
    const price = parseFloat(propertyPrice)
    const tax = price * 0.05
    const total = price + tax
    if (action === 'rent') {
      return {
        subtotal: price,
        tax: price * 0.05,
        total: price + (price * 0.05),
        formattedSubtotal: `₹${(price / 1000).toFixed(0)}K`,
        formattedTax: `₹${((price * 0.05) / 1000).toFixed(0)}K`,
        formattedTotal: `₹${((price + (price * 0.05)) / 1000).toFixed(0)}K`
      }
    }
    return {
      subtotal: price,
      tax: price * 0.05,
      total: price + (price * 0.05),
      formattedSubtotal: price >= 10000000 ? `₹${(price / 10000000).toFixed(1)} Cr` : `₹${(price / 100000).toFixed(0)} Lakhs`,
      formattedTax: price >= 10000000 ? `₹${((price * 0.05) / 10000000).toFixed(1)} Cr` : `₹${((price * 0.05) / 100000).toFixed(0)} Lakhs`,
      formattedTotal: price >= 10000000 ? `₹${((price + (price * 0.05)) / 10000000).toFixed(1)} Cr` : `₹${((price + (price * 0.05)) / 100000).toFixed(0)} Lakhs`
    }
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions')
      return
    }
    
    setProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
      
      // Store transaction
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
      transactions.push({
        id: Date.now(),
        propertyId,
        propertyTitle,
        amount: getTotalAmount().total,
        action,
        date: new Date().toISOString(),
        status: 'completed',
        user: currentUser?.name
      })
      localStorage.setItem('transactions', JSON.stringify(transactions))
      
      setTimeout(() => {
        router.push('/payment-success')
      }, 2000)
    }, 3000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your {action === 'buy' ? 'purchase' : 'booking'} for {propertyTitle} is confirmed.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to your registered email.
          </p>
          <button
            onClick={() => router.push('/dashboard/bookings')}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            View My Bookings
          </button>
        </div>
      </div>
    )
  }

  const totals = getTotalAmount()

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
              {action === 'buy' ? 'Complete Your Purchase' : 'Confirm Your Booking'}
            </h1>
            <p className="text-gray-500 mt-1">{propertyTitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>1</div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>2</div>
                  <span className="text-sm font-medium">Confirm</span>
                </div>
              </div>

              <form onSubmit={handlePayment}>
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg text-center transition ${
                        paymentMethod === 'card' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <CreditCard className="size-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium">Credit/Debit Card</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border-2 rounded-lg text-center transition ${
                        paymentMethod === 'upi' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <Building2 className="size-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium">UPI</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-4 border-2 rounded-lg text-center transition ${
                        paymentMethod === 'netbanking' ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                      }`}
                    >
                      <Building2 className="size-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm font-medium">Net Banking</p>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                      value={formData.upiId}
                      onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">You will receive a payment request on your UPI app</p>
                  </div>
                )}

                {/* Terms */}
                <div className="mt-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})}
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-gray-900 underline">Terms & Conditions</a> and <a href="#" className="text-gray-900 underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${totals.formattedTotal}`
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="size-3" />
                  <span>Secure payment encrypted with SSL</span>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{propertyTitle}</span>
                  <span className="font-semibold">{totals.formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-semibold">{totals.formattedTax}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-lg">{totals.formattedTotal}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Shield className="size-3" />
                  <span>Secure transaction</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="size-3" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users className="size-3" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
