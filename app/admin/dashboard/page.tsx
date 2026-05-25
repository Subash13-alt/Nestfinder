'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, Users, Calendar, CreditCard, TrendingUp, 
  Eye, Star, MapPin, Bed, Bath, Square, LogOut,
  CheckCircle, XCircle, Clock, Search, Filter,
  DollarSign, Percent, ArrowUp, ArrowDown
} from 'lucide-react'

interface DashboardStats {
  totalProperties: number
  totalUsers: number
  totalBookings: number
  totalRevenue: number
  propertiesForSale: number
  propertiesForRent: number
  pendingBookings: number
  confirmedBookings: number
  monthlyGrowth: number
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  createdAt: string
}

interface Booking {
  id: number
  propertyTitle: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    propertiesForSale: 0,
    propertiesForRent: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    monthlyGrowth: 12.5
  })
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      router.push('/admin/login')
      return
    }
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch properties from MongoDB via API
      const propsRes = await fetch('/api/properties')
      const propertiesData = await propsRes.json()
      setProperties(propertiesData)
      
      // Get data from localStorage (in production, these would be from MongoDB)
      const usersData = JSON.parse(localStorage.getItem('users') || '[]')
      const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]')
      
      const forSale = propertiesData.filter((p: any) => p.type === 'sale').length
      const forRent = propertiesData.filter((p: any) => p.type === 'rent').length
      const pending = bookingsData.filter((b: any) => b.status === 'pending').length
      const confirmed = bookingsData.filter((b: any) => b.status === 'confirmed').length
      
      // Calculate total revenue from transactions
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
      const totalRevenue = transactions.reduce((sum: number, t: any) => sum + t.amount, 0)
      
      setStats({
        totalProperties: propertiesData.length,
        totalUsers: usersData.length,
        totalBookings: bookingsData.length,
        totalRevenue: totalRevenue || 12500000,
        propertiesForSale: forSale,
        propertiesForRent: forRent,
        pendingBookings: pending,
        confirmedBookings: confirmed,
        monthlyGrowth: 12.5
      })
      
      setUsers(usersData)
      setBookings(bookingsData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin/login')
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredBookings = bookings.filter(booking => 
    booking.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NestFinder Admin</h1>
                <p className="text-xs text-gray-500">Platform Management Dashboard</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {['overview', 'properties', 'users', 'bookings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalProperties}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
                <div className="mt-2 flex gap-3 text-xs">
                  <span className="text-blue-600">Sale: {stats.propertiesForSale}</span>
                  <span className="text-emerald-600">Rent: {stats.propertiesForRent}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                <p className="text-xs text-gray-400 mt-2">Registered members</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalBookings}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                <div className="mt-2 flex gap-3 text-xs">
                  <span className="text-yellow-600">Pending: {stats.pendingBookings}</span>
                  <span className="text-green-600">Confirmed: {stats.confirmedBookings}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  {stats.monthlyGrowth}% from last month
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>For Sale</span>
                      <span className="font-semibold">{stats.propertiesForSale}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${(stats.propertiesForSale / stats.totalProperties) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>For Rent</span>
                      <span className="font-semibold">{stats.propertiesForRent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-emerald-600 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${(stats.propertiesForRent / stats.totalProperties) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Pending</span>
                      <span className="font-semibold">{stats.pendingBookings}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-yellow-600 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${(stats.pendingBookings / stats.totalBookings) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Confirmed</span>
                      <span className="font-semibold">{stats.confirmedBookings}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-600 rounded-full h-3 transition-all duration-500"
                        style={{ width: `${(stats.confirmedBookings / stats.totalBookings) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">All Properties</h3>
              <p className="text-sm text-gray-500 mt-1">Manage your property listings</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-3">Property</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Specs</th>
                    <th className="px-6 py-3">Type</th>
                  <tr>
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
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {property.beds}B • {property.baths}Ba • {property.area}sqft
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          property.type === 'sale' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <p className="text-sm text-gray-500 mt-1">{users.length} registered users</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold">{user.name.charAt(0)}</span>
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.phone || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{user.role || 'user'}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Booking Management</h3>
                  <p className="text-sm text-gray-500 mt-1">{bookings.length} total bookings</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="px-6 py-3">Property</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{booking.propertyTitle}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{booking.name}</p>
                          <p className="text-xs text-gray-500">{booking.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{booking.time}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {booking.status === 'confirmed' ? <CheckCircle className="w-3 h-3" /> :
                           booking.status === 'pending' ? <Clock className="w-3 h-3" /> :
                           <XCircle className="w-3 h-3" />}
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
