'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  PlusCircleIcon,
  UsersIcon,
  CurrencyRupeeIcon,
  SparklesIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [myGroups, setMyGroups] = useState([
    {
      id: '1',
      name: 'Chowk Sellers Group',
      members: 12,
      balance: 4500,
      role: 'member',
      nextContribution: 200
    }
  ]);

  const [availableGroups, setAvailableGroups] = useState([
    {
      id: '2',
      name: 'Lucknow Vegetable Vendors',
      members: 25,
      description: 'Group for all vegetable vendors in Lucknow area'
    },
    {
      id: '3',
      name: 'Handicraft Sellers Union',
      members: 15,
      description: 'Supporting local handicraft sellers'
    }
  ]);

  const handleJoinGroup = (groupId: string) => {
    const groupToJoin = availableGroups.find(g => g.id === groupId);
    if (!groupToJoin) return;

    const newGroup = {
      id: groupToJoin.id,
      name: groupToJoin.name,
      members: groupToJoin.members + 1,
      balance: 0,
      role: 'member' as const,
      nextContribution: 200
    };
    
    setMyGroups([...myGroups, newGroup]);
    setAvailableGroups(availableGroups.filter(g => g.id !== groupId));
    
    alert(`✨ Successfully joined ${groupToJoin.name}! Welcome to the community!`);
  };

  const filteredAvailableGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMyGroups = myGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-emerald-50" />
      
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 15}s`,
              background: i % 3 === 0 
                ? 'rgba(249, 115, 22, 0.3)' 
                : i % 3 === 1 
                ? 'rgba(16, 185, 129, 0.3)' 
                : 'rgba(168, 85, 247, 0.3)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="glass-card rounded-2xl p-6 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="glow-warm p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                  Groups
                </h1>
                <p className="text-gray-600 font-medium">Sahayata Samuh</p>
              </div>
            </div>
          </div>

          <Link
            href="/groups/new"
            className="btn-magnetic gradient-warm px-8 py-4 rounded-2xl font-bold text-white shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 whitespace-nowrap"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span>Create Group</span>
          </Link>
        </div>

        {/* Search Bar - Glassmorphism */}
        <div className="mb-8">
          <div className="glass-card rounded-2xl p-2 shadow-xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-emerald-600 glow-cool" />
              <input
                type="text"
                placeholder="Search groups by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-white/50 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200 transition-all text-gray-900 placeholder-gray-500 font-medium text-lg"
              />
            </div>
          </div>
        </div>

        {/* My Groups Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="glow-royal p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              My Groups
            </h2>
          </div>

          {filteredMyGroups.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center shadow-xl">
              <div className="animate-bounce mb-6">
                <UserGroupIcon className="h-20 w-20 text-gray-400 mx-auto" />
              </div>
              <p className="text-gray-800 text-xl font-bold mb-2">No groups found</p>
              <p className="text-gray-600 font-medium">Join a group below to get started on your journey</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMyGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/groups/${group.id}`}
                  className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 card-hover-lift group relative overflow-hidden"
                >
                  {/* Decorative Gradient Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {group.name}
                      </h3>
                      <span className="badge-premium px-3 py-1 rounded-full text-xs font-bold">
                        {group.role}
                      </span>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="neu-card rounded-xl p-3 flex items-center gap-3">
                        <div className="glow-cool p-2 rounded-lg bg-emerald-100">
                          <UsersIcon className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Members</p>
                          <p className="text-lg font-bold text-gray-900">{group.members}</p>
                        </div>
                      </div>
                      
                      <div className="neu-card rounded-xl p-3 flex items-center gap-3">
                        <div className="glow-warm p-2 rounded-lg bg-orange-100">
                          <CurrencyRupeeIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Balance</p>
                          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                            ₹{group.balance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="animated-gradient rounded-xl p-4 text-white shadow-lg">
                      <p className="text-xs font-semibold mb-1 opacity-90">Next Contribution</p>
                      <p className="text-2xl font-bold">₹{group.nextContribution}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Available Groups Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="glow-warm p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
              <FireIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
              Discover Groups
            </h2>
          </div>

          {filteredAvailableGroups.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center shadow-xl">
              <p className="text-gray-800 text-xl font-bold">No available groups found</p>
              <p className="text-gray-600 font-medium mt-2">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAvailableGroups.map((group) => (
                <div
                  key={group.id}
                  className="glass-card rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Decorative Gradient */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="glow-cool p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
                        <UserGroupIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 flex-1 group-hover:text-emerald-600 transition-colors">
                        {group.name}
                      </h3>
                    </div>

                    <p className="text-gray-700 mb-4 font-medium leading-relaxed">
                      {group.description}
                    </p>
                    
                    <div className="neu-card rounded-xl p-3 flex items-center gap-3 mb-4">
                      <UsersIcon className="h-5 w-5 text-emerald-600" />
                      <span className="text-gray-900 font-bold">{group.members} members</span>
                    </div>
                    
                    <button 
                      onClick={() => handleJoinGroup(group.id)}
                      className="w-full btn-magnetic gradient-cool px-6 py-3 rounded-xl font-bold text-white shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <SparklesIcon className="h-5 w-5" />
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
