'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

// Mock data - FA 只能看到自己关联的买家
const mockBuyers = [
  { id: 1, name: 'CITIC Hong Kong', email: 'citic@example.com', type: 'Institution', kyc: 'Approved', pof: 'Verified', email_detail: 'citic@example.com', date: '2026-02-15', aum: '$200M', interest: 'Large Blocks', faId: 'fa1' },
  { id: 2, name: 'Justin@Antalpha', email: 'justin@antalpha.com', type: 'Institution', kyc: 'Approved', pof: 'Verified', email_detail: 'justin@antalpha.com', date: '2026-02-18', aum: '$100M', interest: 'Growth Stage', faId: 'fa1' },
  { id: 3, name: 'Li Ming', email: 'liming@example.com', type: 'Individual', kyc: 'Approved', pof: 'Verified', email_detail: 'liming@example.com', date: '2026-02-25', aum: '$100M', interest: 'Pre-IPO', faId: 'fa2' },
  { id: 4, name: 'Ny', email: 'ny@example.com', type: 'Individual', kyc: 'Pending', pof: 'Pending', email_detail: 'ny@example.com', date: '2026-02-26', aum: '$150M', interest: 'Tech Sector', faId: 'fa1' },
  { id: 5, name: 'FCS Family Office', email: 'fcs@example.com', type: 'Family Office', kyc: 'Approved', pof: 'Verified', email_detail: 'fcs@example.com', date: '2026-02-20', aum: '$50M', interest: 'Family Office', faId: 'fa2' },
  { id: 6, name: 'K Broker', email: 'kbroker@example.com', type: 'Broker', kyc: 'Approved', pof: 'Verified', email_detail: 'kbroker@example.com', date: '2026-02-22', aum: '$700M', interest: 'All Deals', faId: 'fa1' },
];

// Mock deals from intent registry
const mockDeals = [
  { id: 1, company: 'ByteDance', type: 'Series H Common', valuation: '$225B', price: '$165.5', volume: '$50M', discount: '-15.2%', minInvestment: '$100K', urgency: 'medium', status: 'Available', faId: 'fa1' },
  { id: 2, company: 'ByteDance', type: 'Employee Options', valuation: '$210B', price: '$142', volume: '$5M', discount: '-22.5%', minInvestment: '$50K', urgency: 'high', status: 'Available', faId: 'fa2' },
  { id: 3, company: 'SpaceX', type: 'Series I', valuation: '$180B', price: '$125', volume: '$100M', discount: '-10%', minInvestment: '$500K', urgency: 'low', status: 'Available', faId: 'fa1' },
  { id: 4, company: 'Stripe', type: 'Preferred Stock', valuation: '$65B', price: '$85', volume: '$30M', discount: '-18%', minInvestment: '$200K', urgency: 'medium', status: 'Available', faId: 'fa2' },
];

