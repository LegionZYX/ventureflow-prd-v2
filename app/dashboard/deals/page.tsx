'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const mockDeals = [
  { id: 1, asset: '字节跳动 H 轮普通股', buyer: 'BlueChip Capital', seller: 'Founder A', price: '$165M', status: 'Negotiating', fee: '$2.5M', progress: 25 },
  { id: 2, asset: '字节跳动员工期权包', buyer: 'Pacific Wealth FO', seller: 'Employee Pool', price: '$48M', status: 'Signed', fee: '$720K', progress: 50 },
  { id: 3, asset: 'AI 视频公司 A 轮', buyer: 'Zhang Broker Ltd', seller: 'VideoAI Founder', price: '$85M', status: 'Closing', fee: '$1.28M', progress: 75 },
  { id: 4, asset: '字节跳动 H 轮普通股', buyer: 'Sarah Chen', seller: 'Founder A', price: '$168M', status: 'Completed', fee: '$2.52M', progress: 100 },
];

export default function DealsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Negotiating': return 'bg-yellow-100 text-yellow-700';
      case 'Signed': return 'bg-blue-100 text-blue-700';
      case 'Closing': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'Negotiating': return 'bg-yellow-500';
      case 'Signed': return 'bg-blue-500';
      case 'Closing': return 'bg-purple-500';
      case 'Completed': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Deal Management</h1>
            <p className="text-slate-500 mt-1">Track and manage transaction pipeline</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            + Create Deal
          </button>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['Negotiating', 'Signed', 'Closing', 'Completed'].map((stage) => {
            const count = mockDeals.filter(d => d.status === stage).length;
            return (
              <div key={stage} className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <p className="text-2xl font-bold text-slate-900">{count}</p>
                <p className="text-xs text-slate-500 mt-1">{stage}</p>
              </div>
            );
          })}
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Deal Pipeline</h2>
          <div className="flex items-center gap-2">
            {['Negotiating', 'Signed', 'Closing', 'Completed'].map((stage, index) => (
              <React.Fragment key={stage}>
                <div className="flex-1 text-center">
                  <div className={`h-2 rounded-full ${
                    stage === 'Negotiating' ? 'bg-yellow-500' :
                    stage === 'Signed' ? 'bg-blue-500' :
                    stage === 'Closing' ? 'bg-purple-500' : 'bg-green-500'
                  }`} />
                  <p className="text-xs text-slate-600 mt-2 font-medium">{stage}</p>
                </div>
                {index < 3 && <div className="w-8 h-0.5 bg-slate-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Buyer → Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">FA Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{deal.asset}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div>{deal.buyer}</div>
                      <div className="text-xs text-slate-400">→ {deal.seller}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{deal.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(deal.status)}`}>{deal.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{deal.fee}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                      {deal.status === 'Negotiating' && (
                        <button className="ml-3 text-green-600 hover:text-green-800 text-sm font-medium">Approve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
