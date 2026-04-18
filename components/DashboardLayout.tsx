'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

const navItems = [
  { name: 'faDash.title', href: '/dashboard', icon: '📊' },
  { name: 'buyers.title', href: '/dashboard/buyers', icon: '👥' },
  { name: 'orders.title', href: '/dashboard/orders', icon: '📦' },
  { name: 'assets.title', href: '/dashboard/assets', icon: '💼' },
  { name: 'deals.title', href: '/dashboard/deals', icon: '🤝' },
  { name: 'intentReg.title', href: '/dashboard/intent-registry', icon: '📝' },
  { name: 'agreements.title', href: '/dashboard/agreements', icon: '📄' },
  { name: 'commission.title', href: '/dashboard/commission', icon: '💰' },
  { name: 'aiTools.title', href: '/dashboard/ai-tools', icon: '🤖' },
  { name: 'settings.title', href: '/dashboard/settings', icon: '⚙️' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t, lang, setLang } = useLang();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            VentureFlow
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">✕</button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{t(item.name)}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full mt-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm text-left">
            {t('settings.logout')}
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              ☰
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                {lang === 'en' ? '🇺🇸 EN' : '🇨🇳 中文'}
              </button>

              <button onClick={handleLogout} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                {t('settings.logout')}
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
