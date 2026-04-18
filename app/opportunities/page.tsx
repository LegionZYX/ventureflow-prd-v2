'use client';

import Link from 'next/link';
import BuyerLayout from '@/components/BuyerLayout';
import {
  getActiveListings,
  getDisclosureStageLabel,
  getMarketplaceCompanies,
  getTradeModeLabel,
  getVerificationBadgeColor,
} from '@/lib/trading-v2';

export default function OpportunitiesPage() {
  const companies = getMarketplaceCompanies();
  const listings = getActiveListings();

  return (
    <BuyerLayout>
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm text-blue-100">
              PRD V2 Marketplace
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              用 `L1 / L2 / Direct` 三种交易方式来组织 Pre-IPO 交易机会
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-blue-100">
              当前阶段只展示符合 PRD V2 的标准化 listing：交易方式、股份类别、价格区间、
              数量区间、卖方隐私级别、验证状态，以及 market signal。
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Active Listings</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{listings.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Companies</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{companies.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Open Bid Signals</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">
                {listings.reduce((sum, listing) => sum + listing.activeBidCount, 0)}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Privacy Guard</p>
              <p className="mt-2 text-lg font-bold text-slate-900">Seller Alias Only</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {companies.map((company) => (
              <div key={company.companyName} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{company.companyName}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {company.listings.length} listings · {company.activeDeals} active deals
                    </p>
                  </div>
                  <Link
                    href={`/opportunities/${company.companyName.toLowerCase()}`}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    View Market
                  </Link>
                </div>

                <div className="mt-6 space-y-4">
                  {company.listings.map((listing) => (
                    <div key={listing.id} className="rounded-2xl border border-slate-200 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                          {getTradeModeLabel(listing.tradeMode)}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getVerificationBadgeColor(
                            listing.sellerVerification,
                          )}`}
                        >
                          {listing.sellerVerification}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                          {getDisclosureStageLabel(listing.disclosureStage)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Share Class</p>
                          <p className="font-semibold text-slate-900">{listing.shareClass}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Seller Alias</p>
                          <p className="font-semibold text-slate-900">{listing.sellerAlias}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Price Range</p>
                          <p className="font-semibold text-slate-900">{listing.priceRangeLabel}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Quantity Range</p>
                          <p className="font-semibold text-slate-900">{listing.quantityRangeLabel}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                        <span>Active bids: {listing.activeBidCount}</span>
                        <span>Match queue: {listing.activeMatchCount}</span>
                        <span>Public identity: blocked</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
