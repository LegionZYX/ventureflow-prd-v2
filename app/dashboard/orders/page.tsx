'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  canAdvanceRecommendation,
  getRecommendationActionLabel,
} from '@/lib/trading-v2-workflow';
import { getFARecommendationQueue, getTradeModeLabel } from '@/lib/trading-v2';

export default function OrdersPage() {
  const { error, isPending, loading, runAction, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading order and introduction desk...
        </div>
      </DashboardLayout>
    );
  }

  const recommendationQueue = getFARecommendationQueue(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Order & Introduction Desk</h1>
          <p className="mt-2 text-slate-500">
            Listings, order-book signals, and FA introductions now share the same persisted workflow.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Listings In Board" value={String(workspace.listingRecords.length)} />
          <StatCard label="Match Queue" value={String(workspace.orderMatches.length)} />
          <StatCard
            label="Open Introductions"
            value={String(
              recommendationQueue.filter((item) =>
                ['PROSPECTED', 'INTRO_SENT'].includes(item.status),
              ).length,
            )}
          />
          <StatCard label="Order Book Entries" value={String(workspace.orderBookEntries.length)} />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">FA Introduction Queue</h2>
          <p className="mt-1 text-sm text-slate-500">
            Recommendation binding is preserved across pages, so buyer attribution and downstream rewards stay intact.
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
                      {lead.prospectName} to {lead.targetCompany}
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
                    body="Push teaser, confirm fit, and capture which listing started the introduction."
                  />
                  <TaskCard
                    title="Binding Point"
                    body="Once buyer agrees to move, lock the FA relationship and start KYC."
                  />
                  <TaskCard
                    title="After Registration"
                    body="Move into bid or direct execution while preserving reward eligibility."
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => runAction('advanceRecommendation', lead.id)}
                    disabled={!canAdvanceRecommendation(lead.status) || isPending}
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
            <h2 className="text-xl font-bold text-slate-900">Live Order Book</h2>
            <p className="mt-1 text-sm text-slate-500">
              This closes a Forge-style gap by showing company-level bids and asks instead of only page-level listings.
            </p>
            <div className="mt-5 space-y-3">
              {workspace.orderBookEntries.map((entry) => (
                <div key={entry.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {entry.companyName} / {entry.side}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getTradeModeLabel(entry.tradeMode)} / {entry.visibility}
                      </p>
                    </div>
                    <StatusPill>{entry.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {entry.priceLabel} / {entry.quantityLabel}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Market Signals</h2>
            <div className="mt-5 space-y-3">
              {workspace.marketSignals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{signal.companyName}</p>
                      <p className="text-sm text-slate-500">{signal.referencePriceLabel}</p>
                    </div>
                    <StatusPill>{signal.momentum}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{signal.lastTradeLabel}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    {signal.bidCount} bids / {signal.askCount} asks
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
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function TaskCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}
