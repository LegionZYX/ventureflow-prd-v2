'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import {
  askOrders,
  bidOrders,
  dealRecords,
  faTeams,
  getActiveListings,
  getAskRegistry,
  getBidRegistry,
  getDisclosureStageLabel,
  getFARecommendationQueue,
  getPlatformAgreementBoard,
  getPipelineCounts,
  getTradeModeLabel,
  listingRecords,
  orderMatches,
} from '@/lib/trading-v2';

const commandCards = [
  {
    title: 'Active Bids',
    value: bidOrders.length,
    subtitle: 'Buyer-side demand already entered',
    tone: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'Active Asks',
    value: askOrders.length,
    subtitle: 'Seller supply under FA control',
    tone: 'from-emerald-600 to-teal-500',
  },
  {
    title: 'Live Listings',
    value: getActiveListings().length,
    subtitle: 'Anonymous or controlled disclosure board',
    tone: 'from-violet-600 to-fuchsia-500',
  },
  {
    title: 'Open Deals',
    value: dealRecords.length,
    subtitle: 'Execution chain now being pushed forward',
    tone: 'from-amber-500 to-orange-500',
  },
];

const chainSteps = [
  {
    label: '1. Intake',
    description: 'Buyer bid / seller ask entered with trade mode and asset scope.',
    href: '/sell',
  },
  {
    label: '2. Registry Review',
    description: 'KYC, ownership, privacy level and listing readiness are checked.',
    href: '/dashboard/intent-registry',
  },
  {
    label: '3. Matching',
    description: 'FA team pushes NDA, disclosure stage and negotiation prep.',
    href: '/dashboard/intent-registry',
  },
  {
    label: '4. Deal Execution',
    description: 'LOI, due diligence, SPA, escrow and settlement are tracked together.',
    href: '/dashboard/deals',
  },
];

export default function DashboardHomePage() {
  const bidRegistry = getBidRegistry();
  const askRegistry = getAskRegistry();
  const pipelineCounts = getPipelineCounts().filter((item) => item.count > 0);
  const recommendationQueue = getFARecommendationQueue();
  const platformAgreements = getPlatformAgreementBoard();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">PRD V2 Command Center</p>
              <h1 className="text-3xl font-semibold sm:text-4xl">Bid / Ask / Match / Deal 的最小闭环已经落到后台主视图</h1>
              <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
                这里不再按旧版 FA Demo 的“客户列表 + 机会列表”理解系统，而是按 PRD V2 的真实业务链条组织工作：
                先录入订单，再做准入与披露控制，然后撮合，再推进交易执行。
              </p>
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
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Execution Chain</h2>
                <p className="text-sm text-slate-500">把 PRD V2 的流程拆成当前版本能执行的 4 个工作面。</p>
              </div>
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
            <p className="mt-1 text-sm text-slate-500">当前系统里真正进入交易执行的阶段分布。</p>

            <div className="mt-5 space-y-3">
              {pipelineCounts.map((item) => (
                <div key={item.stage} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-800">{item.stage}</span>
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
                <p className="text-sm text-slate-500">用同一张视图看买方 bid 和卖方 ask 的准入与成交准备度。</p>
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
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Bid</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {getTradeModeLabel(bid.tradeMode)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        {bid.companyName} · {bid.shareClass}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {bid.buyer?.displayName} · {bid.quantityLabel} · {bid.bidPriceLabel}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">
                      <p>Status: <span className="font-medium text-slate-900">{bid.status}</span></p>
                      <p>Valid until: {bid.validUntil}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {bid.conditions.map((condition) => (
                      <span key={condition} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {askRegistry.slice(0, 2).map((ask) => (
                <div key={ask.id} className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Ask</span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {getTradeModeLabel(ask.tradeMode)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">
                        {ask.companyName} · {ask.shareClass}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {ask.sellerAlias} · {ask.quantityLabel} · {ask.askPriceLabel}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500">
                      <p>Status: <span className="font-medium text-slate-900">{ask.status}</span></p>
                      <p>Ownership: {ask.ownershipStatus}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{ask.transferRestrictions}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Team & Match Ops</h2>
            <p className="mt-1 text-sm text-slate-500">撮合和执行责任已经开始按 FA team 归属。</p>

            <div className="mt-5 space-y-4">
              {orderMatches.map((match) => (
                <div key={match.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{match.companyName}</p>
                      <p className="text-xs text-slate-500">{getTradeModeLabel(match.tradeMode)}</p>
                    </div>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                      {match.matchScore}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{match.status}</p>
                </div>
              ))}

              {faTeams.map((team) => (
                <div key={team.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{team.name}</p>
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {team.status}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {team.members.map((member) => (
                      <div key={member.faId} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{member.name} · {member.role}</span>
                        <span className="font-medium text-slate-900">{Math.round(member.commissionRatio * 100)}%</span>
                      </div>
                    ))}
                  </div>
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
                <p className="text-sm text-slate-500">先推荐未注册买家，再绑定归属，最后进入成交奖励链。</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {recommendationQueue.length} tracked leads
              </span>
            </div>

            <div className="space-y-4">
              {recommendationQueue.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {lead.prospectName} · {lead.targetCompany}
                      </p>
                      <p className="text-xs text-slate-500">
                        Recommended by {lead.faName} · {getTradeModeLabel(lead.tradeMode)}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {lead.status}
                    </span>
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
                <p className="text-sm text-slate-500">无论来源关系如何，买卖双方正式协议都统一与平台签署。</p>
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
                        {agreement.principalName} · {agreement.agreementType}
                      </p>
                      <p className="text-xs text-slate-500">
                        {agreement.side} side · {agreement.principalType} · contract with {agreement.contractWith}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {agreement.status}
                    </span>
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
              <p className="text-sm text-slate-500">卖家隐私 guard 现在通过 listing 级别直接可见。</p>
            </div>
            <div className="text-sm text-slate-500">{listingRecords.length} total listings</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {listingRecords.map((listing) => (
              <div key={listing.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {listing.companyName}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {getTradeModeLabel(listing.tradeMode)}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-slate-900">{listing.shareClass}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {listing.quantityRangeLabel} · {listing.priceRangeLabel}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                    {getDisclosureStageLabel(listing.disclosureStage)}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                    {listing.activeBidCount} bids
                  </span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-700">
                    {listing.activeMatchCount} matches
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
