'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

// Mock inquiry data
const mockInquiries = [
  { 
    id: 1, 
    buyer: 'BlueChip Capital', 
    asset: 'ByteDance Series H Common Stock', 
    amount: '$5M - $10M', 
    status: 'New', 
    date: '2026-02-26',
    faAgreement: 'Signed',
    meetingScheduled: false,
    progress: 25
  },
  { 
    id: 2, 
    buyer: 'Pacific Wealth FO', 
    asset: 'ByteDance Employee Options', 
    amount: '$1M - $5M', 
    status: 'Meeting Scheduled', 
    date: '2026-02-25',
    faAgreement: 'Signed',
    meetingScheduled: true,
    meetingDate: '2026-03-01 14:00',
    progress: 50
  },
  { 
    id: 3, 
    buyer: 'Horizon Ventures', 
    asset: 'Space Computing SPV', 
    amount: '$10M+', 
    status: 'Due Diligence', 
    date: '2026-02-24',
    faAgreement: 'Signed',
    meetingScheduled: true,
    meetingDate: '2026-02-28 10:00',
    progress: 75
  },
  { 
    id: 4, 
    buyer: 'Li Ming', 
    asset: 'ByteDance RSU', 
    amount: '$100K - $500K', 
    status: 'FA Pending', 
    date: '2026-02-26',
    faAgreement: 'Pending',
    meetingScheduled: false,
    progress: 10
  },
];

const mockListings = [
  { id: 1, seller: 'Employee Pool #1', asset: 'ByteDance Options', shares: '50,000', minPrice: '$140', status: 'Active', inquiries: 8 },
  { id: 2, seller: 'Founder A', asset: 'ByteDance Series H', shares: '500,000', minPrice: '$160', status: 'Under Review', inquiries: 3 },
  { id: 3, seller: 'VideoAI Founder', asset: 'AI Video Co Series A', shares: '200,000', minPrice: '$8.5', status: 'Active', inquiries: 12 },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'listings' | 'calendar'>('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleScheduleMeeting = (inquiry: typeof mockInquiries[0]) => {
    setSelectedInquiry(inquiry);
    setShowCalendar(true);
  };

  const updateProgress = (id: number, newProgress: number) => {
    const statusMap: { [key: number]: string } = {
      10: 'FA Pending',
      25: 'New',
      50: 'Meeting Scheduled',
      75: 'Due Diligence',
      100: 'Closing',
    };
    alert(`Progress updated to ${newProgress}% - Status: ${statusMap[newProgress]}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Order Management</h1>
            <p className="text-slate-500 mt-1">Track inquiries, listings, and schedule meetings</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Active Inquiries</p>
            <p className="text-2xl font-bold text-blue-600">{mockInquiries.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Active Listings</p>
            <p className="text-2xl font-bold text-green-600">{mockListings.filter(l => l.status === 'Active').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Meetings This Week</p>
            <p className="text-2xl font-bold text-purple-600">{mockInquiries.filter(i => i.meetingScheduled).length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">Pending FA Agreements</p>
            <p className="text-2xl font-bold text-yellow-600">{mockInquiries.filter(i => i.faAgreement === 'Pending').length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          {[
            { id: 'inquiries', label: '📨 Buyer Inquiries', count: mockInquiries.length },
            { id: 'listings', label: '💼 Seller Listings', count: mockListings.length },
            { id: 'calendar', label: '📅 Calendar', count: 3 },
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

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">FA Agreement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{inquiry.buyer}</p>
                        <p className="text-xs text-slate-500">{inquiry.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{inquiry.asset}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{inquiry.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        inquiry.faAgreement === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {inquiry.faAgreement}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        inquiry.status === 'Meeting Scheduled' ? 'bg-purple-100 text-purple-700' :
                        inquiry.status === 'Due Diligence' ? 'bg-orange-100 text-orange-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all" 
                            style={{ width: `${inquiry.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-8">{inquiry.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                        {!inquiry.meetingScheduled && (
                          <button 
                            onClick={() => handleScheduleMeeting(inquiry)}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            📅 Schedule
                          </button>
                        )}
                        {inquiry.meetingScheduled && (
                          <span className="text-xs text-green-600">✓ {inquiry.meetingDate}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Seller</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Shares</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Min Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Inquiries</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{listing.seller}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{listing.asset}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{listing.shares}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{listing.minPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        listing.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{listing.inquiries} inquiries</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">📅 Upcoming Meetings</h3>
              <div className="space-y-4">
                {mockInquiries.filter(i => i.meetingScheduled).map((inquiry) => (
                  <div key={inquiry.id} className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-slate-900">{inquiry.buyer}</h4>
                        <p className="text-sm text-slate-500">{inquiry.asset}</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full font-medium">
                        {inquiry.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span>📅</span>
                      <span>{inquiry.meetingDate}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                        Reschedule
                      </button>
                      <button className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">✅ Task Checklist</h3>
              <div className="space-y-3">
                {[
                  { task: 'Review new inquiry from BlueChip Capital', done: false, priority: 'High' },
                  { task: 'Prepare valuation report for ByteDance Series H', done: false, priority: 'High' },
                  { task: 'Schedule follow-up call with Pacific Wealth', done: true, priority: 'Medium' },
                  { task: 'Send FA agreement to Li Ming', done: false, priority: 'Medium' },
                  { task: 'Update listing status for VideoAI shares', done: true, priority: 'Low' },
                ].map((task, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${task.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                        {task.task}
                      </p>
                      <span className={`text-xs ${
                        task.priority === 'High' ? 'text-red-600' :
                        task.priority === 'Medium' ? 'text-orange-600' : 'text-slate-500'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Modal */}
      {showCalendar && selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📅 Schedule Meeting</h3>
            <p className="text-slate-600 mb-4">with {selectedInquiry.buyer}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Meeting Type</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                  <option>Intro Call (30 min)</option>
                  <option>Deal Presentation (1 hour)</option>
                  <option>Due Diligence Session (2 hours)</option>
                  <option>Signing Meeting (1 hour)</option>
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
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm text-purple-800">
                  📧 Calendar invite will be sent to {selectedInquiry.buyer} automatically
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCalendar(false)} 
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Meeting scheduled! Calendar invite sent.');
                    setShowCalendar(false);
                  }} 
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
