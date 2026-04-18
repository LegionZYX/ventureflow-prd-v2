'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  canAdvanceRecommendation,
  getRecommendationActionLabel,
} from '@/lib/trading-v2-workflow';
import { getBidRegistry, getFARecommendationQueue, getTradeModeLabel } from '@/lib/trading-v2';

export default function BuyersPage() {
  const { error, isPending, loading, runAction, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading buyer coverage workspace...
        </div>
      </DashboardLayout>
    );
  }

  const registeredBuyers = workspace.participants.filter((participant) => participant.role === 'BUYER');
  const bidRegistry = getBidRegistry(workspace);
  const recommendationQueue = getFARecommendationQueue(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Buyer Coverage</h1>
          <p className="mt-2 text-slate-500">
            Registered buyers, FA-sourced prospects, and FA onboarding are now backed by one persisted workspace.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="Registered Buyers" value={String(registeredBuyers.length)} />
          <StatCard label="Active Bids" value={String(bidRegistry.length)} />
          <StatCard label="FA Recommendation Leads" value={String(recommendationQueue.length)} />
          <StatCard
            label="Bound Prospects"
            value={String(
              recommendationQueue.filter((item) =>
                ['BOUND_TO_FA', 'KYC_STARTED', 'REGISTERED', 'DEAL_LINKED'].includes(item.status),
              ).length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">Registered Buyer Base</h2>
            <p className="mt-1 text-sm text-slate-500">
              Buyers who already passed onboarding can enter bids directly and sign mandates with the platform.
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
              FA can push suitable assets to unregistered buyers first, bind the relationship, and later earn deal rewards.
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
                      <StatusPill>{lead.rewardEligible ? 'Reward track on' : 'Reward track off'}</StatusPill>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">
                      {lead.prospectName} / {lead.prospectCompany}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Recommended by {lead.faName} / {lead.prospectEmail}
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
                    Prospect attribution stays with the FA, but the eventual buyer-side mandate is still signed with the platform.
                  </p>
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

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">FA Onboarding Queue</h2>
            <p className="mt-1 text-sm text-slate-500">
              Forge-style FA readiness is now tracked as a real workflow: qualification, bank verification, training, then activation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workspace.faOnboardingApplications.map((application) => (
              <div key={application.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{application.legalName}</p>
                    <p className="text-sm text-slate-500">{application.region}</p>
                  </div>
                  <StatusPill>{application.status}</StatusPill>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
                  <span>Qualification: {application.qualificationDocsReady ? 'Ready' : 'Pending'}</span>
                  <span>Bank: {application.bankVerified ? 'Verified' : 'Pending'}</span>
                  <span>Training: {application.trainingCompleted ? 'Done' : 'Pending'}</span>
                  <span>Agreement: {application.serviceAgreementSigned ? 'Signed' : 'Pending'}</span>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => runAction('advanceFAOnboarding', application.id)}
                    disabled={application.status === 'ACTIVE' || isPending}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Advance Onboarding
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
