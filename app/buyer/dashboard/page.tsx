'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Deal {
  id: string;
  company: string;
  type: string;
  valuation: string;
  price: string;
  volume: string;
  discount: string;
  minInvestment: string;
  urgency: 'low' | 'medium' | 'high';
  matchScore: number;
}

interface BuyerProfile {
  email: string;
  name: string;
  capital: string;
  preferences: string[];
}

export default function BuyerDashboardPage() {
  const router = useRouter();
  const [buyer] = useState<BuyerProfile | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const session = localStorage.getItem('vf_buyer_session');
    return session ? (JSON.parse(session) as BuyerProfile) : null;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [capitalRange, setCapitalRange] = useState('all');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // Mock deals with match scores
  const allDeals: Deal[] = [
    {
      id: '1',
      company: 'ByteDance',
      type: 'Series H Common',
      valuation: '$225B',
      price: '$165.5',
      volume: '$50M',
      discount: '-15.2%',
      minInvestment: '$100K',
      urgency: 'medium',
      matchScore: 95,
    },
    {
      id: '2',
      company: 'ByteDance',
      type: 'Employee Options',
      valuation: '$210B',
      price: '$142',
      volume: '$5M',
      discount: '-22.5%',
      minInvestment: '$50K',
      urgency: 'high',
      matchScore: 88,
    },
    {
      id: '3',
      company: 'SpaceX',
      type: 'Series I',
      valuation: '$180B',
      price: '$125',
      volume: '$100M',
      discount: '-10%',
      minInvestment: '$500K',
      urgency: 'low',
      matchScore: 75,
    },
    {
      id: '4',
      company: 'Stripe',
      type: 'Preferred Stock',
      valuation: '$65B',
      price: '$85',
      volume: '$30M',
      discount: '-18%',
      minInvestment: '$200K',
      urgency: 'medium',
      matchScore: 82,
    },
  ];

  useEffect(() => {
    if (!buyer) {
      router.push('/buyer/login');
    }
  }, [buyer, router]);

  // 智能推荐算法
  const calculateMatchScore = (deal: Deal, capital: string): number => {
    let score = 50; // 基础分

    // 资金匹配度 (30 分)
    const capitalMap: Record<string, number> = {
      '100k': 100000,
      '500k': 500000,
      '1m': 1000000,
      '5m': 5000000,
    };
    const dealMinInvest = parseInt(deal.minInvestment.replace(/[^0-9]/g, '')) * 
      (deal.minInvestment.includes('M') ? 1000000 : 1000);
    
    const buyerCapital = capitalMap[capital] || 100000;
    if (buyerCapital >= dealMinInvest) {
      score += 30;
    } else if (buyerCapital >= dealMinInvest * 0.5) {
      score += 15;
    }

    // 紧急度匹配 (20 分)
    if (deal.urgency === 'high') score += 20;
    if (deal.urgency === 'medium') score += 10;

    // 公司热门度 (额外加分)
    if (deal.company === 'ByteDance') score += 10;

    return Math.min(score, 100);
  };

  // 更新所有交易的匹配分数
  const dealsWithScores = allDeals.map(deal => ({
    ...deal,
    matchScore: calculateMatchScore(deal, capitalRange),
  })).sort((a, b) => b.matchScore - a.matchScore);

  // 筛选交易
  const filteredDeals = dealsWithScores.filter(deal => {
    const matchSearch = deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       deal.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  // 估算成交价范围
  const estimatePriceRange = (deal: Deal): { min: string; max: string } => {
    const basePrice = parseFloat(deal.price.replace(/[^0-9.]/g, ''));
    const discount = parseFloat(deal.discount.replace(/[^0-9.]/g, '')) / 100;
    
    // 根据匹配分数调整价格
    const matchFactor = deal.matchScore / 100;
    const minPrice = basePrice * (1 - discount * 1.2) * (1 - matchFactor * 0.1);
    const maxPrice = basePrice * (1 - discount * 0.8) * (1 + matchFactor * 0.05);
    
    return {
      min: `$${minPrice.toFixed(2)}`,
      max: `$${maxPrice.toFixed(2)}`,
    };
  };

  if (!buyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/buyer/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-slate-900">VentureFlow <span className="text-sm font-normal text-slate-500">买家门户</span></span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">欢迎，{buyer.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('vf_buyer_session');
                  router.push('/buyer/login');
                }}
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
            <p className="text-sm text-blue-100">推荐机会</p>
            <p className="text-3xl font-bold mt-2">{dealsWithScores.filter(d => d.matchScore >= 80).length}</p>
            <p className="text-sm text-blue-200 mt-2">高匹配度项目</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
            <p className="text-sm text-green-100">总交易量</p>
            <p className="text-3xl font-bold mt-2">$1.45B</p>
            <p className="text-sm text-green-200 mt-2">月度成交</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <p className="text-sm text-purple-100">平均折扣</p>
            <p className="text-3xl font-bold mt-2">-15.2%</p>
            <p className="text-sm text-purple-200 mt-2">vs 最新估值</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">🔍 搜索与筛选</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">搜索公司</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ByteDance, SpaceX..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">资金规模</label>
              <select
                value={capitalRange}
                onChange={(e) => setCapitalRange(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部</option>
                <option value="100k">$100K - $500K</option>
                <option value="500k">$500K - $1M</option>
                <option value="1m">$1M - $5M</option>
                <option value="5m">$5M+</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-slate-600">
                <p>当前筛选：</p>
                <p className="font-medium text-blue-600">
                  {filteredDeals.length} 个匹配项目
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🤖</span>
            <h2 className="text-lg font-semibold">AI 智能推荐</h2>
          </div>
          <p className="text-purple-100 mb-4">
            根据您的资金规模和投资偏好，系统自动匹配以下高潜力项目
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dealsWithScores.slice(0, 3).map((deal) => (
              <button
                key={deal.id}
                onClick={() => setSelectedDeal(deal)}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{deal.company}</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    deal.matchScore >= 90 ? 'bg-green-500 text-white' :
                    deal.matchScore >= 80 ? 'bg-yellow-500 text-white' :
                    'bg-slate-500 text-white'
                  }`}>
                    {deal.matchScore}分
                  </span>
                </div>
                <p className="text-sm text-purple-100">{deal.type}</p>
                <p className="text-sm text-purple-200 mt-1">预估：{deal.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* All Deals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">📊 所有投资机会</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">公司</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">类型</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">估值</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">价格</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">交易量</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">折扣</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">匹配度</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{deal.company}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deal.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{deal.valuation}</td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-600">{deal.price}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{deal.volume}</td>
                    <td className="px-6 py-4 text-sm text-green-600">{deal.discount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        deal.matchScore >= 90 ? 'bg-green-100 text-green-700' :
                        deal.matchScore >= 80 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {deal.matchScore}分
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedDeal(deal)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        详情 →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">{selectedDeal.company}</h3>
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-slate-600 mt-1">{selectedDeal.type}</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-1">估值</p>
                  <p className="text-lg font-bold text-slate-900">{selectedDeal.valuation}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-1">每股价格</p>
                  <p className="text-lg font-bold text-blue-600">{selectedDeal.price}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-1">交易量</p>
                  <p className="text-lg font-bold text-slate-900">{selectedDeal.volume}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-1">折扣率</p>
                  <p className="text-lg font-bold text-green-600">{selectedDeal.discount}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">🎯 AI 匹配分析</p>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        selectedDeal.matchScore >= 90 ? 'bg-green-500' :
                        selectedDeal.matchScore >= 80 ? 'bg-yellow-500' :
                        'bg-slate-500'
                      }`}
                      style={{ width: `${selectedDeal.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-blue-900">{selectedDeal.matchScore}分</span>
                </div>
                <p className="text-sm text-blue-700">
                  根据您的资金规模和投资偏好，这是一个{
                    selectedDeal.matchScore >= 90 ? '极佳' :
                    selectedDeal.matchScore >= 80 ? '很好' :
                    '不错'
                  }的投资机会
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <p className="text-sm font-semibold text-green-900 mb-2">💰 预估成交价范围</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-700">最低</p>
                    <p className="text-2xl font-bold text-green-900">
                      {estimatePriceRange(selectedDeal).min}
                    </p>
                  </div>
                  <div className="text-green-600 text-2xl">→</div>
                  <div className="text-right">
                    <p className="text-xs text-green-700">最高</p>
                    <p className="text-2xl font-bold text-green-900">
                      {estimatePriceRange(selectedDeal).max}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-green-700 mt-2">
                  * 基于当前市场情况和匹配度计算，仅供参考
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setSelectedDeal(null)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                >
                  关闭
                </button>
                <button
                  onClick={() => {
                    alert('询价已提交！FA 团队将在 24 小时内联系您。');
                    setSelectedDeal(null);
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  提交询价
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
