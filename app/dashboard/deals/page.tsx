'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function DealsPage() {
  const deals = [
    { id: 1, asset: '字节跳动 H 轮普通股', buyer: 'BlueChip Capital', seller: 'Founder A', price: '$165M', status: 'Negotiating', fee: '$2.5M' },
    { id: 2, asset: '字节跳动员工期权包', buyer: 'Pacific Wealth FO', seller: 'Employee Pool', price: '$48M', status: 'Signed', fee: '$720K' },
    { id: 3, asset: 'AI 视频公司 A 轮', buyer: 'Zhang Broker Ltd', seller: 'VideoAI Founder', price: '$85M', status: 'Closing', fee: '$1.28M' },
    { id: 4, asset: '字节跳动 H 轮普通股', buyer: 'Sarah Chen', seller: 'Founder A', price: '$168M', status: 'Completed', fee: '$2.52M' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Negotiating': return 'bg-yellow-100 text-yellow-700';
      case 'Signed': return 'bg-blue-100 text-blue-700';
      case 'Closing': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Deal Management</h1>
            <p className="text-slate-500 mt-1">Track and manage transaction pipeline</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Create Deal
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">FA Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{deal.asset}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{deal.buyer}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{deal.seller}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{deal.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(deal.status)}`}>{deal.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{deal.fee}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    {deal.status === 'Negotiating' && (
                      <button className="ml-3 text-green-600 hover:text-green-800 text-sm">Approve</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deal Flow Visualization */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Deal Flow Pipeline</h2>
          <div className="flex items-center justify-between">
            {['Negotiating', 'Signed', 'Closing', 'Completed'].map((stage, index) => (
              <React.Fragment key={stage}>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                    stage === 'Negotiating' ? 'bg-yellow-500' :
                    stage === 'Signed' ? 'bg-blue-500' :
                    stage === 'Closing' ? 'bg-purple-500' : 'bg-green-500'
                  } text-white font-bold`}>
                    {deals.filter(d => d.status === stage).length}
                  </div>
                  <p className="text-sm text-slate-600 mt-2">{stage}</p>
                </div>
                {index < 3 && <div className="flex-1 h-1 bg-slate-200 mx-4" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
