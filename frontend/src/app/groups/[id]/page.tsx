'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  UserGroupIcon,
  CurrencyRupeeIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function GroupDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'transactions' | 'chat'>('overview');
  const [showContributionModal, setShowContributionModal] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanReason, setLoanReason] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data
  const group = {
    id: params.id,
    name: 'Chowk Sellers Group',
    description: 'A community group for street vendors in Chowk area',
    members: 12,
    balance: 4500,
    adminId: '1',
    createdAt: '2025-09-01',
    settings: {
      minContribution: 200,
      maxLoanAmount: 10000,
      requireApproval: true
    }
  };

  const members = [
    { id: '1', name: 'Ram Kumar', role: 'admin', joinedAt: '2025-09-01', contributions: 1200 },
    { id: '2', name: 'Sita Devi', role: 'member', joinedAt: '2025-09-02', contributions: 800 },
    { id: '3', name: 'Mohan Lal', role: 'member', joinedAt: '2025-09-05', contributions: 600 }
  ];

  const transactions = [
    { id: '1', type: 'contribution', amount: 200, user: 'Ram Kumar', date: '2025-10-01', status: 'completed' },
    { id: '2', type: 'loan', amount: 5000, user: 'Sita Devi', date: '2025-09-28', status: 'approved' },
    { id: '3', type: 'repayment', amount: 1000, user: 'Mohan Lal', date: '2025-09-25', status: 'completed' }
  ];

  const handleContribution = () => {
    const amount = parseFloat(contributionAmount);
    if (!amount || amount < group.settings.minContribution) {
      alert(`Minimum contribution is ₹${group.settings.minContribution}`);
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowContributionModal(false);
      setContributionAmount('');
      alert(`Successfully contributed ₹${amount.toLocaleString()}!`);
    }, 1000);
  };

  const handleLoanRequest = () => {
    const amount = parseFloat(loanAmount);
    if (!amount || amount > group.settings.maxLoanAmount) {
      alert(`Maximum loan amount is ₹${group.settings.maxLoanAmount.toLocaleString()}`);
      return;
    }
    if (!loanReason.trim()) {
      alert('Please provide a reason for the loan');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowLoanModal(false);
      setLoanAmount('');
      setLoanReason('');
      alert(`Loan request for ₹${amount.toLocaleString()} submitted successfully! Awaiting approval.`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <UserGroupIcon className="h-10 w-10 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
                <p className="text-gray-600">{group.description}</p>
              </div>
            </div>
            <Link
              href="/groups"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
            >
              Back to Groups
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <p className="text-blue-600 text-sm font-medium mb-1">Total Members</p>
              <p className="text-3xl font-bold text-blue-900">{group.members}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <p className="text-green-600 text-sm font-medium mb-1">Group Balance</p>
              <p className="text-3xl font-bold text-green-900">₹{group.balance.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <p className="text-purple-600 text-sm font-medium mb-1">Min Contribution</p>
              <p className="text-3xl font-bold text-purple-900">₹{group.settings.minContribution}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'members'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'transactions'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Chat
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Group Settings</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Minimum Contribution</p>
                      <p className="text-2xl font-bold text-gray-900">₹{group.settings.minContribution}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Maximum Loan Amount</p>
                      <p className="text-2xl font-bold text-gray-900">₹{group.settings.maxLoanAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowContributionModal(true)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                  >
                    Make Contribution
                  </button>
                  <button
                    onClick={() => setShowLoanModal(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                  >
                    Request Loan
                  </button>
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-full p-3 mr-3">
                        <UsersIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">Joined {member.joinedAt}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        member.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {member.role}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">₹{member.contributions} contributed</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className={`rounded-full p-3 mr-3 ${
                        transaction.type === 'contribution' ? 'bg-green-100' :
                        transaction.type === 'loan' ? 'bg-blue-100' : 'bg-purple-100'
                      }`}>
                        <CurrencyRupeeIcon className={`h-6 w-6 ${
                          transaction.type === 'contribution' ? 'text-green-600' :
                          transaction.type === 'loan' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.user} • {transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                        transaction.status === 'approved' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="text-center py-12">
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Group chat feature coming soon!</p>
                <p className="text-sm text-gray-500">Real-time messaging will be available in the next update.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Modal */}
        {showContributionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Make Contribution</h3>
              <p className="text-gray-600 mb-6">
                Contribute to the group fund. Minimum contribution: <strong>₹{group.settings.minContribution}</strong>
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={contributionAmount}
                    onChange={(e) => setContributionAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    placeholder="0"
                    min={group.settings.minContribution}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Enter amount (min: ₹{group.settings.minContribution})
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowContributionModal(false);
                    setContributionAmount('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleContribution}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Contribute'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loan Request Modal */}
        {showLoanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Loan</h3>
              <p className="text-gray-600 mb-6">
                Request a loan from the group fund. Maximum loan: <strong>₹{group.settings.maxLoanAmount.toLocaleString()}</strong>
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="0"
                    max={group.settings.maxLoanAmount}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Max: ₹{group.settings.maxLoanAmount.toLocaleString()}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Loan *
                </label>
                <textarea
                  value={loanReason}
                  onChange={(e) => setLoanReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Explain why you need this loan..."
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> Loan requests require admin approval
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowLoanModal(false);
                    setLoanAmount('');
                    setLoanReason('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLoanRequest}
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
