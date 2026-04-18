'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  canAdvanceReward,
  getRewardActionLabel,
} from '@/lib/trading-v2-workflow';
import { getReferralRewards } from '@/lib/trading-v2';

export default function CommissionPage() {
  const { error, isPending, loading, runAction, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading commission workspace...
        </div>
      </DashboardLayout>
    );
  }

  const rewards = getReferralRewards(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Commission & Referral Rewards</h1>
          <p className="mt-2 text-slate-500">
            Execution split and FA recommendation rewards are tracked separately, but now persist as one dataset.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="FA Teams" value={String(workspace.faTeams.length)} />
          <StatCard label="Referral Rewards" value={String(rewards.length)} />
          <StatCard
            label="Pending Rewards"
            value={String(rewards.filter((item) => item.status === 'PENDING').length)}
          />
          <StatCard
            label="Approved / Paid"
            value={String(
              rewards.filter((item) => ['APPROVED', 'PAID'].includes(item.status)).length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">FA Team Split</h2>
          <div className="mt-5 space-y-4">
            {workspace.faTeams.map((team) => (
              <div key={team.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{team.name}</p>
                    <p className="text-sm text-slate-500">{team.status}</p>
                  </div>
                  <StatusPill>Execution Split</StatusPill>
                </div>

                <div className="mt-4 space-y-3">
                  {team.members.map((member) => (
                    <div
                      key={`${team.id}-${member.faId}`}
                      className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm"
                    >
                      <span className="text-slate-700">
                        {member.role} / {member.name}
                      </span>
                      <span className="font-semibold text-slate-900">
                        {(member.commissionRatio * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Referral Reward Board</h2>
          <p className="mt-1 text-sm text-slate-500">
            Once the bound prospect closes, the recommendation reward can move from pending to approved to paid.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <HeaderCell>FA</HeaderCell>
                  <HeaderCell>Prospect</HeaderCell>
                  <HeaderCell>Deal</HeaderCell>
                  <HeaderCell>Trigger</HeaderCell>
                  <HeaderCell>Reward Type</HeaderCell>
                  <HeaderCell>Amount</HeaderCell>
                  <HeaderCell>Status</HeaderCell>
                  <HeaderCell>Action</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rewards.map((reward) => (
                  <tr key={reward.id}>
                    <BodyCell>{reward.recommendation?.faName ?? reward.faId}</BodyCell>
                    <BodyCell>{reward.recommendation?.prospectName ?? '-'}</BodyCell>
                    <BodyCell>{reward.deal?.companyName ?? reward.relatedDealId}</BodyCell>
                    <BodyCell>{reward.trigger}</BodyCell>
                    <BodyCell>{reward.rewardType}</BodyCell>
                    <BodyCell>{reward.amountLabel}</BodyCell>
                    <BodyCell>
                      <StatusPill>{reward.status}</StatusPill>
                    </BodyCell>
                    <BodyCell>
                      <button
                        onClick={() => runAction('advanceReward', reward.id)}
                        disabled={!canAdvanceReward(reward.status) || isPending}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {getRewardActionLabel(reward.status)}
                      </button>
                    </BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
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
