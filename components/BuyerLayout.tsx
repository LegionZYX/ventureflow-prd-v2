'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

const navItems = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.opportunities', href: '/opportunities' },
  { name: 'nav.sell', href: '/sell' },
  { name: 'nav.about', href: '/about' },
  { name: 'nav.contact', href: '/contact' },
];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLang();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-slate-900">VentureFlow</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  {t(item.name)}
                </Link>
              ))}
            </div>

            {/* Right Side: Lang Switcher + Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <button
                onClick={toggleLang}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                {lang === 'en' ? '🇺🇸 EN' : '🇨🇳 中文'}
              </button>
              
              <Link href="/user/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                {t('nav.login')}
              </Link>
              <Link href="/kyc" className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                {t('nav.getStarted')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Language Switcher Mobile */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
                <span className="text-sm text-slate-600">Language:</span>
                <button
                  onClick={toggleLang}
                  className={`px-3 py-1 text-sm rounded-lg border ${
                    lang === 'en' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={toggleLang}
                  className={`px-3 py-1 text-sm rounded-lg border ${
                    lang === 'zh' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  中文
                </button>
              </div>
              
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="block text-slate-600 hover:text-slate-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.name)}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <Link href="/user/login" className="block text-center text-slate-600 font-medium py-2">
                  {t('nav.login')}
                </Link>
                <Link href="/kyc" className="block text-center bg-blue-600 text-white font-medium py-2 rounded-lg">
                  {t('nav.getStarted')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {children}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-bold">VentureFlow</span>
              </div>
              <p className="text-slate-400 text-sm">
                Global leader in ByteDance equity secondary market trading.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.platform')}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="/opportunities" className="hover:text-white">{t('nav.opportunities')}</Link></li>
                <li><Link href="/kyc" className="hover:text-white">{t('nav.getStarted')}</Link></li>
                <li><Link href="/about" className="hover:text-white">{t('nav.about')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Risk Disclosure</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>contact@ventureflow.com</li>
                <li>Hong Kong, China</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
}
