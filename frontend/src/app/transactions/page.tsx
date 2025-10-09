'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowTrendingUpIcon,
  FunnelIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

export default function TransactionsPage() {
  const [filter, setFilter] = useState<'all' | 'contribution' | 'loan' | 'withdrawal'>('all');

  // Mock data
  const transactions = [
    { id: '1', type: 'contribution', amount: 200, group: 'Chowk Sellers Group', date: '2025-10-01', status: 'completed' },
    { id: '2', type: 'loan', amount: 5000, group: 'Chowk Sellers Group', date: '2025-09-28', status: 'approved' },
    { id: '3', type: 'repayment', amount: 1000, group: 'Chowk Sellers Group', date: '2025-09-25', status: 'completed' },
    { id: '4', type: 'contribution', amount: 200, group: 'Chowk Sellers Group', date: '2025-09-15', status: 'completed' },
    { id: '5', type: 'withdrawal', amount: 500, group: 'Chowk Sellers Group', date: '2025-09-10', status: 'pending' }
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
            <p className="text-gray-600">View all your financial activities</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <FunnelIcon className="h-5 w-5 text-gray-600" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('contribution')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'contribution'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Contributions
              </button>
              <button
                onClick={() => setFilter('loan')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'loan'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Loans
              </button>
              <button
                onClick={() => setFilter('withdrawal')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filter === 'withdrawal'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Withdrawals
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-6">
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className={`rounded-full p-3 mr-4 ${
                      transaction.type === 'contribution' ? 'bg-green-100' :
                      transaction.type === 'loan' ? 'bg-blue-100' :
                      transaction.type === 'repayment' ? 'bg-purple-100' :
                      'bg-amber-100'
                    }`}>
                      <CurrencyRupeeIcon className={`h-6 w-6 ${
                        transaction.type === 'contribution' ? 'text-green-600' :
                        transaction.type === 'loan' ? 'text-blue-600' :
                        transaction.type === 'repayment' ? 'text-purple-600' :
                        'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
                      <p className="text-sm text-gray-600">{transaction.group}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">
                      {transaction.type === 'contribution' || transaction.type === 'repayment' ? '+' : '-'}
                      ₹{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
          </div>
        </div>

      </div>
    </div>
  );
}
