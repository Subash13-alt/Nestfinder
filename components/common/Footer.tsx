'use client'

import { Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16" id="main-footer">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-orange-500">NestFinder</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              India's most trusted platform for verified property listings and real estate agents.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#" className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs transition hover:bg-orange-600">FB</a>
              <a href="#" className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs transition hover:bg-orange-600">TW</a>
              <a href="#" className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs transition hover:bg-orange-600">IG</a>
              <a href="#" className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs transition hover:bg-orange-600">IN</a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-orange-500 transition">Home</Link></li>
              <li><Link href="/listings" className="hover:text-orange-500 transition">Browse Properties</Link></li>
              <li><Link href="/agents" className="hover:text-orange-500 transition">Find Agents</Link></li>
              <li><Link href="/search" className="hover:text-orange-500 transition">Advanced Search</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-200">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-orange-500 transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-orange-500 transition">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-200">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-orange-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-orange-500 flex-shrink-0" />
                <span>support@nestfinder.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 NestFinder. All rights reserved. Verified property discovery for India.</p>
        </div>
      </div>
    </footer>
  )
}
