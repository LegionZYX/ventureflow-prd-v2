'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'gaps' | 'history'>('analysis');

  const aiAnalysisResults = [
    {
      id: 1,
      buyer: 'BlueChip Capital',
      document: 'Proof of Funds (POF)',
      bank: 'HSBC Hong Kong',
      balance: '$158,000,000',
      verified: true,
      date: '2026-02-26',
      gaps: ['Bank stamp missing on page 2', 'Signatory authorization letter not attached'],
    },
    {
      id: 2,
      buyer: 'Pacific Wealth FO',
      document: 'Financial Statements',
      bank: 'Bank of China',
      balance: '$85,000,000',
      verified: true,
      date: '2026-02-25',
      gaps: [],
    },
    {
      id: 3,
      buyer: '李明',
      document: 'Bank Statement',
      bank: 'China Merchants Bank',
      balance: '$12,000,000',
      verified: false,
      date: '2026-02-25',
      gaps: ['Account holder name mismatch', 'Document expired'],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">🤖 AI Analysis Center</h1>
          <p className="text-slate-500 mt-1">Automated document verification and gap analysis</p>
        </div>

        {/* AI Stats Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-purple-100">Documents Analyzed</p>
              <p className="text-2xl font-bold">127</p>
            </div>
            <div>
              <p className="text-sm text-purple-100">Verified</p>
              <p className="text-2xl font-bold">98</p>
            </div>
            <div>
              <p className="text-sm text-purple-100">Gaps Found</p>
              <p className="text-2xl font-bold">23</p>
            </div>
            <div>
              <p className="text-sm text-purple-100">Success Rate</p>
              <p className="text-2xl font-bold">77%</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { id: 'analysis', label: '📋 AI Analysis Results', count: aiAnalysisResults.length },
            { id: 'gaps', label: '⚠️ Gaps Found', count: aiAnalysisResults.filter(r => r.gaps.length > 0).length },
            { id: 'history', label: '📜 History', count: 15 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Analysis Results */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            {aiAnalysisResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      result.verified ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className="text-xl">{result.verified ? '✅' : '❌'}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{result.buyer}</h3>
                      <p className="text-sm text-slate-500">{result.document} • {result.bank}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    result.verified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {result.verified ? 'Verified' : 'Issues Found'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Balance</p>
                    <p className="text-lg font-bold text-slate-900">{result.balance}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Analysis Date</p>
                    <p className="text-lg font-bold text-slate-900">{result.date}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Gaps Count</p>
                    <p className={`text-lg font-bold ${result.gaps.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {result.gaps.length}
                    </p>
                  </div>
                </div>

                {result.gaps.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-800 mb-2">⚠️ Gaps Detected:</p>
                    <ul className="space-y-1">
                      {result.gaps.map((gap, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                          <span>•</span> {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    View Full Report
                  </button>
                  <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors">
                    Re-analyze
                  </button>
                  {!result.verified && (
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Mark as Verified
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gaps Summary */}
        {activeTab === 'gaps' && (
          <div className="space-y-4">
            {aiAnalysisResults.filter(r => r.gaps.length > 0).map((result) => (
              <div key={result.id} className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{result.buyer}</h3>
                    <p className="text-sm text-slate-500">{result.document} - {result.gaps.length} issues</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {result.gaps.map((gap, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span className="text-sm text-red-800">{gap}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                    Request Additional Documents
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Result</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { doc: 'POF - BlueChip Capital', buyer: 'BlueChip Capital', date: '2026-02-26 14:30', result: 'Verified' },
                  { doc: 'Financial Statements - VideoAI', buyer: 'VideoAI Inc', date: '2026-02-25 09:15', result: 'Gaps Found' },
                  { doc: 'KYC - Sarah Chen', buyer: 'Sarah Chen', date: '2026-02-24 16:45', result: 'Verified' },
                  { doc: 'Bank Statement - 李明', buyer: '李明', date: '2026-02-24 10:20', result: 'Gaps Found' },
                  { doc: 'POF - Pacific Wealth', buyer: 'Pacific Wealth FO', date: '2026-02-23 15:30', result: 'Verified' },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.doc}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.buyer}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        item.result === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>{item.result}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
