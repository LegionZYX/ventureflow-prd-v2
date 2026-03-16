'use client';

import React, { useState } from 'react';
import { useLang } from '@/contexts/LangContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserLoginPage() {
  const { t } = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation with Lang Switcher */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-slate-900">VentureFlow</span>
            </Link>
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
              {t('userLogin.faLoginLink')}
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('userLogin.title')}</h1>
              <p className="text-slate-600">{t('userLogin.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('userLogin.emailLabel')}
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="investor@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('userLogin.passwordLabel')}
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isLoading ? t('userLogin.signingIn') : t('userLogin.signIn')}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <Link
                href="/kyc"
                className="block w-full py-3 text-center bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                {t('userLogin.kycLink')}
              </Link>
            </div>

            <div className="mt-4">
              <Link
                href="/login"
                className="block w-full py-3 text-center text-sm text-slate-500 hover:text-slate-700"
              >
                {t('userLogin.faLoginLink')}
              </Link>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo:</p>
            <code className="text-xs text-blue-700">{t('userLogin.demoNote')}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
