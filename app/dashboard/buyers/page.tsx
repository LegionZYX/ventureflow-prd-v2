'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

// Mock data for buyers
const mockBuyers = [
  { id: 1, name: 'BlueChip Capital', type: 'Institution', kyc: 'Approved', pof: 'Verified', email: 'contact@bluechip.com', date: '2026-02-15', aum: '$500M+', interest: 'Large Blocks' },
  { id: 2, name: 'Pacific Wealth FO', type: 'Family Office', kyc: 'Approved', pof: 'Verified', email: 'info@pacificwealth.com', date: '2026-02-18', aum: '$200M+', interest: 'Growth Stage' },
  { id: 3, name: 'Li Ming', type: 'Individual', kyc: 'Pending', pof: 'Pending', email: 'liming@email.com', date: '2026-02-25', aum: '$15M', interest: 'Pre-IPO' },
  { id: 4, name: 'Zhang Broker Ltd', type: 'Broker', kyc: 'Approved', pof: 'Verified', email: 'deal@zhangbroker.com', date: '2026-02-20', aum: 'N/A', interest: 'All Deals' },
  { id: 5, name: 'Sarah Chen', type: 'Individual', kyc: 'Approved', pof: 'Verified', email: 'sarah.chen@email.com', date: '2026-02-22', aum: '$50M', interest: 'Tech Sector' },
  { id: 6, name: 'Horizon Ventures', type: 'VC Fund', kyc: 'Approved', pof: 'Verified', email: 'invest@horizonvc.com', date: '2026-02-10', aum: '$1.2B', interest: 'Series B+' },
];

// AI Analysis data
const aiInsights = {
  topProspects: [1, 2], // buyer IDs
  pendingReview: [3],
  recommendedActions: [
    { buyerId: 1, action: 'Send ByteDance H Round opportunity', priority: 'High' },
    { buyerId: 2, action: 'Schedule follow-up call', priority: 'Medium' },
    { buyerId: 5, action: 'Invite to exclusive deal room', priority: 'High' },
  ],
};

export default function BuyersPage() {
  const [filter, setFilter] = useState('All');
  const [selectedBuyers, setSelectedBuyers] = useState<number[]>([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const filteredBuyers = filter === 'All' ? mockBuyers : mockBuyers.filter(b => b.type === filter);

  const toggleSelectBuyer = (id: number) => {
    setSelectedBuyers(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const handleBulkEmail = () => {
    if (selectedBuyers.length > 0) {
      setShowEmailModal(true);
    }
  };

  const handleScheduleMeeting = (buyerId: number) => {
    setShowCalendarModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Buyer Management</h1>
            <p className="text-slate-500 mt-1">Manage KYC applications and investor relationships</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            + Add Buyer
          </button>
        </div>

        {/* AI Insights Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🤖</span>
            <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Top Prospects</p>
              <p className="text-2xl font-bold">{aiInsights.topProspects.length} buyers</p>
              <p className="text-xs text-purple-200 mt-1">Ready for outreach</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Pending Review</p>
              <p className="text-2xl font-bold">{aiInsights.pendingReview.length} buyers</p>
              <p className="text-xs text-purple-200 mt-1">Needs attention</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm text-purple-100">Recommended Actions</p>
              <p className="text-2xl font-bold">{aiInsights.recommendedActions.length}</p>
              <p className="text-xs text-purple-200 mt-1">This week</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
              View All Insights
            </button>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium">
              Generate Email Campaign
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Total Buyers</p>
            <p className="text-2xl font-bold text-slate-900">{mockBuyers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">KYC Approved</p>
            <p className="text-2xl font-bold text-green-600">{mockBuyers.filter(b => b.kyc === 'Approved').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-600">{mockBuyers.filter(b => b.kyc === 'Pending').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">POF Verified</p>
            <p className="text-2xl font-bold text-blue-600">{mockBuyers.filter(b => b.pof === 'Verified').length}</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {['All', 'Institution', 'Family Office', 'Individual', 'Broker', 'VC Fund'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {selectedBuyers.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={handleBulkEmail}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center gap-2"
              >
                ✉️ Email Selected ({selectedBuyers.length})
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
                Deselect All
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                    <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBuyers(mockBuyers.map(b => b.id));
                        } else {
                          setSelectedBuyers([]);
                        }
                      }}
                      className="rounded border-slate-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">AUM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">KYC</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">POF</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBuyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedBuyers.includes(buyer.id)}
                        onChange={() => toggleSelectBuyer(buyer.id)}
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{buyer.name}</p>
                        <p className="text-xs text-slate-500">{buyer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        buyer.type === 'Institution' ? 'bg-blue-100 text-blue-700' :
                        buyer.type === 'Family Office' ? 'bg-purple-100 text-purple-700' :
                        buyer.type === 'Broker' ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>{buyer.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{buyer.aum}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        buyer.kyc === 'Approved' ? 'bg-green-100 text-green-700' :
                        buyer.kyc === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>{buyer.kyc}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        buyer.pof === 'Verified' ? 'bg-green-100 text-green-700' :
                        buyer.pof === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>{buyer.pof}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{buyer.interest}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        <button 
                          onClick={() => handleScheduleMeeting(buyer.id)}
                          className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          📅 Schedule
                        </button>
                        {buyer.kyc === 'Pending' && (
                          <>
                            <button className="text-green-600 hover:text-green-800 text-sm font-medium">✓</button>
                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">✕</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🤖 AI-Powered Email Campaign</h3>
            <p className="text-slate-600 mb-4">AI will generate personalized emails for {selectedBuyers.length} selected buyers</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                  <option>Deal Announcement</option>
                  <option>Follow-up</option>
                  <option>Exclusive Invitation</option>
                  <option>Market Update</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Opportunity</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                  <option>ByteDance Series H Common Stock</option>
                  <option>ByteDance Employee Options</option>
                  <option>ByteDance RSU</option>
                </select>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-900 mb-2">✨ AI Preview</p>
                <p className="text-sm text-purple-700">
                  Based on buyer profiles, AI will personalize:
                </p>
                <ul className="text-sm text-purple-700 mt-2 space-y-1">
                  <li>• Investment thesis alignment</li>
                  <li>• Relevant portfolio company comparisons</li>
                  <li>• Customized pricing based on AUM</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowEmailModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => {
                alert('AI generated emails sent to ' + selectedBuyers.length + ' buyers!');
                setShowEmailModal(false);
              }} className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                ✨ Generate & Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📅 Schedule Meeting</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                  <option>Intro Call (30 min)</option>
                  <option>Deal Presentation (1 hour)</option>
                  <option>Due Diligence Session (2 hours)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                <input type="date" className="w-full px-4 py-2 border border-slate-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                    <button key={time} className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-sm">
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCalendarModal(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => {
                  alert('Meeting scheduled! Calendar invite sent.');
                  setShowCalendarModal(false);
                }} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
