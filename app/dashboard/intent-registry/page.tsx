'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock data for buy intents
const mockBuyIntents = [
  { id: 1, name: 'CITIC Hong Kong', email: 'citic@example.com', targetCompany: 'ByteDance', investmentRange: '$200M', timeline: 'Immediate', status: 'New', createdAt: '2026-03-01' },
  { id: 2, name: 'Justin@Antalpha', email: 'justin@antalpha.com', targetCompany: 'ByteDance', investmentRange: '$100M', timeline: 'Short', status: 'Contacted', createdAt: '2026-02-28' },
  { id: 3, name: 'Li Ming', email: 'liming@example.com', targetCompany: 'SpaceX', investmentRange: '$100M', timeline: 'Medium', status: 'Qualified', createdAt: '2026-02-27' },
];

// Mock data for sell intents
const mockSellIntents = [
  { id: 1, name: 'Ny', email: 'ny@example.com', companyName: 'ByteDance', shares: '1000', estimatedValue: '$150M', urgency: 'High', status: 'New', createdAt: '2026-03-01' },
  { id: 2, name: 'FCS Family Office', email: 'fcs@example.com', companyName: 'ByteDance', shares: '500', estimatedValue: '$50M', urgency: 'Medium', status: 'Valuation Sent', createdAt: '2026-02-28' },
  { id: 3, name: 'K Broker', email: 'kbroker@example.com', companyName: 'Stripe', shares: '5000', estimatedValue: '$700M', urgency: 'Low', status: 'In Negotiation', createdAt: '2026-02-25' },
];

export default function IntentRegistryPage() {
  const [intentType, setIntentType] = useState<'all' | 'buy' | 'sell'>('all');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">意向登记管理</h1>
            <p className="text-slate-500 mt-1">Trading Intent Registry - Manage buy and sell intentions</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Intents</p>
            <p className="text-2xl font-bold text-slate-900">{mockBuyIntents.length + mockSellIntents.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Buy Intents</p>
            <p className="text-2xl font-bold text-blue-600">{mockBuyIntents.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Sell Intents</p>
            <p className="text-2xl font-bold text-green-600">{mockSellIntents.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">New Today</p>
            <p className="text-2xl font-bold text-green-600">2</p>
          </div>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setIntentType('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              intentType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All ({mockBuyIntents.length + mockSellIntents.length})
          </button>
          <button
            onClick={() => setIntentType('buy')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              intentType === 'buy'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            👤 Buy Intents ({mockBuyIntents.length})
          </button>
          <button
            onClick={() => setIntentType('sell')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              intentType === 'sell'
                ? 'bg-green-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            🏷️ Sell Intents ({mockSellIntents.length})
          </button>
        </div>

        {/* Buy Intents Table */}
        {(intentType === 'all' || intentType === 'buy') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-blue-50">
              <h2 className="text-lg font-bold text-slate-900">👤 买方意向登记</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Investment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Timeline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockBuyIntents.map((intent) => (
                    <tr key={intent.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{intent.name}</p>
                          <p className="text-xs text-slate-500">{intent.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-900">{intent.targetCompany}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">{intent.investmentRange}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          intent.timeline === 'Immediate' ? 'bg-red-100 text-red-700' :
                          intent.timeline === 'Short' ? 'bg-orange-100 text-orange-700' :
                          intent.timeline === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {intent.timeline}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          intent.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          intent.status === 'Contacted' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {intent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{intent.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">📅 Schedule</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sell Intents Table */}
        {(intentType === 'all' || intentType === 'sell') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-green-50">
              <h2 className="text-lg font-bold text-slate-900">🏷️ 卖方意向登记</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Shares</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Urgency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Created</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockSellIntents.map((intent) => (
                    <tr key={intent.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{intent.name}</p>
                          <p className="text-xs text-slate-500">{intent.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-900">{intent.companyName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-900">{intent.shares}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">{intent.estimatedValue}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          intent.urgency === 'High' ? 'bg-red-100 text-red-700' :
                          intent.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {intent.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          intent.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          intent.status === 'Valuation Sent' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {intent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{intent.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">📅 Schedule</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
