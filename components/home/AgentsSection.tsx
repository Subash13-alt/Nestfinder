'use client'

import { useState } from 'react'
import { MapPin, Star, IndianRupee, Award, Briefcase, Clock } from 'lucide-react'
import Link from 'next/link'
import AgentContactModal from '@/components/common/AgentContactModal'

const topAgents = [
  { id: 1, name: 'Ananya Rao', initials: 'AR', city: 'Chennai', rating: 4.9, deals: 128, specialization: 'Luxury Villas', awards: 'Top Agent 2024', phone: '+91 98765 43210', email: 'ananya@nestfinder.com', experience: '8+ years' },
  { id: 2, name: 'Vikram Mehta', initials: 'VM', city: 'Bengaluru', rating: 4.8, deals: 156, specialization: 'Commercial', awards: 'Deal Maker 2024', phone: '+91 98765 43211', email: 'vikram@nestfinder.com', experience: '10+ years' },
  { id: 3, name: 'Priya Nair', initials: 'PN', city: 'Hyderabad', rating: 5.0, deals: 143, specialization: 'Premium Homes', awards: 'Client Choice', phone: '+91 98765 43212', email: 'priya@nestfinder.com', experience: '12+ years' },
  { id: 4, name: 'Rajesh Kumar', initials: 'RK', city: 'Chennai', rating: 4.7, deals: 187, specialization: 'Independent Houses', awards: 'Hall of Fame', phone: '+91 98765 43213', email: 'rajesh@nestfinder.com', experience: '15+ years' },
]

export default function AgentsSection() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)

  return (
    <>
      <section className="px-5 py-14 sm:px-8 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-gray-500">Trusted Agents</p>
            <h2 className="text-4xl font-bold tracking-normal text-gray-900">Meet Our Top Rated Experts</h2>
            <p className="mt-3 max-w-2xl mx-auto text-gray-500">
              Connect with verified real estate professionals who have helped thousands find their dream homes
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topAgents.map((agent) => (
              <div key={agent.name} className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-xl font-bold text-white shadow-md group-hover:scale-105 transition">
                    {agent.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">✓</span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="size-4" />
                      {agent.city}
                    </p>
                    <p className="text-xs font-medium text-gray-600 flex items-center gap-1">
                      <Briefcase className="size-3" /> {agent.specialization}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-orange-50 p-3 text-center">
                    <p className="flex items-center justify-center gap-1 font-bold text-gray-900">
                      <Star className="size-4 fill-orange-600 text-orange-600" />
                      {agent.rating}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-3 text-center">
                    <p className="flex items-center justify-center gap-1 font-bold text-gray-900">
                      <IndianRupee className="size-4" />
                      {agent.deals}
                    </p>
                    <p className="text-xs text-gray-500">Deals</p>
                  </div>
                </div>
                
                {agent.awards && (
                  <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-amber-50 px-3 py-1">
                    <Award className="size-3 text-amber-600" />
                    <span className="text-xs font-medium text-amber-600">{agent.awards}</span>
                  </div>
                )}
                
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock className="size-3" />
                  <span>{agent.experience} experience</span>
                </div>
                
                <button
                  onClick={() => setSelectedAgent(agent)}
                  className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  Contact Agent
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/agents">
              <button className="rounded-lg bg-gray-900 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-gray-800 hover:-translate-y-0.5">
                View All Agents
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {selectedAgent && (
        <AgentContactModal 
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </>
  )
}
