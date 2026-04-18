'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  canAdvanceAgreement,
  getAgreementActionLabel,
} from '@/lib/trading-v2-workflow';
import { getPlatformAgreementBoard } from '@/lib/trading-v2';

export default function AgreementsPage() {
  const { error, isPending, loading, runAction, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading agreement board...
        </div>
      </DashboardLayout>
    );
  }

  const agreements = getPlatformAgreementBoard(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Agreements</h1>
          <p className="mt-2 text-slate-500">
            Buyer and seller mandates remain platform contracts even when the opportunity originated from an FA recommendation.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
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
              agreements.filter((item) =>
                ['SIGNED', 'ACTIVE'].includes(item.status),
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
                  <HeaderCell>Signing Method</HeaderCell>
                  <HeaderCell>Witness / Certification</HeaderCell>
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
                    <BodyCell>
                      {agreement.signingMethod === 'E_SIGN' ? 'E-sign' : 'Paper witnessed'}
                    </BodyCell>
                    <BodyCell>
                      {agreement.signingMethod === 'PAPER_WITNESSED'
                        ? `${agreement.witnessType ?? 'Lawyer'} / ${agreement.witnessLawFirm ?? 'Pending counsel'}`
                        : agreement.certificationStatus ?? 'Verified'}
                    </BodyCell>
                    <BodyCell>{agreement.deal?.companyName ?? '-'}</BodyCell>
                    <BodyCell>
                      {agreement.relatedRecommendationId ?? 'Direct platform relationship'}
                    </BodyCell>
                    <BodyCell>
                      <StatusPill>{agreement.status}</StatusPill>
                    </BodyCell>
                    <BodyCell>
                      <button
                        onClick={() => runAction('advanceAgreement', agreement.id)}
                        disabled={!canAdvanceAgreement(agreement.status) || isPending}
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
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <RuleCard
              title="Buyer Side"
              body="Registered buyers and bound prospects both sign with the platform once they enter formal execution."
            />
            <RuleCard
              title="Seller Side"
              body="Seller and GP mandates stay with the platform even when FA teams handle sourcing and negotiation."
            />
            <RuleCard
              title="FA Referral"
              body="FA recommendation records control attribution and rewards, not the legal counterparty of the contract."
            />
            <RuleCard
              title="Signing Method"
              body="E-sign is optional. Paper execution is allowed, but the package must include lawyer witnessing or equivalent legal certification."
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
  return (
    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 text-sm text-slate-700">{children}</td>;
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}
