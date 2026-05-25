'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, LogOut } from 'lucide-react'
import AuthModal from './AuthModal'
import LogoutModal from './LogoutModal'

export default function Navbar() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setShowLogoutModal(false)
    window.location.reload()
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 py-3 sm:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900">
              NestFinder
            </Link>
            
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <span className="text-sm text-gray-600">Hi, {currentUser.name.split(' ')[0]}</span>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
                >
                  <User className="size-4" />
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  )
}