export default function FAHubPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buyers' | 'deals'>('buyers');
  const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchResults, setMatchResults] = useState<any[]>([]);

  // 当前 FA 的 ID (模拟)
  const currentFaId = user?.email?.includes('admin') ? 'fa1' : 'fa2';

  // 过滤当前 FA 的买家和交易
  const myBuyers = mockBuyers.filter(b => b.faId === currentFaId);
  const myDeals = mockDeals.filter(d => d.faId === currentFaId);

  // 智能匹配算法
  const matchBuyersWithDeals = () => {
    const matches = myBuyers.map(buyer => {
      const capital = parseInt(buyer.aum.replace(/[^0-9]/g, '')) * 
        (buyer.aum.includes('B') ? 1000 : buyer.aum.includes('M') ? 1 : 0.001);
      
      const matchedDeals = myDeals.map(deal => {
        const minInvest = parseInt(deal.minInvestment.replace(/[^0-9]/g, '')) *
          (deal.minInvestment.includes('M') ? 1000000 : 1000);
        
        let score = 50;
        if (capital >= minInvest) score += 30;
        else if (capital >= minInvest * 0.5) score += 15;
        
        if (deal.urgency === 'high') score += 20;
        if (deal.urgency === 'medium') score += 10;
        if (deal.company === 'ByteDance') score += 10;
        
        return { deal, score };
      }).filter(m => m.score >= 70).sort((a, b) => b.score - a.score);

      return { buyer, matchedDeals };
    });

    setMatchResults(matches);
    setShowMatchModal(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">FA 工作中心</h1>
            <p className="text-slate-500 mt-1">FA Hub - Manage your buyers and deals</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('buyers')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'buyers'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              我的买家 ({myBuyers.length})
            </button>
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'deals'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              我的交易 ({myDeals.length})
            </button>
            <button
              onClick={matchBuyersWithDeals}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
            >
              🤖 AI 匹配
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">我的买家</p>
            <p className="text-2xl font-bold text-blue-600">{myBuyers.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">我的交易</p>
            <p className="text-2xl font-bold text-green-600">{myDeals.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">KYC 待审核</p>
            <p className="text-2xl font-bold text-yellow-600">{myBuyers.filter(b => b.kyc === 'Pending').length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-500">高匹配度</p>
            <p className="text-2xl font-bold text-purple-600">
              {myBuyers.reduce((acc, b) => {
                const capital = parseInt(b.aum.replace(/[^0-9]/g, ''));
                const matched = myDeals.filter(d => {
                  const minInvest = parseInt(d.minInvestment.replace(/[^0-9]/g, ''));
                  return capital >= minInvest * 0.5;
                });
                return acc + matched.length;
              }, 0)}
            </p>
          </div>
        </div>

        {/* Buyers Table */}
        {activeTab === 'buyers' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-blue-50">
              <h2 className="text-lg font-bold text-slate-900">👤 我的买家</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">AUM</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">KYC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">POF</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {myBuyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{buyer.name}</p>
                          <p className="text-xs text-slate-500">{buyer.email_detail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          buyer.type === 'Institution' ? 'bg-blue-100 text-blue-700' :
                          buyer.type === 'Family Office' ? 'bg-purple-100 text-purple-700' :
                          buyer.type === 'Broker' ? 'bg-orange-100 text-orange-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {buyer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">{buyer.aum}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{buyer.interest}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          buyer.kyc === 'Approved' ? 'bg-green-100 text-green-700' :
                          buyer.kyc === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {buyer.kyc}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          buyer.pof === 'Verified' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {buyer.pof}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedBuyer(buyer)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                            📅 Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Deals Table */}
        {activeTab === 'deals' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-green-50">
              <h2 className="text-lg font-bold text-slate-900">💼 我的交易</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Valuation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Volume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Urgency</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {myDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{deal.company}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{deal.type}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">{deal.valuation}</td>
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{deal.price}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{deal.volume}</td>
                      <td className="px-6 py-4 text-sm text-green-600">{deal.discount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          deal.urgency === 'high' ? 'bg-red-100 text-red-700' :
                          deal.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {deal.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedDeal(deal)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            Match
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Buyer Detail Modal */}
        {selectedBuyer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">{selectedBuyer.name}</h3>
                <p className="text-slate-600">{selectedBuyer.email_detail}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">类型</p>
                    <p className="font-semibold">{selectedBuyer.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">AUM</p>
                    <p className="font-semibold">{selectedBuyer.aum}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">兴趣</p>
                    <p className="font-semibold">{selectedBuyer.interest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">注册日期</p>
                    <p className="font-semibold">{selectedBuyer.date}</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setSelectedBuyer(null)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    关闭
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    📅 安排会议
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deal Detail Modal */}
        {selectedDeal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">{selectedDeal.company}</h3>
                <p className="text-slate-600">{selectedDeal.type}</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">估值</p>
                    <p className="font-semibold">{selectedDeal.valuation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">价格</p>
                    <p className="font-semibold text-blue-600">{selectedDeal.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">交易量</p>
                    <p className="font-semibold">{selectedDeal.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">折扣</p>
                    <p className="font-semibold text-green-600">{selectedDeal.discount}</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setSelectedDeal(null)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    关闭
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    匹配买家
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Match Results Modal */}
        {showMatchModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">🤖 AI 智能匹配结果</h3>
                  <p className="text-slate-600">基于资金规模、投资偏好和紧急度自动匹配</p>
                </div>
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-6">
                {matchResults.map(({ buyer, matchedDeals }) => (
                  <div key={buyer.id} className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900">{buyer.name}</h4>
                        <p className="text-sm text-slate-500">{buyer.type} • {buyer.aum}</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {matchedDeals.length} 个匹配
                      </span>
                    </div>
                    <div className="space-y-2">
                      {matchedDeals.map((item: any) => {
                        const { deal, score } = item;
                        return (
                        <div key={deal.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                          <div>
                            <p className="font-medium text-slate-900">{deal.company} - {deal.type}</p>
                            <p className="text-sm text-slate-500">{deal.volume} • {deal.price}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-slate-200 rounded-full h-3">
                              <div
                                className={`h-3 rounded-full ${
                                  score >= 90 ? 'bg-green-500' :
                                  score >= 80 ? 'bg-yellow-500' :
                                  'bg-slate-500'
                                }`}
                                style={{ width: `${score}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-slate-900 w-12 text-right">{score}分</span>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-slate-200">
                <button
                  onClick={() => setShowMatchModal(false)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
