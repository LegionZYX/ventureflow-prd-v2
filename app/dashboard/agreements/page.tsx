'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AgreementsPage() {
  const agreements = [
    { id: 1, type: 'FA Agreement', deal: '字节跳动 H 轮 #1', status: 'Pending', date: '2026-02-26' },
    { id: 2, type: 'Subscription Agreement', deal: '字节跳动 H 轮 #1', status: 'Draft', date: '2026-02-26' },
    { id: 3, type: 'FA Agreement', deal: '员工期权包 #2', status: 'Signed', date: '2026-02-24' },
    { id: 4, type: 'Subscription Agreement', deal: '员工期权包 #2', status: 'Signed', date: '2026-02-24' },
    { id: 5, type: 'FA Agreement', deal: '字节跳动 H 轮 #4', status: 'Completed', date: '2026-02-20' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-slate-100 text-slate-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Signed': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Agreement Management</h1>
            <p className="text-slate-500 mt-1">FA agreements and subscription documents</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Generate Agreement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Draft</p>
            <p className="text-2xl font-bold text-slate-900">1</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-slate-900">1</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Signed</p>
            <p className="text-2xl font-bold text-slate-900">2</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-2xl font-bold text-slate-900">1</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Related Deal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {agreements.map((agreement) => (
                <tr key={agreement.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{agreement.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{agreement.deal}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(agreement.status)}`}>{agreement.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{agreement.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="ml-3 text-slate-600 hover:text-slate-800 text-sm">Download</button>
                    {agreement.status === 'Pending' && (
                      <button className="ml-3 text-green-600 hover:text-green-800 text-sm">Send</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Templates Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Agreement Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
              <h3 className="font-medium text-slate-900">FA Fee Agreement</h3>
              <p className="text-sm text-slate-500 mt-1">Standard fee splitting agreement template</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors">
              <h3 className="font-medium text-slate-900">Equity Subscription Agreement</h3>
              <p className="text-sm text-slate-500 mt-1">Share purchase agreement for equity transfers</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
