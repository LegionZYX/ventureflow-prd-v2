import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  createSeedTradingWorkspace,
  normalizeTradingWorkspace,
  type TradingWorkspace,
} from '@/lib/trading-v2';
import {
  advanceAgreementStatus,
  advanceDealStage,
  advanceDocumentReview,
  advanceEscrowStatus,
  advanceFAOnboardingStatus,
  advanceRecommendationStatus,
  advanceRewardStatus,
  advanceSellerDisclosure,
  advanceSellerPayout,
  advanceSettlementStatement,
  advanceTransferApprovalStatus,
  reconfirmAskOrder,
  reconfirmBidOrder,
  withdrawAskOrder,
  withdrawBidOrder,
} from '@/lib/trading-v2-workflow';

const dataDirectory = path.join(process.cwd(), 'data');
const dataFile = path.join(dataDirectory, 'trading-v2-workspace.json');

type TradingAction =
  | 'advanceRecommendation'
  | 'advanceAgreement'
  | 'advanceReward'
  | 'advanceDeal'
  | 'advanceFAOnboarding'
  | 'advanceTransferApproval'
  | 'advanceEscrow'
  | 'withdrawBid'
  | 'reconfirmBid'
  | 'withdrawAsk'
  | 'reconfirmAsk'
  | 'advanceDocumentReview'
  | 'advanceSellerDisclosure'
  | 'advanceSettlement'
  | 'advanceSellerPayout';

let writeQueue = Promise.resolve();

async function ensureWorkspaceFile() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    const raw = await readFile(dataFile, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<TradingWorkspace>;
    const normalized = normalizeTradingWorkspace(parsed);

    if (!Array.isArray(normalized.dealRecords) || !Array.isArray(normalized.bidOrders)) {
      throw new Error('Invalid workspace file');
    }

    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      await writeFile(dataFile, JSON.stringify(normalized, null, 2), 'utf-8');
    }
  } catch {
    await writeFile(dataFile, JSON.stringify(createSeedTradingWorkspace(), null, 2), 'utf-8');
  }
}

export async function readTradingWorkspace(): Promise<TradingWorkspace> {
  await ensureWorkspaceFile();
  const raw = await readFile(dataFile, 'utf-8');
  return normalizeTradingWorkspace(JSON.parse(raw) as Partial<TradingWorkspace>);
}

export async function writeTradingWorkspace(
  updater: TradingWorkspace | ((current: TradingWorkspace) => TradingWorkspace),
) {
  const result = writeQueue.then(async () => {
    const current = await readTradingWorkspace();
    const next = normalizeTradingWorkspace(
      typeof updater === 'function' ? updater(current) : updater,
    );
    const tempFile = `${dataFile}.tmp`;
    await writeFile(tempFile, JSON.stringify(next, null, 2), 'utf-8');
    await rename(tempFile, dataFile);
    return next;
  });

  writeQueue = result.then(
    () => undefined,
    () => undefined,
  );

  return result;
}

export async function applyTradingAction(action: TradingAction, id: string) {
  return writeTradingWorkspace((workspace) => {
    switch (action) {
      case 'advanceRecommendation':
        return {
          ...workspace,
          faRecommendationLeads: workspace.faRecommendationLeads.map((lead) =>
            lead.id === id ? advanceRecommendationStatus(lead) : lead,
          ),
        };
      case 'advanceAgreement':
        return {
          ...workspace,
          platformMandateAgreements: workspace.platformMandateAgreements.map((agreement) =>
            agreement.id === id ? advanceAgreementStatus(agreement) : agreement,
          ),
        };
      case 'advanceReward':
        return {
          ...workspace,
          referralRewardRecords: workspace.referralRewardRecords.map((reward) =>
            reward.id === id ? advanceRewardStatus(reward) : reward,
          ),
        };
      case 'advanceDeal':
        return {
          ...workspace,
          dealRecords: workspace.dealRecords.map((deal) =>
            deal.id === id ? advanceDealStage(deal) : deal,
          ),
        };
      case 'advanceFAOnboarding':
        return {
          ...workspace,
          faOnboardingApplications: workspace.faOnboardingApplications.map((application) =>
            application.id === id ? advanceFAOnboardingStatus(application) : application,
          ),
        };
      case 'advanceTransferApproval':
        return {
          ...workspace,
          transferApprovals: workspace.transferApprovals.map((approval) =>
            approval.id === id ? advanceTransferApprovalStatus(approval) : approval,
          ),
        };
      case 'advanceEscrow':
        return {
          ...workspace,
          escrowRecords: workspace.escrowRecords.map((record) =>
            record.id === id ? advanceEscrowStatus(record) : record,
          ),
        };
      case 'withdrawBid':
        return {
          ...workspace,
          bidOrders: workspace.bidOrders.map((bid) =>
            bid.id === id ? withdrawBidOrder(bid) : bid,
          ),
        };
      case 'reconfirmBid':
        return {
          ...workspace,
          bidOrders: workspace.bidOrders.map((bid) =>
            bid.id === id ? reconfirmBidOrder(bid) : bid,
          ),
        };
      case 'withdrawAsk':
        return {
          ...workspace,
          askOrders: workspace.askOrders.map((ask) =>
            ask.id === id ? withdrawAskOrder(ask) : ask,
          ),
        };
      case 'reconfirmAsk':
        return {
          ...workspace,
          askOrders: workspace.askOrders.map((ask) =>
            ask.id === id ? reconfirmAskOrder(ask) : ask,
          ),
        };
      case 'advanceDocumentReview':
        return {
          ...workspace,
          documentReviewRecords: workspace.documentReviewRecords.map((record) =>
            record.id === id ? advanceDocumentReview(record) : record,
          ),
        };
      case 'advanceSellerDisclosure':
        return {
          ...workspace,
          sellerDisclosureRecords: workspace.sellerDisclosureRecords.map((record) =>
            record.id === id ? advanceSellerDisclosure(record) : record,
          ),
        };
      case 'advanceSettlement':
        return {
          ...workspace,
          settlementStatements: workspace.settlementStatements.map((statement) =>
            statement.id === id ? advanceSettlementStatement(statement) : statement,
          ),
        };
      case 'advanceSellerPayout':
        return {
          ...workspace,
          sellerPayoutRecords: workspace.sellerPayoutRecords.map((record) =>
            record.id === id ? advanceSellerPayout(record) : record,
          ),
        };
      default:
        return workspace;
    }
  });
}

export type { TradingAction };
