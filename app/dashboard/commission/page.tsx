'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { faTeams, getReferralRewards } from '@/lib/trading-v2';
import {
  advanceRewardStatus,
  canAdvanceReward,
  getRewardActionLabel,
} from '@/lib/trading-v2-workflow';

export default function CommissionPage() {
  const [rewards, setRewards] = useState(getReferralRewards());

  const advanceReward = (id: string) => {
    setRewards((current) =>
      current.map((reward) =>
        reward.id === id
          ? {
              ...reward,
              ...advanceRewardStatus(reward),
              recommendation: reward.recommendation,
              deal: reward.deal,
            }
          : reward,
      ),
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Commission & Referral Rewards</h1>
          <p className="mt-2 text-slate-500">
            这里把两种分配拆开看：交易执行团队分佣，以及 FA 因推荐未注册买家并最终促成成交而获得的奖励。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard label="FA Teams" value={String(faTeams.length)} />
          <StatCard label="Referral Rewards" value={String(rewards.length)} />
          <StatCard
            label="Pending Rewards"
            value={String(rewards.filter((item) => item.status === 'PENDING').length)}
          />
          <StatCard
            label="Approved / Paid"
            value={String(
              rewards.filter((item) => item.status === 'APPROVED' || item.status === 'PAID')
                .length,
            )}
          />
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">FA Team Split</h2>
          <div className="mt-5 space-y-4">
            {faTeams.map((team) => (
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
                        {member.role} · {member.name}
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
            规则：FA 推荐未注册买家，形成绑定关系后，如果后续 deal 落地，则按 reward board 发放推荐奖励。
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
                        onClick={() => advanceReward(reward.id)}
                        disabled={!canAdvanceReward(reward.status)}
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
  return <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">{children}</th>;
}

function BodyCell({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-4 text-sm text-slate-700">{children}</td>;
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{children}</span>;
}
