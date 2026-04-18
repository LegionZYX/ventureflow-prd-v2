'use client';

import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  getActiveListings,
  getAskRegistry,
  getBidRegistry,
  getDealStageLabel,
  getDisclosureStageLabel,
  getFARecommendationQueue,
  getPipelineCounts,
  getPlatformAgreementBoard,
  getTradeModeLabel,
} from '@/lib/trading-v2';

const chainSteps = [
  {
    label: '1. Intake',
    description: 'Buyer bid or seller ask enters with trade mode and company scope.',
    href: '/sell',
  },
  {
    label: '2. Registry Review',
    description: 'KYC, ownership, privacy level, and listing readiness are checked.',
    href: '/dashboard/intent-registry',
  },
  {
    label: '3. Matching',
    description: 'FA team pushes NDA, recommendation binding, and negotiation prep.',
    href: '/dashboard/orders',
  },
  {
    label: '4. Deal Execution',
    description: 'LOI, diligence, SPA, escrow, transfer approval, and settlement are tracked.',
    href: '/dashboard/deals',
  },
];

export default function DashboardHomePage() {
  const { error, loading, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading command center...
        </div>
      </DashboardLayout>
    );
  }

  const bidRegistry = getBidRegistry(workspace);
  const askRegistry = getAskRegistry(workspace);
  const pipelineCounts = getPipelineCounts(workspace).filter((item) => item.count > 0);
  const recommendationQueue = getFARecommendationQueue(workspace);
  const platformAgreements = getPlatformAgreementBoard(workspace);

  const commandCards = [
    {
      title: 'Active Bids',
      value: bidRegistry.length,
      subtitle: 'Buyer-side demand already entered',
      tone: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'Active Asks',
      value: askRegistry.length,
      subtitle: 'Seller supply under FA control',
      tone: 'from-emerald-600 to-teal-500',
    },
    {
      title: 'Live Listings',
      value: getActiveListings(workspace).length,
      subtitle: 'Anonymous or controlled disclosure board',
      tone: 'from-violet-600 to-fuchsia-500',
    },
    {
      title: 'Open Deals',
      value: workspace.dealRecords.length,
      subtitle: 'Execution chain now being pushed forward',
      tone: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">PRD V2 Command Center</p>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Bid, ask, match, deal, approval, and escrow now live in one persisted workspace
              </h1>
              <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                This dashboard is no longer a demo shell. It now reflects a file-backed workspace that carries FA attribution, platform agreements, order-book activity, and execution state across pages.
              </p>
              {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/dashboard/intent-registry"
                className="rounded-2xl bg-white px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Open Registry Board
              </Link>
              <Link
                href="/dashboard/deals"
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Open Deal Pipeline
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {commandCards.map((card) => (
            <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-r px-3 py-2 text-xs font-semibold text-white ${card.tone}`}>
                {card.title}
              </div>
              <div className="text-3xl font-semibold text-slate-900">{card.value}</div>
              <p className="mt-2 text-sm text-slate-500">{card.subtitle}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">Execution Chain</h2>
              <p className="text-sm text-slate-500">The PRD V2 workflow is grouped into four operating boards.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {chainSteps.map((step) => (
                <Link
                  key={step.label}
                  href={step.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                  <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Deal Stage Load</h2>
            <div className="mt-5 space-y-3">
              {pipelineCounts.map((item) => (
                <div key={item.stage} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-800">
                      {getDealStageLabel(item.stage)}
                    </span>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Registry Focus Queue</h2>
                <p className="text-sm text-slate-500">The same registry now exposes bids and asks with platform guards.</p>
              </div>
              <Link href="/dashboard/intent-registry" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View full board
              </Link>
            </div>

            <div className="space-y-4">
              {bidRegistry.slice(0, 2).map((bid) => (
                <div key={bid.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="blue">Bid</Badge>
                        <Badge>{getTradeModeLabel(bid.tradeMode)}</Badge>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        {bid.companyName} / {bid.shareClass}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {bid.buyer?.displayName} / {bid.quantityLabel} / {bid.bidPriceLabel}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">
                      <p>Status: <span className="font-medium text-slate-900">{bid.status}</span></p>
                      <p>Valid until: {bid.validUntil}</p>
                    </div>
                  </div>
                </div>
              ))}

              {askRegistry.slice(0, 2).map((ask) => (
                <div key={ask.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="emerald">Ask</Badge>
                        <Badge>{getTradeModeLabel(ask.tradeMode)}</Badge>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        {ask.companyName} / {ask.shareClass}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {ask.sellerAlias} / {ask.quantityLabel} / {ask.askPriceLabel}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">
                      <p>Status: <span className="font-medium text-slate-900">{ask.status}</span></p>
                      <p>Ownership: {ask.ownershipStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Tasks & Signals</h2>
            <div className="mt-5 space-y-4">
              {workspace.dashboardTasks.map((task) => (
                <div key={task.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500">
                        {task.companyName} / {task.owner} / {task.relatedEntity}
                      </p>
                    </div>
                    <Badge>{task.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Due: {task.dueLabel}</p>
                </div>
              ))}

              {workspace.marketSignals.map((signal) => (
                <div key={signal.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{signal.companyName}</p>
                      <p className="text-xs text-slate-500">{signal.referencePriceLabel}</p>
                    </div>
                    <Badge>{signal.momentum}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{signal.lastTradeLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">FA Recommendation Service</h2>
                <p className="text-sm text-slate-500">Prospect attribution now survives page changes and action updates.</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {recommendationQueue.length} tracked leads
              </span>
            </div>

            <div className="space-y-4">
              {recommendationQueue.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {lead.prospectName} / {lead.targetCompany}
                      </p>
                      <p className="text-xs text-slate-500">
                        Recommended by {lead.faName} / {getTradeModeLabel(lead.tradeMode)}
                      </p>
                    </div>
                    <Badge>{lead.status}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Reward eligibility: {lead.rewardEligible ? 'locked once deal settles' : 'not yet eligible'}.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Platform Contracting Rule</h2>
                <p className="text-sm text-slate-500">FA attribution does not change the legal contracting party.</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {platformAgreements.length} agreements
              </span>
            </div>

            <div className="space-y-4">
              {platformAgreements.map((agreement) => (
                <div key={agreement.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {agreement.principalName} / {agreement.agreementType}
                      </p>
                      <p className="text-xs text-slate-500">
                        {agreement.side} side / {agreement.principalType} / contract with {agreement.contractWith}
                      </p>
                    </div>
                    <Badge>{agreement.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Listing Disclosure Board</h2>
              <p className="text-sm text-slate-500">Seller privacy guard and disclosure stages are now visible at listing level.</p>
            </div>
            <div className="text-sm text-slate-500">{workspace.listingRecords.length} total listings</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workspace.listingRecords.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="dark">{listing.companyName}</Badge>
                  <Badge>{getTradeModeLabel(listing.tradeMode)}</Badge>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-900">{listing.shareClass}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {listing.quantityRangeLabel} / {listing.priceRangeLabel}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone="blue">{getDisclosureStageLabel(listing.disclosureStage)}</Badge>
                  <Badge tone="emerald">{listing.activeBidCount} bids</Badge>
                  <Badge tone="purple">{listing.activeMatchCount} matches</Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

function Badge({
  children,
  tone = 'slate',
}: {
  children: React.ReactNode;
  tone?: 'blue' | 'dark' | 'emerald' | 'purple' | 'slate';
}) {
  const toneMap = {
    blue: 'bg-blue-100 text-blue-700',
    dark: 'bg-slate-900 text-white',
    emerald: 'bg-emerald-100 text-emerald-700',
    purple: 'bg-purple-100 text-purple-700',
    slate: 'bg-slate-100 text-slate-700',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${toneMap[tone]}`}>{children}</span>
  );
}
