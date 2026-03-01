'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const mockAssets = [
  { id: 1, name: '字节跳动 H 轮普通股', company: 'ByteDance', type: 'ByteDance', valuation: '$225B', price: '$165.5', volume: '$50M', status: 'Active' },
  { id: 2, name: '字节跳动员工期权包', company: 'ByteDance', type: 'ByteDance', valuation: '$210B', price: '$142', volume: '$5M', status: 'Active' },
  { id: 3, name: 'AI 视频公司 A 轮', company: 'VideoAI Inc', type: 'AI', valuation: '$500M', price: '$9.0', volume: '$2M', status: 'Active' },
  { id: 4, name: '太空算力 SPV', company: 'SpaceCompute LP', type: 'SPV', valuation: '$10B', price: '$100', volume: '$100M', status: 'Active' },
  { id: 5, name: '字节跳动 RSU', company: 'ByteDance', type: 'ByteDance', valuation: '$230B', price: '$172.8', volume: '$12M', status: 'Sold' },
];

export default function AssetsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Asset Management</h1>
            <p className="text-slate-500 mt-1">Manage equity deals and listings</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            + Create Asset
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Assets</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Active Listings</p>
            <p className="text-2xl font-bold text-green-600">4</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Volume</p>
            <p className="text-2xl font-bold text-slate-900">$169M</p>
          </div>
        </div>

        {/* Asset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{asset.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{asset.company}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  asset.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                }`}>{asset.status}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Valuation</span>
                  <span className="text-sm font-semibold text-slate-900">{asset.valuation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Price/Share</span>
                  <span className="text-sm font-semibold text-blue-600">{asset.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Volume</span>
                  <span className="text-sm font-semibold text-slate-900">{asset.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Type</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                    asset.type === 'ByteDance' ? 'bg-blue-100 text-blue-700' :
                    asset.type === 'AI' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>{asset.type}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
