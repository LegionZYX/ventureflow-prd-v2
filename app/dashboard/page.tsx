'use client';

import React, { useEffect, useState } from 'react';
import { dashboardStats, activityTimeline, mockBuyers, mockAssets, mockDeals } from '@/lib/mockData';
import { loadBuyers, loadAssets, loadDeals } from '@/lib/storage';

function formatCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
}

export default function DashboardPage() {
  const [buyers, setBuyers] = useState(mockBuyers);
  const [assets, setAssets] = useState(mockAssets);
  const [deals, setDeals] = useState(mockDeals);

  useEffect(() => {
    const storedBuyers = loadBuyers();
    const storedAssets = loadAssets();
    const storedDeals = loadDeals();
    if (storedBuyers.length) setBuyers(storedBuyers);
    if (storedAssets.length) setAssets(storedAssets);
    if (storedDeals.length) setDeals(storedDeals);
  }, []);

  const stats = [
    { label: 'Total GMV', value: formatCurrency(dashboardStats.totalGmv), change: '+12.5%', color: 'blue' },
    { label: 'Pending Buyers', value: dashboardStats.pendingBuyers.toString(), change: '+3', color: 'green' },
    { label: 'Active Deals', value: dashboardStats.activeDeals.toString(), change: '+2', color: 'purple' },
    { label: 'Monthly Closed', value: dashboardStats.monthlyClosed.toString(), change: '+1', color: 'orange' },
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to VentureFlow FA Backend</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-2 h-2 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`} />
            </div>
            <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
          </div>
        ))}
      </div>

      {/* Activity Timeline & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activityTimeline.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'buyer_joined' ? 'bg-blue-500' :
                  activity.type === 'deal_completed' ? 'bg-green-500' :
                  activity.type === 'agreement_signed' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/dashboard/buyers" className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors">
              👥 Review KYC Applications
            </a>
            <a href="/dashboard/assets" className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition-colors">
              💼 Create New Asset
            </a>
            <a href="/dashboard/deals" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition-colors">
              🤝 Manage Active Deals
            </a>
            <a href="/dashboard/ai-tools" className="block p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 transition-colors">
              🤖 AI Document Parser
            </a>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Market Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-500">ByteDance Implied Valuation</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">$225B</p>
            <p className="text-sm text-green-600 mt-1">+4.2% (30d)</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Monthly Volume</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">$1.45B</p>
            <p className="text-sm text-green-600 mt-1">+12.5% (30d)</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Avg Discount Rate</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">-1.2%</p>
            <p className="text-sm text-slate-500 mt-1">vs Series F</p>
          </div>
        </div>
      </div>
    </div>
  );
}
