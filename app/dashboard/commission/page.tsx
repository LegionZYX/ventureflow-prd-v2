'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function CommissionPage() {
  const commissions = [
    { id: 1, deal: '字节跳动 H 轮 #1', totalFee: '$2.5M', platform: '$750K (30%)', brokers: '$1.75M', status: 'Pending' },
    { id: 2, deal: '员工期权包 #2', totalFee: '$720K', platform: '$360K (50%)', brokers: '$360K', status: 'Paid' },
    { id: 3, deal: 'AI 视频公司 #3', totalFee: '$1.28M', platform: '$512K (40%)', brokers: '$768K', status: 'Pending' },
    { id: 4, deal: '字节跳动 H 轮 #4', totalFee: '$2.52M', platform: '$756K (30%)', brokers: '$1.76M', status: 'Paid' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Commission Management</h1>
            <p className="text-slate-500 mt-1">Track FA fees and broker splits</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Add Commission
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Fees (MTD)</p>
            <p className="text-2xl font-bold text-slate-900">$7.02M</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Platform Share</p>
            <p className="text-2xl font-bold text-slate-900">$2.38M</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Pending Payout</p>
            <p className="text-2xl font-bold text-slate-900">$3.78M</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Total Fee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Platform</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Brokers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {commissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{comm.deal}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{comm.totalFee}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{comm.platform}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{comm.brokers}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comm.status)}`}>{comm.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Details</button>
                    {comm.status === 'Pending' && (
                      <button className="ml-3 text-green-600 hover:text-green-800 text-sm">Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fee Split Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Fee Split Configuration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Default Platform Share</p>
                <p className="text-sm text-slate-500">Percentage of FA fee retained by platform</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max="100" defaultValue="40" className="w-32" />
                <span className="text-lg font-bold text-blue-600 w-12 text-right">40%</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h3 className="font-medium text-slate-900 mb-3">Broker Split Rules</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">Primary Broker (Deal Originator)</span>
                  <span className="font-medium text-slate-900">50% of broker share</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">Secondary Broker (Buyer Side)</span>
                  <span className="font-medium text-slate-900">30% of broker share</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">Referral Partner</span>
                  <span className="font-medium text-slate-900">20% of broker share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
