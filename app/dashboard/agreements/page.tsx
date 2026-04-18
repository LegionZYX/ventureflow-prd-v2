'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { getPlatformAgreementBoard } from '@/lib/trading-v2';
import {
  advanceAgreementStatus,
  canAdvanceAgreement,
  getAgreementActionLabel,
} from '@/lib/trading-v2-workflow';

export default function AgreementsPage() {
  const [agreements, setAgreements] = useState(getPlatformAgreementBoard());

  const advanceAgreement = (id: string) => {
    setAgreements((current) =>
      current.map((agreement) =>
        agreement.id === id
          ? { ...agreement, status: advanceAgreementStatus(agreement).status }
          : agreement,
      ),
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Agreements</h1>
          <p className="mt-2 text-slate-500">
            业务规则已经统一：无论买方还是卖方，委托或费用相关协议都与平台签署；FA 推荐绑定不改变这一点。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard label="Total Agreements" value={String(agreements.length)} />
          <StatCard
            label="Buyer-side"
            value={String(agreements.filter((item) => item.side === 'BUYER').length)}
          />
          <StatCard
            label="Seller-side"
            value={String(agreements.filter((item) => item.side === 'SELLER').length)}
          />
          <StatCard
            label="Pending Signature"
            value={String(
              agreements.filter((item) => item.status === 'PENDING_SIGNATURE').length,
            )}
          />
          <StatCard
            label="Signed / Active"
            value={String(
              agreements.filter(
                (item) => item.status === 'SIGNED' || item.status === 'ACTIVE',
              ).length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Agreement Board</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Side</HeaderCell>
                  <HeaderCell>Principal</HeaderCell>
                  <HeaderCell>Principal Type</HeaderCell>
                  <HeaderCell>Contracting Party</HeaderCell>
                  <HeaderCell>Deal</HeaderCell>
                  <HeaderCell>Referral Link</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                  <HeaderCell>Action</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {agreements.map((agreement) => (
                  <tr key={agreement.id}>
                    <BodyCell>{agreement.agreementType}</BodyCell>
                    <BodyCell>{agreement.side}</BodyCell>
                    <BodyCell>{agreement.principalName}</BodyCell>
                    <BodyCell>{agreement.principalType}</BodyCell>
                    <BodyCell>{agreement.contractWith}</BodyCell>
                    <BodyCell>{agreement.deal?.companyName ?? '-'}</BodyCell>
                    <BodyCell>
                      {agreement.relatedRecommendationId ?? 'Direct platform relationship'}
                    </BodyCell>
                    <BodyCell>
                      <StatusPill>{agreement.status}</StatusPill>
                    </BodyCell>
                    <BodyCell>
                      <button
                        onClick={() => advanceAgreement(agreement.id)}
                        disabled={!canAdvanceAgreement(agreement.status)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {getAgreementActionLabel(agreement.status)}
                      </button>
                    </BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Contract Logic</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <RuleCard
              title="Buyer Side"
              body="注册买方或推荐 prospect 一旦进入正式流程，签约对象都是平台，而不是 FA 个人。"
            />
            <RuleCard
              title="Seller Side"
              body="卖方 / GP 的挂单和成交委托同样与平台签署，FA 只承担撮合与执行职责。"
            />
            <RuleCard
              title="FA Referral"
              body="FA 推荐绑定只决定来源归属和奖励计算，不改变买卖双方与平台签约的法律结构。"
            />
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

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}
