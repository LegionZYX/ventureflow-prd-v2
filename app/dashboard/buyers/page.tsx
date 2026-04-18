'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  getBidRegistry,
  getFARecommendationQueue,
  participants,
  getTradeModeLabel,
} from '@/lib/trading-v2';
import {
  advanceRecommendationStatus,
  canAdvanceRecommendation,
  getRecommendationActionLabel,
} from '@/lib/trading-v2-workflow';

export default function BuyersPage() {
  const registeredBuyers = participants.filter((participant) => participant.role === 'BUYER');
  const bidRegistry = getBidRegistry();
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
          <h1 className="text-3xl font-bold text-slate-900">Buyer Coverage</h1>
          <p className="mt-2 text-slate-500">
            同时管理两类对象：已经进入平台的注册买方，以及由 FA 推荐、尚未注册但已绑定来源关系的 prospect。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Registered Buyers" value={String(registeredBuyers.length)} />
          <StatCard label="Active Bids" value={String(bidRegistry.length)} />
          <StatCard label="FA Recommendation Leads" value={String(recommendationQueue.length)} />
          <StatCard
            label="Bound Prospects"
            value={String(
              recommendationQueue.filter(
                (item) => item.status === 'BOUND_TO_FA' || item.status === 'DEAL_LINKED',
              ).length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">Registered Buyer Base</h2>
            <p className="mt-1 text-sm text-slate-500">
              这些买方已经进入平台账户体系，可以直接提交 bid，并继续签 buyer mandate / platform fee agreement。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>Buyer</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Region</HeaderCell>
                  <HeaderCell>KYC</HeaderCell>
                  <HeaderCell>AUM</HeaderCell>
                  <HeaderCell>Qualified</HeaderCell>
                  <HeaderCell>Bid Coverage</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registeredBuyers.map((buyer) => {
                  const bids = bidRegistry.filter((bid) => bid.buyerId === buyer.id);

                  return (
                    <tr key={buyer.id}>
                      <BodyCell>{buyer.displayName}</BodyCell>
                      <BodyCell>{buyer.entityType}</BodyCell>
                      <BodyCell>{buyer.region}</BodyCell>
                      <BodyCell>{buyer.kycStatus}</BodyCell>
                      <BodyCell>{buyer.aumLabel ?? '-'}</BodyCell>
                      <BodyCell>{buyer.qualified ? 'Yes' : 'No'}</BodyCell>
                      <BodyCell>{bids.length > 0 ? `${bids.length} active bids` : 'No active bid yet'}</BodyCell>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">FA Recommendation Prospects</h2>
            <p className="mt-1 text-sm text-slate-500">
              业务规则：FA 先把合适资产推给未注册买家，买家接受后形成绑定；后续若成交，按推荐绑定记录发放奖励。
            </p>
          </div>

          <div className="space-y-4">
            {recommendationQueue.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill>{lead.status}</StatusPill>
                      <StatusPill>{getTradeModeLabel(lead.tradeMode)}</StatusPill>
                      <StatusPill>{lead.rewardEligible ? 'Reward Track On' : 'Reward Track Off'}</StatusPill>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {lead.prospectName} · {lead.prospectCompany}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Recommended by {lead.faName} · {lead.prospectEmail}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>Target: {lead.targetCompany}</p>
                    <p>Listing: {lead.listing?.shareClass ?? 'Pending mapping'}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                  <p>{lead.notes}</p>
                  <p className="mt-2">
                    Prospect source belongs to FA, but the eventual buyer-side agreement is still signed with the platform.
                  </p>
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

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">{children}</th>;
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 text-sm text-slate-700">{children}</td>;
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{children}</span>;
}
