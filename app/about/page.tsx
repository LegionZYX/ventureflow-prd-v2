'use client';

import React from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

const stats = [
  { label: '累计交易额', value: '$2.4B+', sublabel: '自 2021 年起专注二级市场交易', change: '+15%' },
  { label: '活跃机构投资者', value: '850+', sublabel: '包含顶尖基金与家族办公室', change: '+12%' },
  { label: '字节跳动专项规模', value: '$850M', sublabel: '目前平台上挂单的总估值规模', change: '+8%' },
  { label: '平均结案周期', value: '45 天', sublabel: '高效的合规审查与交易撮合流程', change: '-10%' },
];

const values = [
  {
    icon: '⚖️',
    title: '极致合规',
    description: '严格遵循全球金融监管要求，确保每一笔字节跳动股份转让均获得官方或合法合规路径确认。',
  },
  {
    icon: '📊',
    title: '专业深度',
    description: '团队核心成员来自高盛、摩根士丹利及头部 VC，深谙高成长科技企业的股权估值逻辑。',
  },
  {
    icon: '🌏',
    title: '全球网络',
    description: '连接硅谷、伦敦、新加坡及大中华区的流动性资源，为买卖双方提供全球化的退出渠道。',
  },
];

export default function AboutPage() {
  const { t } = useLang();
  void stats;
  void t;

  return (
    <BuyerLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            连接未来价值
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            我们是全球领先的私有股权二级市场交易平台，专注为字节跳动及顶级独角兽提供高效的流动性解决方案。
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">专注、透明、高效</h2>
              <p className="text-lg text-slate-600 mb-6">
                在 2026 年，私有股权二级市场已成为全球金融体系的重要支柱。我们深耕字节跳动股权领域多年，
                致力于解决一级市场信息不对称、流动性不足的痛点。
              </p>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>深度覆盖字节跳动历次融资轮次与员工持股计划</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>标准化、数字化的交易闭环流程</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>严苛的买方 KYC 与合规准入体系</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Partnership</h3>
              <p className="text-blue-100 mb-8">平台影响力 - 以真实成交数据支撑的专业估值参考</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-400">+15%</p>
                  <p className="text-sm text-blue-100 mt-1">累计交易额</p>
                  <p className="text-lg font-semibold mt-2">$2.4B+</p>
                  <p className="text-xs text-blue-200">自 2021 年起专注二级市场交易</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-400">+12%</p>
                  <p className="text-sm text-blue-100 mt-1">活跃机构投资者</p>
                  <p className="text-lg font-semibold mt-2">850+</p>
                  <p className="text-xs text-blue-200">包含顶尖基金与家族办公室</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-400">+8%</p>
                  <p className="text-sm text-blue-100 mt-1">字节跳动专项规模</p>
                  <p className="text-lg font-semibold mt-2">$850M</p>
                  <p className="text-xs text-blue-200">目前平台上挂单的总估值规模</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-3xl font-bold text-green-400">-10%</p>
                  <p className="text-sm text-blue-100 mt-1">平均结案周期</p>
                  <p className="text-lg font-semibold mt-2">45 天</p>
                  <p className="text-xs text-blue-200">高效的合规审查与交易撮合流程</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">我们的核心价值</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              我们不仅是撮合者，更是长期主义的股权合作伙伴，为字节跳动的老股持有者提供专业的资产管理视角。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <span className="text-5xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">VentureFlow 公司信息</h2>
            <p className="text-slate-600">
              总部位于新加坡金融中心，为全球投资者提供专业的字节跳动股权交易服务
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">公司总部</h3>
              <p className="text-slate-600 mb-2">Marina Bay Sands, Tower 3, Level 55</p>
              <p className="text-slate-500 text-sm">10 Bayfront Avenue, Singapore 018956</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">监管许可</h3>
              <p className="text-slate-600 mb-2">新加坡金融管理局 (MAS) 监管</p>
              <p className="text-blue-600 font-mono text-sm">许可证号：VF-2024-SG-001</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">团队规模</h3>
              <p className="text-slate-600 mb-2">50+ 专业金融人才</p>
              <p className="text-slate-500 text-sm">来自高盛、摩根士丹利等顶级机构</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开启您的股权交易之旅
          </h2>
          <p className="text-blue-100 mb-8">
            无论您是希望出售持股还是寻找投资机会，我们的专业团队都能为您提供定制化解决方案。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              联系交易专家
            </Link>
            <Link href="/opportunities" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              浏览投资机会
            </Link>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
