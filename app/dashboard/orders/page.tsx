'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  getFARecommendationQueue,
  getTradeModeLabel,
  listingRecords,
  orderMatches,
} from '@/lib/trading-v2';
import {
  advanceRecommendationStatus,
  canAdvanceRecommendation,
  getRecommendationActionLabel,
} from '@/lib/trading-v2-workflow';

export default function OrdersPage() {
  const [recommendationQueue, setRecommendationQueue] = useState(getFARecommendationQueue());

  const advanceLead = (id: string) => {
    setRecommendationQueue((current) =>
      current.map((lead) =>
        lead.id === id
          ? { ...lead, ...advanceRecommendationStatus(lead), listing: lead.listing }
          : lead,
      ),
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Order & Introduction Desk</h1>
          <p className="mt-2 text-slate-500">
            这里统一看三类任务：上架中的 listing、待处理的 match，以及由 FA 发起的未注册买家推荐。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Listings In Board" value={String(listingRecords.length)} />
          <StatCard label="Match Queue" value={String(orderMatches.length)} />
          <StatCard
            label="Unregistered Introductions"
            value={String(
              recommendationQueue.filter(
                (item) => item.status === 'PROSPECTED' || item.status === 'INTRO_SENT',
              ).length,
            )}
          />
          <StatCard
            label="Bound Recommendation Leads"
            value={String(
              recommendationQueue.filter(
                (item) => item.status === 'BOUND_TO_FA' || item.status === 'DEAL_LINKED',
              ).length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">FA Introduction Queue</h2>
          <p className="mt-1 text-sm text-slate-500">
            推荐动作发生在买家注册之前，但只要买家接受并开始 KYC，就要锁定 FA 归属关系，避免后续成交奖励丢失。
          </p>

          <div className="mt-5 space-y-4">
            {recommendationQueue.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <StatusPill>{lead.status}</StatusPill>
                      <StatusPill>{getTradeModeLabel(lead.tradeMode)}</StatusPill>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {lead.prospectName} → {lead.targetCompany}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      FA {lead.faName} recommended {lead.listing?.shareClass ?? 'mapped listing'}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>{lead.prospectCompany}</p>
                    <p>{lead.prospectEmail}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <TaskCard
                    title="Before Registration"
                    body="Push teaser, confirm fit, and track whether the buyer accepts FA introduction."
                  />
                  <TaskCard
                    title="Binding Point"
                    body="Once buyer agrees to move forward, create recommendation binding and start KYC."
                  />
                  <TaskCard
                    title="After Registration"
                    body="Move into bid or direct deal workflow while preserving FA reward eligibility."
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => advanceLead(lead.id)}
                    disabled={!canAdvanceRecommendation(lead.status)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    {getRecommendationActionLabel(lead.status)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Listing Intake Board</h2>
            <div className="mt-5 space-y-3">
              {listingRecords.map((listing) => (
                <div key={listing.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">
                    {listing.companyName} · {listing.shareClass}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {getTradeModeLabel(listing.tradeMode)} · {listing.priceRangeLabel} · {listing.quantityRangeLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Anonymous seller alias {listing.sellerAlias}; active bids {listing.activeBidCount}; active matches {listing.activeMatchCount}.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Match Processing Board</h2>
            <div className="mt-5 space-y-3">
              {orderMatches.map((match) => (
                <div key={match.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {match.companyName} · {getTradeModeLabel(match.tradeMode)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {match.bidOrderId} ↔ {match.askOrderId}
                      </p>
                    </div>
                    <StatusPill>{match.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Match score {match.matchScore}. Lead FA owner {match.leadFaId}.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{children}</span>;
}

function TaskCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}
