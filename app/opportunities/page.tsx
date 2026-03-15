'use client';

import React, { useState, useEffect } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import { Company, mockCompanies, mockPublicDeals } from '@/lib/mockData';
import { loadCompanies, saveCompanies } from '@/lib/storage';
import { initializeDefaultData } from '@/lib/share';

export default function OpportunitiesPage() {
  const { t } = useLang();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    initializeDefaultData(mockCompanies, mockPublicDeals);
    const loaded = loadCompanies();
    if (loaded.length > 0) {
      setCompanies(loaded);
    } else {
      setCompanies(mockCompanies);
      saveCompanies(mockCompanies);
    }
  }, []);

  const filteredCompanies = filter === 'All'
    ? companies
    : companies.filter(c => c.industry === filter || c.tags.includes(filter));

  const industries = [
    { key: 'All', label: 'All' },
    { key: 'Technology', label: 'Technology' },
    { key: 'AI', label: 'AI' },
    { key: 'Space', label: 'Space' },
  ];

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('opp.page.title')}
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            {t('opp.page.description')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex flex-wrap gap-2">
              {industries.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setFilter(type.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === type.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <Link
              href="/sell"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              {t('opp.page.sellShares')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">{t('opp.page.totalCompanies')}</p>
              <p className="text-2xl font-bold text-slate-900">{companies.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">{t('opp.page.activeListings')}</p>
              <p className="text-2xl font-bold text-green-600">
                {companies.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">{t('opp.page.totalValuation')}</p>
              <p className="text-2xl font-bold text-slate-900">$235.5B</p>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                href={`/opportunities/${company.id}`}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{company.logo}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{company.name}</h3>
                      <p className="text-sm text-slate-500">{company.industry}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {company.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {company.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Valuation</p>
                    <p className="font-semibold text-slate-900">{company.valuation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Founded</p>
                    <p className="font-semibold text-slate-900">{company.foundedYear}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500">Headquarters</p>
                    <p className="font-semibold text-slate-900">{company.headquarters}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    {t('opp.page.learnMore')} →
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
