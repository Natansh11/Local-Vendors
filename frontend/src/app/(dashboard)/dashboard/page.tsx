'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  CurrencyRupeeIcon,
  BellAlertIcon,
  SparklesIcon,
  FireIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function ExtraordinaryDashboard() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data
  const vendor = {
    vendorId: 'VNDR-123456',
    name: 'Ram Kumar',
    businessType: 'Vegetables',
    location: 'Chowk, Lucknow',
    phone: '+91 98765 43210',
    verified: true,
    joinedDate: '2025-09-01',
    rating: 4.8,
  };

  const stats = {
    totalGroups: 3,
    totalMembers: 12,
    groupBalance: 4500,
    activeLoans: 5000,
    contributions: 12000,
    loansPaid: 3,
  };

  const recentActivity = [
    { id: 1, type: 'contribution', amount: 200, group: 'Chowk Sellers', time: '2 hours ago', icon: '💰' },
    { id: 2, type: 'loan_approved', amount: 5000, group: 'Lucknow Vendors', time: '1 day ago', icon: '✅' },
    { id: 3, type: 'member_joined', member: 'Sita Devi', group: 'Chowk Sellers', time: '2 days ago', icon: '👋' },
  ];

  const achievements = [
    { id: 1, title: 'Early Bird', desc: 'Joined first group', icon: '🏆', unlocked: true },
    { id: 2, title: 'Contributor', desc: 'Made 10 contributions', icon: '💎', unlocked: true },
    { id: 3, title: 'Community Leader', desc: 'Help 5 members', icon: '⭐', unlocked: false },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Particle Background */}
      <div className="particle-bg">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: [
                'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              ][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Header with Time */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">Welcome back,</span>
                <br />
                <span className="text-neutral-800">{vendor.name} 👋</span>
              </h1>
              <p className="text-neutral-600 text-lg">
                {time.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-neutral-800">
                {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <p className="text-sm text-neutral-600">Local Time</p>
            </div>
          </div>
        </div>

        {/* Digital Patta Card - Glassmorphism */}
        <div className="mb-8 float-animation">
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-neutral-600 text-sm font-medium mb-1 flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4 text-orange-500" />
                    Digital Patta ID
                  </p>
                  <p className="text-4xl font-bold gradient-text">{vendor.vendorId}</p>
                </div>
                {vendor.verified && (
                  <div className="badge-premium px-4 py-2 rounded-full text-white font-semibold flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5" />
                    Verified
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-neutral-600 text-sm mb-1">Business Type</p>
                  <p className="text-xl font-bold text-neutral-800">{vendor.businessType}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-neutral-600 text-sm mb-1">Location</p>
                  <p className="text-xl font-bold text-neutral-800">{vendor.location}</p>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-neutral-600 text-sm mb-1">Rating</p>
                  <p className="text-xl font-bold text-neutral-800 flex items-center gap-2">
                    ⭐ {vendor.rating}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/profile"
                  className="btn-magnetic gradient-warm text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  View Profile
                </Link>
                <button className="glass-card px-6 py-3 rounded-xl font-semibold text-neutral-800 hover:shadow-lg transition-all">
                  Share Card
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Neumorphism */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="neu-card p-6 card-hover-lift">
            <div className="text-orange-500 mb-3">
              <UserGroupIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">{stats.totalGroups}</p>
            <p className="text-neutral-600 text-sm">Groups</p>
          </div>

          <div className="neu-card p-6 card-hover-lift">
            <div className="text-emerald-500 mb-3">
              <CurrencyRupeeIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">₹{(stats.groupBalance / 1000).toFixed(1)}k</p>
            <p className="text-neutral-600 text-sm">Balance</p>
          </div>

          <div className="neu-card p-6 card-hover-lift">
            <div className="text-purple-500 mb-3">
              <ChartBarIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">₹{(stats.contributions / 1000).toFixed(1)}k</p>
            <p className="text-neutral-600 text-sm">Contributed</p>
          </div>

          <div className="neu-card p-6 card-hover-lift">
            <div className="text-blue-500 mb-3">
              <FireIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">₹{(stats.activeLoans / 1000).toFixed(1)}k</p>
            <p className="text-neutral-600 text-sm">Active Loan</p>
          </div>

          <div className="neu-card p-6 card-hover-lift">
            <div className="text-pink-500 mb-3">
              <ArrowTrendingUpIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">{stats.loansPaid}</p>
            <p className="text-neutral-600 text-sm">Loans Paid</p>
          </div>

          <div className="neu-card p-6 card-hover-lift">
            <div className="text-indigo-500 mb-3">
              <SparklesIcon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold text-neutral-800 mb-1">{stats.totalMembers}</p>
            <p className="text-neutral-600 text-sm">Members</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-neutral-800">Recent Activity</h3>
                <button className="text-orange-500 font-semibold hover:text-orange-600">View All</button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="glass-card rounded-xl p-4 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{activity.icon}</div>
                      <div className="flex-1">
                        {activity.type === 'contribution' && (
                          <>
                            <p className="font-semibold text-neutral-800">Contribution Made</p>
                            <p className="text-neutral-600 text-sm">
                              ₹{activity.amount.toLocaleString()} to {activity.group}
                            </p>
                          </>
                        )}
                        {activity.type === 'loan_approved' && (
                          <>
                            <p className="font-semibold text-neutral-800">Loan Approved!</p>
                            <p className="text-neutral-600 text-sm">
                              ₹{activity.amount.toLocaleString()} from {activity.group}
                            </p>
                          </>
                        )}
                        {activity.type === 'member_joined' && (
                          <>
                            <p className="font-semibold text-neutral-800">New Member</p>
                            <p className="text-neutral-600 text-sm">
                              {activity.member} joined {activity.group}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-neutral-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`glass-card rounded-xl p-4 transition-all ${
                      achievement.unlocked ? 'hover:shadow-lg cursor-pointer' : 'opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-4xl ${achievement.unlocked ? 'pulse-glow' : ''}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-800">{achievement.title}</p>
                        <p className="text-neutral-600 text-sm">{achievement.desc}</p>
                      </div>
                      {achievement.unlocked && (
                        <div className="text-emerald-500">
                          <ShieldCheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-3xl p-6">
          <h3 className="text-2xl font-bold text-neutral-800 mb-6">Quick Actions</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/groups"
              className="btn-shimmer gradient-warm text-white p-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all group"
            >
              <UserGroupIcon className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              View Groups
            </Link>

            <Link
              href="/transactions"
              className="btn-shimmer gradient-cool text-white p-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all group"
            >
              <CurrencyRupeeIcon className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              Transactions
            </Link>

            <Link
              href="/groups/new"
              className="btn-shimmer gradient-royal text-white p-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all group"
            >
              <SparklesIcon className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              Create Group
            </Link>

            <button className="btn-shimmer gradient-fire text-white p-6 rounded-xl font-semibold text-center hover:shadow-xl transition-all group">
              <BellAlertIcon className="h-8 w-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              Crisis Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
