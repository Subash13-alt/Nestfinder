'use client'

import { useState } from 'react'
import { MapPin, Star, IndianRupee, Phone, Mail, Award, CheckCircle, Search, Filter, Briefcase, Clock } from 'lucide-react'
import AgentContactModal from '@/components/common/AgentContactModal'

const agents = [
  { 
    id: 1, name: 'Ananya Rao', initials: 'AR', city: 'Chennai', rating: 4.9, deals: 128, 
    phone: '+91 98765 43210', email: 'ananya.rao@nestfinder.com', experience: '8+ years',
    specialization: 'Luxury Villas', awards: 'Top Agent 2024', verified: true,
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  { 
    id: 2, name: 'Vikram Mehta', initials: 'VM', city: 'Bengaluru', rating: 4.8, deals: 156, 
    phone: '+91 98765 43211', email: 'vikram.mehta@nestfinder.com', experience: '10+ years',
    specialization: 'Commercial Properties', awards: 'Deal Maker 2024', verified: true,
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  { 
    id: 3, name: 'Priya Nair', initials: 'PN', city: 'Hyderabad', rating: 5.0, deals: 143, 
    phone: '+91 98765 43212', email: 'priya.nair@nestfinder.com', experience: '12+ years',
    specialization: 'Premium Apartments', awards: 'Client Choice 2024', verified: true,
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  { 
    id: 4, name: 'Rajesh Kumar', initials: 'RK', city: 'Chennai', rating: 4.7, deals: 187, 
    phone: '+91 98765 43213', email: 'rajesh.kumar@nestfinder.com', experience: '15+ years',
    specialization: 'Independent Houses', awards: 'Hall of Fame', verified: true,
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  },
  { 
    id: 5, name: 'Divya Sharma', initials: 'DS', city: 'Mumbai', rating: 4.9, deals: 212, 
    phone: '+91 98765 43214', email: 'divya.sharma@nestfinder.com', experience: '14+ years',
    specialization: 'Sea View Properties', awards: 'Luxury Expert', verified: true,
    image: 'https://randomuser.me/api/portraits/women/5.jpg'
  },
  { 
    id: 6, name: 'Arjun Reddy', initials: 'AR', city: 'Hyderabad', rating: 4.8, deals: 104, 
    phone: '+91 98765 43215', email: 'arjun.reddy@nestfinder.com', experience: '7+ years',
    specialization: 'Budget Homes', awards: 'Rising Star', verified: true,
    image: 'https://randomuser.me/api/portraits/men/6.jpg'
  },
]

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  
  const cities = ['all', ...new Set(agents.map(agent => agent.city))].sort()
  
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === 'all' || agent.city === selectedCity
    return matchesSearch && matchesCity
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet Our Expert Agents</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Connect with India's most trusted and verified real estate professionals
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold">{agents.length}+</div>
              <div className="text-sm text-gray-400">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, city, or specialization..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-5 pt-6 pb-2">
        <p className="text-sm text-gray-500">Found {filteredAgents.length} expert agents</p>
      </div>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Cover Image */}
              <div className="relative h-28 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-3xl shadow-lg overflow-hidden">
                    {agent.image ? (
                      <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                    ) : (
                      agent.initials
                    )}
                  </div>
                </div>
                {agent.verified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </div>
                )}
                {agent.awards && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                    <Award className="w-3 h-3" /> {agent.awards}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="pt-14 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition">
                      {agent.name}
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      {agent.city}
                    </p>
                  </div>
                  <div className="text-center bg-orange-50 px-3 py-1 rounded-lg">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                      <span className="font-bold text-gray-900">{agent.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {agent.specialization}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {agent.experience}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <IndianRupee className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-900">{agent.deals}</p>
                    <p className="text-xs text-gray-500">Deals Closed</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Award className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-900">{agent.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-xs">{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-xs truncate">{agent.email}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedAgent(agent)}
                  className="mt-4 w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Contact Agent
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {selectedAgent && (
        <AgentContactModal 
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  )
}
