'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Building2, Search, Heart, CalendarCheck, User, LogOut, Users } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/listings', label: 'Listings', icon: Building2 },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/favourites', label: 'Saved', icon: Heart },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/dashboard/bookings', label: 'Bookings', icon: CalendarCheck },
]

export default function BottomNav() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('currentUser')
      setCurrentUser(updatedUser ? JSON.parse(updatedUser) : null)
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const footer = document.querySelector('footer')
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        if (footerRect.top <= windowHeight - 80) {
          setIsVisible(false)
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    window.location.href = '/'
  }

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 border-t border-gray-200 shadow-lg backdrop-blur-xl transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-lg mx-auto px-2 py-2">
        <ul className="grid grid-cols-7 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex min-h-12 w-full flex-col items-center justify-center gap-1 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              </li>
            )
          })}
          <li>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex min-h-12 w-full flex-col items-center justify-center gap-1 rounded-xl text-xs font-bold transition-all text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <LogOut className="size-5" />
                <span className="text-[10px]">Logout</span>
              </button>
            ) : (
              <Link
                href="/login"
                className={`flex min-h-12 w-full flex-col items-center justify-center gap-1 rounded-xl text-xs font-bold transition-all ${
                  pathname === '/login' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <User className="size-5" />
                <span className="text-[10px]">Login</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}
