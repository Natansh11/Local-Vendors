'use client';

import Link from 'next/link';

export default function ProfilePage() {
  // Mock data
  const user = {
    name: 'Ram Kumar',
    email: 'ram.kumar@example.com',
    phone: '+91 98765 43210',
    businessType: 'Vegetables',
    location: 'Near XYZ Market, Lucknow',
    digitalPattaId: 'DP-2025-1234',
    joinedDate: '2025-09-01'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-lg font-semibold text-gray-900">{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <p className="text-lg font-semibold text-gray-900">{user.phone}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Digital Patta ID</label>
              <p className="text-lg font-semibold text-blue-600">{user.digitalPattaId}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <p className="text-lg font-semibold text-gray-900">{user.businessType}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <p className="text-lg font-semibold text-gray-900">{user.location}</p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/profile/edit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-center shadow-lg"
            >
              Edit Profile
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
