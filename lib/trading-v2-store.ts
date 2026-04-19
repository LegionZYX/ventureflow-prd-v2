import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  createSeedTradingWorkspace,
  kycRoleDocumentMap,
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
  | 'advanceSellerPayout'
  | 'createBid'
  | 'createAsk'
  | 'createKycSubmission';

interface CreateBidPayload {
  buyerName: string;
  companyName: string;
  shareClass: string;
  tradeMode: 'L1' | 'L2' | 'DIRECT';
  bidPriceLabel: string;
  quantityLabel: string;
  validUntil: string;
  conditions: string[];
}

interface CreateAskPayload {
  sellerAlias: string;
  companyName: string;
  shareClass: string;
  tradeMode: 'L1' | 'L2' | 'DIRECT';
  askPriceLabel: string;
  quantityLabel: string;
  validityLabel: string;
  transferRestrictions: string;
}

interface CreateKycSubmissionPayload {
  role: 'BUYER' | 'SELLER' | 'INSTITUTION' | 'FA';
  companyName: string;
  registrationNumber: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
  investorType: string;
  aum: string;
}

type TradingPayload = CreateBidPayload | CreateAskPayload | CreateKycSubmissionPayload;

let writeQueue = Promise.resolve();

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function createId(prefix: string, existingIds: string[]) {
  return `${prefix}-${existingIds.length + 1}`;
}

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

export async function applyTradingAction(action: TradingAction, id?: string, payload?: TradingPayload) {
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
      case 'createBid': {
        if (!payload || !('buyerName' in payload)) {
          return workspace;
        }

        const participantId = createId(
          'buyer-submitted',
          workspace.participants.map((participant) => participant.id),
        );
        const bidId = createId('bid', workspace.bidOrders.map((bid) => bid.id));
        const companyId = slugify(payload.companyName);

        return {
          ...workspace,
          participants: [
            ...workspace.participants,
            {
              id: participantId,
              displayName: payload.buyerName,
              role: 'BUYER',
              entityType: 'INSTITUTION',
              region: 'Pending KYC',
              kycStatus: 'IN_REVIEW',
              qualified: false,
            },
          ],
          bidOrders: [
            {
              id: bidId,
              buyerId: participantId,
              companyId,
              companyName: payload.companyName,
              tradeMode: payload.tradeMode,
              shareClass: payload.shareClass,
              bidPriceLabel: payload.bidPriceLabel,
              quantityLabel: payload.quantityLabel,
              remainingQuantityLabel: payload.quantityLabel,
              validUntil: payload.validUntil,
              accreditedInvestor: false,
              conditions: payload.conditions,
              status: 'COMPLIANCE_REVIEW',
            },
            ...workspace.bidOrders,
          ],
          dashboardTasks: [
            {
              id: createId('task', workspace.dashboardTasks.map((task) => task.id)),
              companyName: payload.companyName,
              owner: 'Compliance',
              title: `Review new buyer bid ${bidId}`,
              dueLabel: 'Today',
              status: 'OPEN',
              relatedEntity: 'KYC',
            },
            ...workspace.dashboardTasks,
          ],
        };
      }
      case 'createAsk': {
        if (!payload || !('sellerAlias' in payload)) {
          return workspace;
        }

        const participantId = createId(
          'seller-submitted',
          workspace.participants.map((participant) => participant.id),
        );
        const askId = createId('ask', workspace.askOrders.map((ask) => ask.id));
        const companyId = slugify(payload.companyName);

        return {
          ...workspace,
          participants: [
            ...workspace.participants,
            {
              id: participantId,
              displayName: payload.sellerAlias,
              role: 'SELLER',
              entityType: 'INDIVIDUAL',
              region: 'Pending ownership review',
              kycStatus: 'IN_REVIEW',
              qualified: false,
            },
          ],
          askOrders: [
            {
              id: askId,
              sellerId: participantId,
              sellerAlias: payload.sellerAlias,
              companyId,
              companyName: payload.companyName,
              tradeMode: payload.tradeMode,
              shareClass: payload.shareClass,
              quantityLabel: payload.quantityLabel,
              remainingQuantityLabel: payload.quantityLabel,
              askPriceLabel: payload.askPriceLabel,
              validityLabel: payload.validityLabel,
              transferRestrictions: payload.transferRestrictions,
              ownershipStatus: 'PENDING',
              privacyLevel: 'CONTROLLED_DISCLOSURE',
              status: 'OWNERSHIP_REVIEW',
            },
            ...workspace.askOrders,
          ],
          documentReviewRecords: [
            {
              id: createId('doc', workspace.documentReviewRecords.map((record) => record.id)),
              entityType: 'ASK_OWNERSHIP',
              entityId: askId,
              companyName: payload.companyName,
              owner: 'Platform legal',
              requiredDocuments: [
                'Stock certificate or equity platform proof',
                'Grant, exercise, or acquisition agreement',
                'Transfer restriction and ROFR disclosure',
              ],
              missingDocuments: [
                'Stock certificate or equity platform proof',
                'Transfer restriction and ROFR disclosure',
              ],
              status: 'PENDING',
              lastUpdated: '2026-04-19',
            },
            ...workspace.documentReviewRecords,
          ],
          dashboardTasks: [
            {
              id: createId('task', workspace.dashboardTasks.map((task) => task.id)),
              companyName: payload.companyName,
              owner: 'Legal',
              title: `Verify ownership package for ${askId}`,
              dueLabel: 'Today',
              status: 'OPEN',
              relatedEntity: 'ASK',
            },
            ...workspace.dashboardTasks,
          ],
        };
      }
      case 'createKycSubmission': {
        if (!payload || !('registrationNumber' in payload)) {
          return workspace;
        }

        return {
          ...workspace,
          kycSubmissions: [
            {
              id: createId('kyc', workspace.kycSubmissions.map((submission) => submission.id)),
              role: payload.role,
              companyName: payload.companyName,
              registrationNumber: payload.registrationNumber,
              country: payload.country,
              contactName: payload.contactName,
              email: payload.email,
              phone: payload.phone,
              investorType: payload.investorType,
              aum: payload.aum,
              requiredDocuments: [...kycRoleDocumentMap[payload.role]],
              status: 'SUBMITTED',
              createdAt: '2026-04-19',
            },
            ...workspace.kycSubmissions,
          ],
          dashboardTasks: [
            {
              id: createId('task', workspace.dashboardTasks.map((task) => task.id)),
              companyName: payload.companyName,
              owner: 'Compliance',
              title: `Review KYC submission for ${payload.companyName}`,
              dueLabel: 'Today',
              status: 'OPEN',
              relatedEntity: 'KYC',
            },
            ...workspace.dashboardTasks,
          ],
        };
      }
      default:
        return workspace;
    }
  });
}

export type { TradingAction, TradingPayload };
