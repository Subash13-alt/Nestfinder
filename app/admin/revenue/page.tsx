'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, TrendingUp, CreditCard, Calendar, ArrowUp, ArrowDown } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'

export default function AdminRevenue() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    const transactionsData = JSON.parse(localStorage.getItem('transactions') || '[]')
    setTransactions(transactionsData)
    const total = transactionsData.reduce((sum: number, t: any) => sum + t.amount, 0)
    setTotalRevenue(total)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav onLogout={handleLogout} />
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Revenue Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your platform earnings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 10000000).toFixed(1)}Cr</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              12.5% from last month
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{transactions.length}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Transactions</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">₹{((totalRevenue / transactions.length) || 0).toLocaleString()}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Average Transaction</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-6 py-3">Transaction ID</th>
                  <th className="px-6 py-3">Property</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((transaction: any) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">#{transaction.id}</td>
                    <td className="px-6 py-4 text-gray-900">{transaction.propertyTitle}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₹{(transaction.amount / 100000).toFixed(0)}L</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span>
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
