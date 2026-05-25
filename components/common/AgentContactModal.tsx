'use client'

import { useState } from 'react'
import { X, Phone, Mail, MessageCircle, Send, Clock, Award, CheckCircle, User, Building2 } from 'lucide-react'

interface AgentContactModalProps {
  agent: {
    name: string
    initials: string
    city: string
    rating: number
    deals: number
    phone: string
    email: string
    experience: string
    specialization: string
  }
  onClose: () => void
}

export default function AgentContactModal({ agent, onClose }: AgentContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setSubmitted(true)
    // Store inquiry
    const inquiries = JSON.parse(localStorage.getItem('agent_inquiries') || '[]')
    inquiries.push({
      id: Date.now(),
      agentName: agent.name,
      ...formData,
      date: new Date().toISOString()
    })
    localStorage.setItem('agent_inquiries', JSON.stringify(inquiries))
    
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
          <p className="text-gray-600 mb-4">
            {agent.name} will contact you within 24 hours.
          </p>
          <button onClick={onClose} className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact {agent.name}</h2>
            <p className="text-gray-500 text-sm mt-1">Get in touch with our expert agent</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {agent.initials}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
              <p className="text-gray-500 text-sm">{agent.city} • {agent.specialization}</p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold">{agent.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="size-4 text-gray-500" />
                  <span className="text-sm">{agent.experience}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="size-4 text-green-600" />
                  <span className="text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition">
              <Phone className="size-4 text-gray-500" />
              <span>{agent.phone}</span>
            </a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-white rounded-lg border border-gray-200 hover:border-gray-400 transition">
              <Mail className="size-4 text-gray-500" />
              <span className="truncate">{agent.email}</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
              <input
                type="text"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
              <input
                type="email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone *</label>
            <input
              type="tel"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="9876543210"
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder={`I'm interested in learning more about properties in ${agent.city}...`}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-2">
            <Clock className="size-4 text-blue-600 mt-0.5" />
            <p className="text-xs text-blue-800">
              Response time: Typically within 2 hours during business hours (9 AM - 8 PM)
            </p>
          </div>
          
          <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md flex items-center justify-center gap-2">
            <Send className="size-4" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
