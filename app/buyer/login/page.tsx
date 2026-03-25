'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/contexts/LangContext';

export default function BuyerLoginPage() {
  const { t } = useLang();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 存储买家会话
    localStorage.setItem('vf_buyer_session', JSON.stringify({
      id: 'buyer1',
      email,
      name: email.split('@')[0],
      type: 'buyer',
    }));
    
    router.push('/buyer/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <span className="text-3xl">💼</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">买家登录</h1>
            <p className="text-slate-600">Buyer Portal - Access investment opportunities</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="buyer@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
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
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-center text-sm text-slate-500 mb-4">
              还没有买家账号？
            </p>
            <button
              onClick={() => router.push('/kyc')}
              className="w-full py-3 text-center bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
            >
              完成 KYC 注册
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3 text-center text-sm text-slate-500 hover:text-slate-700"
            >
              FA/管理员登录 →
            </button>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-2">演示账号：</p>
            <code className="text-xs text-blue-700">任意邮箱 / 任意密码</code>
          </div>
        </div>
      </div>
    </div>
  );
}
