'use client';

import DashboardLayout from '@/components/DashboardLayout';
import {
  dealRecords,
  faTeams,
  getDisclosureStageLabel,
  getPipelineCounts,
  getTradeModeLabel,
} from '@/lib/trading-v2';

export default function DealsPage() {
  const pipeline = getPipelineCounts();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Deal Pipeline</h1>
          <p className="mt-2 text-slate-500">
            以 PRD V2 生命周期展示交易：listing → negotiation → LOI → diligence → SPA → escrow →
            transfer → settlement。
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {pipeline.map((item) => (
            <div key={item.stage} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">{item.stage}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.count}</p>
            </div>
          ))}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">PRD V2 Current Deals</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>Deal</HeaderCell>
                  <HeaderCell>Trade Mode</HeaderCell>
                  <HeaderCell>Amount</HeaderCell>
                  <HeaderCell>Current Stage</HeaderCell>
                  <HeaderCell>Disclosure</HeaderCell>
                  <HeaderCell>LOI</HeaderCell>
                  <HeaderCell>Data Room</HeaderCell>
                  <HeaderCell>Escrow</HeaderCell>
                  <HeaderCell>Settlement</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {dealRecords.map((deal) => (
                  <tr key={deal.id}>
                    <BodyCell>
                      <div>
                        <p className="font-semibold text-slate-900">{deal.companyName}</p>
                        <p className="text-xs text-slate-500">
                          {deal.bidOrderId} ↔ {deal.askOrderId}
                        </p>
                      </div>
                    </BodyCell>
                    <BodyCell>{getTradeModeLabel(deal.tradeMode)}</BodyCell>
                    <BodyCell>{deal.amountLabel}</BodyCell>
                    <BodyCell>
                      <StatusPill>{deal.currentStage}</StatusPill>
                    </BodyCell>
                    <BodyCell>{getDisclosureStageLabel(deal.disclosureStage)}</BodyCell>
                    <BodyCell>{deal.loiSigned ? 'Signed' : 'Pending'}</BodyCell>
                    <BodyCell>{deal.dataRoomReady ? 'Ready' : 'Blocked'}</BodyCell>
                    <BodyCell>{deal.escrowReady ? 'Ready' : 'Blocked'}</BodyCell>
                    <BodyCell>{deal.settlementReady ? 'Ready' : 'Blocked'}</BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Execution Readiness</h2>
            <div className="mt-5 space-y-4">
              {dealRecords.map((deal) => (
                <div key={deal.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">
                    {deal.companyName} · {deal.shareClass}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <span>LOI: {deal.loiSigned ? 'Done' : 'Pending'}</span>
                    <span>Disclosure: {getDisclosureStageLabel(deal.disclosureStage)}</span>
                    <span>Escrow: {deal.escrowReady ? 'Ready' : 'Waiting'}</span>
                    <span>Settlement: {deal.settlementReady ? 'Ready' : 'Waiting'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">FA Team Participation</h2>
            <div className="mt-5 space-y-4">
              {faTeams.map((team) => (
                <div key={team.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{team.name}</p>
                      <p className="text-sm text-slate-500">{team.id}</p>
                    </div>
                    <StatusPill>{team.status}</StatusPill>
                  </div>
                  <div className="mt-4 space-y-2">
                    {team.members.map((member) => (
                      <div key={`${team.id}-${member.faId}`} className="flex items-center justify-between text-sm">
                        <span className="text-slate-700">
                          {member.role} · {member.name}
                        </span>
                        <span className="font-medium text-slate-900">
                          {(member.commissionRatio * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
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
