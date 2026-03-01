'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account and preferences</p>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              FA
            </div>
            <div>
              <p className="font-medium text-slate-900">FA Admin</p>
              <p className="text-sm text-slate-500">Platform Owner</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" defaultValue="FA Admin" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" defaultValue="admin@ventureflow.com" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
              <input type="text" defaultValue="Platform Admin" disabled className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Asia/Shanghai (UTC+8)</option>
                <option>Asia/Hong_Kong (UTC+8)</option>
                <option>America/New_York (UTC-5)</option>
              </select>
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Changes
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { label: 'New buyer registration', desc: 'Get notified when a new buyer submits KYC' },
              { label: 'Deal status changes', desc: 'Updates on deal pipeline progress' },
              { label: 'Agreement signatures', desc: 'When agreements are signed or completed' },
              { label: 'Commission payouts', desc: 'Reminders for pending payments' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
                <button className="relative w-12 h-6 bg-blue-600 rounded-full transition-colors hover:bg-blue-700">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Team Members</h2>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              + Invite
            </button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'FA Admin', email: 'admin@ventureflow.com', role: 'Owner', color: 'bg-purple-500' },
              { name: 'Deal Team', email: 'deals@ventureflow.com', role: 'Admin', color: 'bg-blue-500' },
              { name: 'Compliance', email: 'compliance@ventureflow.com', role: 'Reviewer', color: 'bg-green-500' },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{member.name}</p>
                    <p className="text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full font-medium">{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
          <h2 className="text-lg font-semibold text-red-600 mb-4">⚠️ Danger Zone</h2>
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Reset All Data</p>
              <p className="text-sm text-slate-500">Clear all local storage data (buyers, deals, etc.)</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
