'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AssetsPage() {
  const assets = [
    { id: 1, name: '字节跳动 H 轮普通股', company: 'ByteDance', type: 'ByteDance', valuation: '$225B', price: '$165.5', status: 'Active' },
    { id: 2, name: '字节跳动员工期权包', company: 'ByteDance', type: 'ByteDance', valuation: '$210B', price: '$142', status: 'Active' },
    { id: 3, name: 'AI 视频公司 A 轮', company: 'VideoAI Inc', type: 'AI', valuation: '$500M', price: '$9.0', status: 'Active' },
    { id: 4, name: '太空算力 SPV', company: 'SpaceCompute LP', type: 'SPV', valuation: '$10B', price: '$100', status: 'Active' },
    { id: 5, name: '字节跳动 RSU', company: 'ByteDance', type: 'ByteDance', valuation: '$230B', price: '$172.8', status: 'Sold' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ByteDance': return 'bg-blue-100 text-blue-700';
      case 'AI': return 'bg-purple-100 text-purple-700';
      case 'SPV': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Asset Management</h1>
            <p className="text-slate-500 mt-1">Manage equity deals and listings</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Create Asset
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Assets</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Active Listings</p>
            <p className="text-2xl font-bold text-slate-900">4</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Volume</p>
            <p className="text-2xl font-bold text-slate-900">$173M</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Asset Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Valuation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{asset.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{asset.company}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(asset.type)}`}>{asset.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{asset.valuation}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{asset.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(asset.status)}`}>{asset.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="ml-3 text-slate-600 hover:text-slate-800 text-sm">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
