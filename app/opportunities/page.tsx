'use client';

import Link from 'next/link';
import BuyerLayout from '@/components/BuyerLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  getActiveListings,
  getDisclosureStageLabel,
  getMarketplaceCompanies,
  getTradeModeLabel,
  getVerificationBadgeColor,
} from '@/lib/trading-v2';

export default function OpportunitiesPage() {
  const { error, loading, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <BuyerLayout>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Loading marketplace listings...
            </div>
          </div>
        </section>
      </BuyerLayout>
    );
  }

  const companies = getMarketplaceCompanies(workspace);
  const listings = getActiveListings(workspace);

  return (
    <BuyerLayout>
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm text-blue-100">
              PRD V2 Marketplace
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Marketplace built on live L1 / L2 / Direct workflow data
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-blue-100">
              This page now reads from the persisted workspace. New asks, active listings, and market signals
              can flow here as the execution chain advances.
            </p>
            {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <MetricCard label="Active Listings" value={String(listings.length)} />
            <MetricCard label="Companies" value={String(companies.length)} />
            <MetricCard
              label="Open Bid Signals"
              value={String(listings.reduce((sum, listing) => sum + listing.activeBidCount, 0))}
              tone="blue"
            />
            <MetricCard label="Privacy Guard" value="Seller Alias Only" compact />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {companies.map((company) => (
              <div key={company.companyName} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{company.companyName}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {company.listings.length} listings / {company.activeDeals} active deals
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
                        <ListingField label="Share Class" value={listing.shareClass} />
                        <ListingField label="Seller Alias" value={listing.sellerAlias} />
                        <ListingField label="Price Range" value={listing.priceRangeLabel} />
                        <ListingField label="Quantity Range" value={listing.quantityRangeLabel} />
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

function MetricCard({
  compact = false,
  label,
  tone = 'slate',
  value,
}: {
  compact?: boolean;
  label: string;
  tone?: 'blue' | 'slate';
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 font-bold ${compact ? 'text-lg' : 'text-3xl'} ${tone === 'blue' ? 'text-blue-600' : 'text-slate-900'}`}>
        {value}
      </p>
    </div>
  );
}

function ListingField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}
