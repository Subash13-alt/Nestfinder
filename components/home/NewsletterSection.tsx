'use client'

import { useState } from 'react'
import { Sparkles, CheckCircle, XCircle } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }
    
    setStatus('loading')
    
    // Store notification request in localStorage
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    const newNotification = {
      id: Date.now(),
      email: email,
      date: new Date().toISOString(),
      status: 'pending',
      read: false
    }
    
    notifications.push(newNotification)
    localStorage.setItem('notifications', JSON.stringify(notifications))
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setMessage('Thank you! You\'ll be notified when new properties arrive.')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="px-5 pb-20 sm:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 shadow-xl sm:p-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Sparkles className="mb-4 size-8 text-amber-400" />
            <h2 className="text-3xl font-bold tracking-normal text-white">
              Get notified when your perfect property lands.
            </h2>
            <p className="mt-2 text-gray-300">Join 18,000+ buyers receiving verified matches first.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <input 
                type="email" 
                required 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-12 w-72 rounded-lg border border-gray-700 bg-gray-800 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={status === 'loading'}
              />
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3 text-base font-medium text-gray-900 shadow-md transition-all hover:bg-amber-400 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Notify Me'
              )}
            </button>
          </form>
        </div>
        
        {/* Status Message */}
        {status === 'success' && (
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            {message}
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-sm">
            <XCircle className="w-4 h-4" />
            {message}
          </div>
        )}
      </div>
    </section>
  )
}
