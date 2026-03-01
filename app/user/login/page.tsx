'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock login - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store user session
    localStorage.setItem('vf_user_session', JSON.stringify({
      id: 'user1',
      email,
      name: 'John Investor',
      type: 'investor',
    }));
    
    router.push('/user/dashboard');
  };

  return (
    <BuyerLayout>
      <div className="min-h-screen py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Investor Login</h1>
              <p className="text-slate-600">Access your portfolio and track your investments</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="investor@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-slate-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
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
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-center text-sm text-slate-600 mb-4">
                Don't have an investor account?
              </p>
              <Link
                href="/kyc"
                className="block w-full py-3 text-center bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
              >
                Complete KYC to Register
              </Link>
            </div>

            <div className="mt-4">
              <Link
                href="/login"
                className="block w-full py-3 text-center text-sm text-slate-500 hover:text-slate-700"
              >
                FA/Admin Login →
              </Link>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</p>
            <code className="text-xs text-blue-700">Any email / Any password</code>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
}
