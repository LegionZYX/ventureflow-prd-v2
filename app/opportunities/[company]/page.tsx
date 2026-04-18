'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import BuyerLayout from '@/components/BuyerLayout';
import {
  dealRecords,
  getDisclosureStageLabel,
  getMarketplaceCompanies,
  getTradeModeLabel,
  getVerificationBadgeColor,
} from '@/lib/trading-v2';

export default function CompanyDetailPage() {
  const params = useParams();
  const companySlug = String(params.company ?? '').toLowerCase();
  const market = getMarketplaceCompanies().find(
    (entry) => entry.companyName.toLowerCase() === companySlug,
  );

  if (!market) {
    return (
      <BuyerLayout>
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Company market not found</h1>
          <Link href="/opportunities" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            Back to marketplace
          </Link>
        </div>
      </BuyerLayout>
    );
  }

  const relatedDeals = dealRecords.filter((deal) => deal.companyName === market.companyName);

  return (
    <BuyerLayout>
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/opportunities" className="text-sm text-blue-200 hover:text-white">
            ← Back to marketplace
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-white">{market.companyName}</h1>
          <p className="mt-3 max-w-3xl text-blue-100">
            这里展示的是按 PRD V2 组织的公司交易市场：公开 listing 保持匿名，进入 NDA、
            谈判、法务和托管阶段后才逐步披露必要信息。
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-900">Active Listings</h2>
                <div className="mt-6 space-y-4">
                  {market.listings.map((listing) => (
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

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-slate-500">Share Class</p>
                          <p className="font-semibold text-slate-900">{listing.shareClass}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Seller Alias</p>
                          <p className="font-semibold text-slate-900">{listing.sellerAlias}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Indicative Price</p>
                          <p className="font-semibold text-slate-900">{listing.priceRangeLabel}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Quantity</p>
                          <p className="font-semibold text-slate-900">{listing.quantityRangeLabel}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                        <span>Open bids {listing.activeBidCount}</span>
                        <span>Match queue {listing.activeMatchCount}</span>
                        <span>Public seller identity blocked</span>
                      </div>

                      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                        To convert this listing into a deal, the buyer must pass KYC and accredited investor checks,
                        then sign NDA before entering negotiation.
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-2xl font-bold text-slate-900">Deals In Progress</h2>
                <div className="mt-6 space-y-4">
                  {relatedDeals.map((deal) => (
                    <div key={deal.id} className="rounded-2xl border border-slate-200 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {getTradeModeLabel(deal.tradeMode)} · {deal.shareClass}
                          </p>
                          <p className="text-sm text-slate-500">{deal.amountLabel}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                          {deal.currentStage}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Disclosure Stage</p>
                          <p className="font-semibold text-slate-900">
                            {getDisclosureStageLabel(deal.disclosureStage)}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Lead FA Team</p>
                          <p className="font-semibold text-slate-900">{deal.leadFaTeamId}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">LOI</p>
                          <p className="font-semibold text-slate-900">{deal.loiSigned ? 'Signed' : 'Pending'}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Escrow Readiness</p>
                          <p className="font-semibold text-slate-900">{deal.escrowReady ? 'Ready' : 'Blocked'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">Execution Guard</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li>1. Buyer KYC and accredited investor status must be valid.</li>
                  <li>2. Seller ownership and transferability must be verified.</li>
                  <li>3. FA assignment and commission agreement must exist.</li>
                  <li>4. Price snapshot must be locked before SPA.</li>
                  <li>5. Escrow confirmation is required before transfer.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-xl font-bold text-slate-900">Next Step</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Buyers should submit a formal bid from the public intent entry page. Sellers or GP entities should
                  submit an ask with ownership proof and transfer restrictions.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/sell"
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Submit Bid / Ask
                  </Link>
                  <Link
                    href="/dashboard/deals"
                    className="rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View Deal Pipeline
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
