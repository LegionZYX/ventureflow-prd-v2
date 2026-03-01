'use client';

import React, { useState, useEffect } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PriceChart from '@/components/PriceChart';

interface UserPortfolio {
  name: string;
  email: string;
  holdings: Holding[];
  inquiries: Inquiry[];
  totalValue: string;
}

interface Holding {
  id: number;
  asset: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  gainLoss: number;
}

interface Inquiry {
  id: number;
  asset: string;
  amount: string;
  status: 'Pending' | 'In Review' | 'Meeting Scheduled' | 'Completed';
  date: string;
}

const mockPortfolio: UserPortfolio = {
  name: 'John Investor',
  email: 'investor@example.com',
  totalValue: '$2,450,000',
  holdings: [
    { id: 1, asset: 'ByteDance Series H Common', shares: 5000, avgPrice: 155, currentPrice: 165.5, value: 827500, gainLoss: 52500 },
    { id: 2, asset: 'ByteDance Employee Options', shares: 2000, avgPrice: 135, currentPrice: 142, value: 284000, gainLoss: 14000 },
    { id: 3, asset: 'AI Video Co Series A', shares: 10000, avgPrice: 8, currentPrice: 9, value: 90000, gainLoss: 10000 },
  ],
  inquiries: [
    { id: 1, asset: 'ByteDance RSU', amount: '$100K - $500K', status: 'Pending', date: '2026-02-26' },
    { id: 2, asset: 'Space Computing SPV', amount: '$500K - $1M', status: 'Meeting Scheduled', date: '2026-02-24' },
  ],
};

export default function UserDashboardPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<UserPortfolio | null>(null);
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [showResellModal, setShowResellModal] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('vf_user_session');
    if (!session) {
      router.push('/user/login');
      return;
    }
    setPortfolio(mockPortfolio);
  }, [router]);

  const handleResell = (holding: Holding) => {
    setSelectedHolding(holding);
    setShowResellModal(true);
  };

  if (!portfolio) {
    return (
      <BuyerLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading portfolio...</p>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  const totalGainLoss = portfolio.holdings.reduce((sum, h) => sum + h.gainLoss, 0);

  return (
    <BuyerLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">My Portfolio</h1>
            <p className="text-slate-600 mt-1">Welcome back, {portfolio.name}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <p className="text-sm text-blue-100">Total Portfolio Value</p>
              <p className="text-3xl font-bold mt-2">{portfolio.totalValue}</p>
              <p className="text-sm text-blue-200 mt-2">Updated: Just now</p>
            </div>
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
              <p className="text-sm text-green-100">Total Gain/Loss</p>
              <p className="text-3xl font-bold mt-2">+${totalGainLoss.toLocaleString()}</p>
              <p className="text-sm text-green-200 mt-2">All time</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
              <p className="text-sm text-purple-100">Active Inquiries</p>
              <p className="text-3xl font-bold mt-2">{portfolio.inquiries.length}</p>
              <p className="text-sm text-purple-200 mt-2">Pending responses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Holdings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">My Holdings</h2>
                <div className="space-y-4">
                  {portfolio.holdings.map((holding) => (
                    <div key={holding.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900">{holding.asset}</h3>
                          <p className="text-sm text-slate-500">{holding.shares.toLocaleString()} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">${holding.value.toLocaleString()}</p>
                          <p className={`text-sm ${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toLocaleString()} ({((holding.gainLoss / (holding.avgPrice * holding.shares)) * 100).toFixed(2)}%)
                          </p>
                        </div>
                      </div>

                      {/* Mini Chart */}
                      <div className="mb-4 h-32">
                        <PriceChart height={128} />
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-500">Avg Price</p>
                          <p className="font-medium">${holding.avgPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Current Price</p>
                          <p className="font-medium">${holding.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Reference Valuation</p>
                          <p className="font-medium text-blue-600">~${(holding.currentPrice * holding.shares).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleResell(holding)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          💰 Request to Sell
                        </button>
                        <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiries Sidebar */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">My Inquiries</h2>
                <div className="space-y-4">
                  {portfolio.inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="mb-2">
                        <h3 className="font-medium text-slate-900">{inquiry.asset}</h3>
                        <p className="text-sm text-slate-500">{inquiry.amount}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className=
