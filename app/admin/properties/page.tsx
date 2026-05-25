'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Edit, Trash2, Eye, Plus, ArrowLeft } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminProperties() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    fetchProperties()
  }, [router])

  const fetchProperties = async () => {
    const res = await fetch('/api/properties')
    const data = await res.json()
    setProperties(data)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Properties</h1>
            <p className="text-gray-500 mt-1">View and manage all property listings</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
            <Plus className="w-4 h-4" />
            Add New Property
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-6 py-3">Property</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {properties.map((property: any) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={property.image} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-900">{property.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{property.location}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {property.type === 'rent' ? `₹${(property.price/1000).toFixed(0)}K/mo` : `₹${(property.price/100000).toFixed(0)}L`}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        property.type === 'sale' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-500 hover:text-gray-900"><Eye className="w-4 h-4" /></button>
                        <button className="p-1 text-gray-500 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                        <button className="p-1 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
