'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Buyers', href: '/dashboard/buyers', icon: '👥' },
  { name: 'Assets', href: '/dashboard/assets', icon: '💼' },
  { name: 'Deals', href: '/dashboard/deals', icon: '🤝' },
  { name: 'Agreements', href: '/dashboard/agreements', icon: '📄' },
  { name: 'Commission', href: '/dashboard/commission', icon: '💰' },
  { name: 'AI Tools', href: '/dashboard/ai-tools', icon: '🤖' },
  { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <Link href="/dashboard" className="text-xl font-bold text-white">VentureFlow</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">✕</button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">☰</button>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-900">{user?.name}</div>
              <div className="text-xs text-slate-500">{user?.email}</div>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
