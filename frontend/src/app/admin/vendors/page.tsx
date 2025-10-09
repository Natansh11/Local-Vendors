'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Vendor {
  vendorId: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  location: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  rejectionReason?: string;
}

export default function AdminVendorsPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      vendorId: 'VNDR-123456',
      name: 'Ram Kumar',
      phone: '+91 98765 43210',
      email: 'ram@example.com',
      businessType: 'Vegetables',
      location: 'Near XYZ Market, Lucknow',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      vendorId: 'VNDR-789012',
      name: 'Sita Sharma',
      phone: '+91 98765 43211',
      email: 'sita@example.com',
      businessType: 'Fruits',
      location: 'Main Road, Lucknow',
      status: 'pending',
      createdAt: '2024-01-15T11:00:00Z'
    },
    {
      vendorId: 'VNDR-345678',
      name: 'Mohan Das',
      phone: '+91 98765 43212',
      email: 'mohan@example.com',
      businessType: 'Snacks',
      location: 'Market Area, Lucknow',
      status: 'verified',
      createdAt: '2024-01-14T09:00:00Z'
    },
    {
      vendorId: 'VNDR-901234',
      name: 'Geeta Devi',
      phone: '+91 98765 43213',
      email: 'geeta@example.com',
      businessType: 'Clothing',
      location: 'Shopping Complex, Lucknow',
      status: 'rejected',
      createdAt: '2024-01-13T14:00:00Z',
      rejectionReason: 'Incomplete KYC documents'
    }
  ]);

  const handleApprove = (vendorId: string) => {
    setVendors(vendors.map(v => 
      v.vendorId === vendorId ? { ...v, status: 'verified' as const } : v
    ));
    setShowModal(false);
    setSelectedVendor(null);
  };

  const handleReject = (vendorId: string) => {
    if (!rejectionReason) {
      alert('Please provide a rejection reason');
      return;
    }
    setVendors(vendors.map(v => 
      v.vendorId === vendorId ? { ...v, status: 'rejected' as const, rejectionReason } : v
    ));
    setShowModal(false);
    setSelectedVendor(null);
    setRejectionReason('');
  };

  const filteredVendors = vendors.filter(v => {
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.vendorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         v.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: vendors.length,
    pending: vendors.filter(v => v.status === 'pending').length,
    verified: vendors.filter(v => v.status === 'verified').length,
    rejected: vendors.filter(v => v.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Management</h1>
          <p className="text-gray-600">Approve or reject vendor registration requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm mb-1">Total Vendors</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm mb-1">Verified</p>
            <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <p className="text-gray-600 text-sm mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('verified')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'verified' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  statusFilter === 'rejected' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        {/* Vendors List */}
        <div className="space-y-4">
          {filteredVendors.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No vendors found</p>
            </div>
          ) : (
            filteredVendors.map((vendor) => (
              <div key={vendor.vendorId} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                      {vendor.status === 'pending' && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold flex items-center gap-1">
                          <ClockIcon className="h-4 w-4" />
                          Pending
                        </span>
                      )}
                      {vendor.status === 'verified' && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-1">
                          <CheckCircleIcon className="h-4 w-4" />
                          Verified
                        </span>
                      )}
                      {vendor.status === 'rejected' && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold flex items-center gap-1">
                          <XCircleIcon className="h-4 w-4" />
                          Rejected
                        </span>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p><strong className="text-gray-900">ID:</strong> {vendor.vendorId}</p>
                      <p><strong className="text-gray-900">Phone:</strong> {vendor.phone}</p>
                      <p><strong className="text-gray-900">Email:</strong> {vendor.email}</p>
                      <p><strong className="text-gray-900">Business:</strong> {vendor.businessType}</p>
                      <p className="md:col-span-2"><strong className="text-gray-900">Location:</strong> {vendor.location}</p>
                      <p className="md:col-span-2"><strong className="text-gray-900">Registered:</strong> {new Date(vendor.createdAt).toLocaleString()}</p>
                      {vendor.rejectionReason && (
                        <p className="md:col-span-2 text-red-600"><strong>Rejection Reason:</strong> {vendor.rejectionReason}</p>
                      )}
                    </div>
                  </div>

                  {vendor.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(vendor.vendorId)}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setShowModal(true);
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <XCircleIcon className="h-5 w-5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rejection Modal */}
        {showModal && selectedVendor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reject Vendor</h3>
              <p className="text-gray-600 mb-4">
                You are about to reject <strong>{selectedVendor.name}</strong> ({selectedVendor.vendorId})
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter reason for rejection..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedVendor(null);
                    setRejectionReason('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(selectedVendor.vendorId)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
