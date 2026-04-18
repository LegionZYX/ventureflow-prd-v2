'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import {
  canAdvanceDeal,
  canAdvanceSellerDisclosure,
  canAdvanceSellerPayout,
  canAdvanceEscrow,
  canAdvanceSettlement,
  canAdvanceTransferApproval,
  getDealActionLabel,
  getSellerDisclosureActionLabel,
  getSellerPayoutActionLabel,
  getEscrowActionLabel,
  getSettlementActionLabel,
  getTransferApprovalActionLabel,
} from '@/lib/trading-v2-workflow';
import {
  getDealStageLabel,
  getDisclosureStageLabel,
  getPipelineCounts,
  getTradeModeLabel,
} from '@/lib/trading-v2';

export default function DealsPage() {
  const { error, isPending, loading, runAction, workspace } = useTradingWorkspace();

  if (loading || !workspace) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading deal pipeline...
        </div>
      </DashboardLayout>
    );
  }

  const pipeline = getPipelineCounts(workspace);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Deal Pipeline</h1>
          <p className="mt-2 text-slate-500">
            The PRD V2 execution chain now persists through negotiation, diligence, SPA, escrow, transfer approval, and settlement.
          </p>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {pipeline.map((item) => (
            <div key={item.stage} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">{getDealStageLabel(item.stage)}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.count}</p>
            </div>
          ))}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Current Deals</h2>
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
                  <HeaderCell>Action</HeaderCell>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {workspace.dealRecords.map((deal) => (
                  <tr key={deal.id}>
                    <BodyCell>
                      <div>
                        <p className="font-semibold text-slate-900">{deal.companyName}</p>
                        <p className="text-xs text-slate-500">
                          {deal.bidOrderId} to {deal.askOrderId}
                        </p>
                      </div>
                    </BodyCell>
                    <BodyCell>{getTradeModeLabel(deal.tradeMode)}</BodyCell>
                    <BodyCell>{deal.amountLabel}</BodyCell>
                    <BodyCell>
                      <StatusPill>{getDealStageLabel(deal.currentStage)}</StatusPill>
                    </BodyCell>
                    <BodyCell>{getDisclosureStageLabel(deal.disclosureStage)}</BodyCell>
                    <BodyCell>{deal.loiSigned ? 'Signed' : 'Pending'}</BodyCell>
                    <BodyCell>{deal.dataRoomReady ? 'Ready' : 'Blocked'}</BodyCell>
                    <BodyCell>{deal.escrowReady ? 'Ready' : 'Blocked'}</BodyCell>
                    <BodyCell>{deal.settlementReady ? 'Ready' : 'Blocked'}</BodyCell>
                    <BodyCell>
                      <button
                        onClick={() => runAction('advanceDeal', deal.id)}
                        disabled={!canAdvanceDeal(deal.currentStage) || isPending}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {getDealActionLabel(deal.currentStage)}
                      </button>
                    </BodyCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Negotiation Records</h2>
            <div className="mt-5 space-y-4">
              {workspace.negotiationRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{record.companyName}</p>
                      <p className="text-sm text-slate-500">{record.channel}</p>
                    </div>
                    <StatusPill>{record.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{record.summary}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Snapshot: {record.priceSnapshotLabel} / Owner: {record.owner}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Transfer Approvals</h2>
            <div className="mt-5 space-y-4">
              {workspace.transferApprovals.map((approval) => (
                <div key={approval.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{approval.companyName}</p>
                      <p className="text-sm text-slate-500">{approval.approvalType}</p>
                    </div>
                    <StatusPill>{approval.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Owner: {approval.owner}</p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => runAction('advanceTransferApproval', approval.id)}
                      disabled={!canAdvanceTransferApproval(approval.status) || isPending}
                      className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {getTransferApprovalActionLabel(approval.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Escrow Board</h2>
            <div className="mt-5 space-y-4">
              {workspace.escrowRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{record.companyName}</p>
                      <p className="text-sm text-slate-500">{record.accountLabel}</p>
                    </div>
                    <StatusPill>{record.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    {record.amountLabel} / Payment proof {record.paymentProofReady ? 'ready' : 'pending'}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => runAction('advanceEscrow', record.id)}
                      disabled={!canAdvanceEscrow(record.status) || isPending}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {getEscrowActionLabel(record.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Seller Disclosure Log</h2>
            <div className="mt-5 space-y-4">
              {workspace.sellerDisclosureRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{record.companyName}</p>
                      <p className="text-sm text-slate-500">
                        {record.accessRole} / {getDisclosureStageLabel(record.stage)}
                      </p>
                    </div>
                    <StatusPill>{record.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{record.requestReason}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    Approved by {record.approvedBy} / {record.auditNote}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => runAction('advanceSellerDisclosure', record.id)}
                      disabled={!canAdvanceSellerDisclosure(record.status) || isPending}
                      className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {getSellerDisclosureActionLabel(record.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Settlement Statements</h2>
            <div className="mt-5 space-y-4">
              {workspace.settlementStatements.map((statement) => (
                <div key={statement.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{statement.companyName}</p>
                      <p className="text-sm text-slate-500">{statement.sellerAlias}</p>
                    </div>
                    <StatusPill>{statement.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    Gross {statement.grossAmountLabel} / Platform {statement.platformFeeLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Legal {statement.legalFeeLabel} / Net proceeds {statement.netProceedsLabel}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => runAction('advanceSettlement', statement.id)}
                      disabled={!canAdvanceSettlement(statement.status) || isPending}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {getSettlementActionLabel(statement.status)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Seller Payout Board</h2>
            <div className="mt-5 space-y-4">
              {workspace.sellerPayoutRecords.map((record) => (
                <div key={record.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{record.companyName}</p>
                      <p className="text-sm text-slate-500">{record.destinationLabel}</p>
                    </div>
                    <StatusPill>{record.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">
                    {record.sellerAlias} / {record.amountLabel}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Evidence {record.payoutEvidenceReady ? 'ready' : 'pending'}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => runAction('advanceSellerPayout', record.id)}
                      disabled={!canAdvanceSellerPayout(record.status) || isPending}
                      className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {getSellerPayoutActionLabel(record.status)}
                    </button>
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
