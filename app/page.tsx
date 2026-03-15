'use client';

import React from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import PriceChart from '@/components/PriceChart';

const stats = [
  { label: 'stat.valuation', value: '$225B', change: '+4.2%', positive: true },
  { label: 'stat.volume', value: '$1.45B', change: '+12.5%', positive: true },
  { label: 'stat.discount', value: '-1.2%', change: 'vs Series F', positive: false },
  { label: 'stat.buyers', value: '1,240+', change: '+85 this month', positive: true },
];

const opportunities = [
  {
    id: 1,
    name: 'ByteDance Series H Common Stock',
    type: 'Common Stock',
    valuation: '$225B',
    price: '$165.5',
    volume: '$50M',
    discount: '-15.2%',
    status: 'Active',
    urgency: 'Large Block - Institutional',
  },
  {
    id: 2,
    name: 'ByteDance Employee Options',
    type: 'Employee Options',
    valuation: '$210B',
    price: '$142',
    volume: '$5M',
    discount: '-22.5%',
    status: 'Active',
    urgency: 'High Discount - Retail Friendly',
  },
];

const testimonials = [
  {
    quote: "At this stage of ByteDance's IPO countdown, secondary shares are the best path to alpha. The platform's transparency and compliance greatly reduced our due diligence costs.",
    author: 'Zhang Hua',
    role: 'Managing Partner, BlueChip Capital',
    verified: true,
  },
  {
    quote: "We successfully allocated $50M in ByteDance preferred shares through the platform. The entire process was professional, especially in handling complex VIE structure transfers.",
    author: 'Sarah Chen',
    role: 'Investment Director, Pacific Wealth Family Office',
    verified: true,
  },
  {
    quote: "I've been looking for direct exposure to top-tier tech companies. The shares here are legitimate and prices are more competitive than foreign investment banks.",
    author: 'Li Ming',
    role: 'Private Investor',
    verified: true,
  },
];

export default function HomePage() {
  const { t } = useLang();

  return (
    <BuyerLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-blue-200 text-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('hero.title1')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {t('hero.title2')}
              </span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kyc" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                {t('hero.startKYC')}
              </Link>
              <Link href="/opportunities" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
                {t('hero.browse')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm text-blue-200 mb-1">{t(stat.label)}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.positive ? 'text-green-400' : 'text-blue-300'}`}>
                    {stat.change}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('features.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🔒', title: 'features.kyc.title', description: 'features.kyc.desc' },
              { icon: '📊', title: 'features.equity.title', description: 'features.equity.desc' },
              { icon: '💼', title: 'features.deal.title', description: 'features.deal.desc' },
              { icon: '✅', title: 'features.compliance.title', description: 'features.compliance.desc' },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{t(feature.title)}</h3>
                <p className="text-slate-600 text-sm">{t(feature.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('opp.title')}</h2>
              <p className="text-slate-600">{t('opp.description')}</p>
            </div>
            <Link href="/opportunities" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              {t('opp.viewAll')} <span>→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunities.slice(0, 2).map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{opp.name}</h3>
                    <p className="text-sm text-slate-500">{opp.type}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    opp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {opp.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <PriceChart height={200} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Valuation</p>
                    <p className="font-semibold text-slate-900">{opp.valuation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Price/Share</p>
                    <p className="font-semibold text-blue-600">{opp.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Volume</p>
                    <p className="font-semibold text-slate-900">{opp.volume}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Discount</p>
                    <p className="font-semibold text-green-600">{opp.discount}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">{opp.urgency}</p>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Express Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('testimonials.title')}</h2>
            <p className="text-slate-600">
              {t('testimonials.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <p className="text-xs text-green-600 mt-3 flex items-center gap-1">
                    ✓ {t('testimonials.verified')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-blue-100 mb-8">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              {t('cta.browse')}
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
