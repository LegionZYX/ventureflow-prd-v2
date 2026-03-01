'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function BuyersPage() {
  const buyers = [
    { id: 1, name: 'BlueChip Capital', type: 'Institution', kyc: 'Approved', pof: 'Verified', email: 'contact@bluechip.com', date: '2026-02-15' },
    { id: 2, name: 'Pacific Wealth FO', type: 'Institution', kyc: 'Approved', pof: 'Verified', email: 'info@pacificwealth.com', date: '2026-02-18' },
    { id: 3, name: '李明', type: 'Individual', kyc: 'Pending', pof: 'Pending', email: 'liming@email.com', date: '2026-02-25' },
    { id: 4, name: 'Zhang Broker Ltd', type: 'Broker', kyc: 'Approved', pof: 'Verified', email: 'deal@zhangbroker.com', date: '2026-02-20' },
    { id: 5, name: 'Sarah Chen', type: 'Individual', kyc: 'Approved', pof: 'Verified', email: 'sarah.chen@email.com', date: '2026-02-22' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Verified':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Buyer Management</h1>
            <p className="text-slate-500 mt-1">Manage KYC applications and buyer profiles</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Add Buyer
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700">
            <option>All Types</option>
            <option>Institution</option>
            <option>Individual</option>
            <option>Broker</option>
          </select>
          <select className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700">
            <option>All Status</option>
            <option>Pending KYC</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">KYC Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">POF Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {buyers.map((buyer) => (
                <tr key={buyer.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{buyer.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{buyer.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(buyer.kyc)}`}>{buyer.kyc}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(buyer.pof)}`}>{buyer.pof}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{buyer.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{buyer.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    {buyer.kyc === 'Pending' && (
                      <>
                        <button className="ml-3 text-green-600 hover:text-green-800 text-sm">Approve</button>
                        <button className="ml-3 text-red-600 hover:text-red-800 text-sm">Reject</button>
                      </>
                    )}
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
