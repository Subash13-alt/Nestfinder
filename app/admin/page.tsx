'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Mail, Lock, Eye, EyeOff, Users, Building2, Calendar, DollarSign, TrendingUp, CheckCircle, XCircle, Clock, Bell, Inbox } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    propertiesForSale: 0,
    propertiesForRent: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalNotifications: 0,
    unreadNotifications: 0
  })
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth) {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      const propsRes = await fetch('/api/properties')
      const propertiesData = await propsRes.json()
      
      const usersData = JSON.parse(localStorage.getItem('users') || '[]')
      const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]')
      const transactions = JSON.parse(localStorage.getItem('transactions') || '[]')
      const notificationsData = JSON.parse(localStorage.getItem('notifications') || '[]')
      
      const forSale = propertiesData.filter((p: any) => p.type === 'sale').length
      const forRent = propertiesData.filter((p: any) => p.type === 'rent').length
      const pending = bookingsData.filter((b: any) => b.status === 'pending').length
      const confirmed = bookingsData.filter((b: any) => b.status === 'confirmed').length
      const totalRevenue = transactions.reduce((sum: number, t: any) => sum + t.amount, 0)
      const unread = notificationsData.filter((n: any) => !n.read).length
      
      setStats({
        totalProperties: propertiesData.length,
        totalUsers: usersData.length,
        totalBookings: bookingsData.length,
        totalRevenue: totalRevenue || 12500000,
        propertiesForSale: forSale,
        propertiesForRent: forRent,
        pendingBookings: pending,
        confirmedBookings: confirmed,
        totalNotifications: notificationsData.length,
        unreadNotifications: unread
      })
      
      setNotifications(notificationsData.slice(-5).reverse())
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (email === 'admin@nestfinder.com' && password === 'Admin@2024') {
      localStorage.setItem('adminAuth', JSON.stringify({
        isAuthenticated: true,
        email: email,
        loginTime: new Date().toISOString()
      }))
      setIsAuthenticated(true)
      fetchDashboardData()
    } else {
      setError('Invalid admin credentials')
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  const markAsRead = (id: number) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    const updated = allNotifications.map((n: any) => 
      n.id === id ? { ...n, read: true } : n
    )
    localStorage.setItem('notifications', JSON.stringify(updated))
    fetchDashboardData()
  }

  const markAllAsRead = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
    const updated = allNotifications.map((n: any) => ({ ...n, read: true }))
    localStorage.setItem('notifications', JSON.stringify(updated))
    fetchDashboardData()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl backdrop-blur mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Secure access to NestFinder dashboard</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                    placeholder="admin@nestfinder.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Admin Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-400">
              <p>Admin: admin@nestfinder.com / Admin@2024</p>
              <button
                onClick={() => router.push('/login')}
                className="mt-2 text-white/60 hover:text-white transition"
              >
                ← Back to Customer Login
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />
      
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalProperties}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
            <div className="mt-2 flex gap-3 text-xs">
              <span className="text-blue-600">Sale: {stats.propertiesForSale}</span>
              <span className="text-emerald-600">Rent: {stats.propertiesForRent}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalUsers}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{stats.totalBookings}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 10000000).toFixed(1)}Cr</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
                {stats.unreadNotifications > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {stats.unreadNotifications} new
                  </span>
                )}
              </h2>
            </div>
            {notifications.length > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notifications yet</p>
                <p className="text-sm text-gray-400">When users subscribe, they'll appear here</p>
              </div>
            ) : (
              notifications.map((notif: any) => (
                <div key={notif.id} className={`p-4 hover:bg-gray-50 transition ${!notif.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">New Subscription</span>
                        {!notif.read && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-gray-700">
                        <span className="font-semibold">{notif.email}</span> subscribed to property alerts
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notif.date).toLocaleString()}
                      </p>
                    </div>
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>For Sale</span>
                  <span className="font-semibold">{stats.propertiesForSale}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 rounded-full h-2" style={{ width: `${(stats.propertiesForSale / stats.totalProperties) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>For Rent</span>
                  <span className="font-semibold">{stats.propertiesForRent}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 rounded-full h-2" style={{ width: `${(stats.propertiesForRent / stats.totalProperties) * 100}%` }}></div>
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
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 rounded-full h-2" style={{ width: `${(stats.pendingBookings / stats.totalBookings) * 100 || 0}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Confirmed</span>
                  <span className="font-semibold">{stats.confirmedBookings}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 rounded-full h-2" style={{ width: `${(stats.confirmedBookings / stats.totalBookings) * 100 || 0}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
