'use client'

import { Search } from 'lucide-react'
import Button from '@/components/common/Button'

export default function SearchBar() {
  return (
    <form className="mt-7 grid gap-2 rounded-xl border border-gray-200 bg-white/80 p-3 shadow-lift backdrop-blur-xl sm:gap-3 md:grid-cols-[1fr_1fr_1fr_auto] lg:mt-9">
      <div className="rounded-lg px-3 py-1.5 transition hover:bg-gray-50 sm:py-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-primary">Location</label>
        <span className="mt-1 block font-semibold">Chennai, TN</span>
      </div>
      <div className="rounded-lg px-3 py-1.5 transition hover:bg-gray-50 sm:py-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-primary">Property type</label>
        <span className="mt-1 block font-semibold">Any Property</span>
      </div>
      <div className="rounded-lg px-3 py-1.5 transition hover:bg-gray-50 sm:py-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-primary">Budget</label>
        <span className="mt-1 block font-semibold">₹50L – ₹1.5Cr</span>
      </div>
      <Button variant="accent" className="w-full md:w-auto">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  )
}
