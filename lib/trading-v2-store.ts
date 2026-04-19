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
  | 'createKycSubmission'
  | 'convertMatch';

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

function estimateMatchScore() {
  return 88;
}

function ensureListingForAsk(current: TradingWorkspace, askId: string) {
  const ask = current.askOrders.find((item) => item.id === askId);

  if (!ask || ask.ownershipStatus !== 'VERIFIED' || ask.status !== 'ACTIVE_LISTING') {
    return current;
  }

  const existingListing = current.listingRecords.find((listing) => listing.askOrderId === ask.id);

  if (existingListing) {
    return current;
  }

  return {
    ...current,
    listingRecords: [
      {
        id: createId('listing', current.listingRecords.map((listing) => listing.id)),
        askOrderId: ask.id,
        companyId: ask.companyId,
        companyName: ask.companyName,
        tradeMode: ask.tradeMode,
        shareClass: ask.shareClass,
        priceRangeLabel: ask.askPriceLabel,
        quantityRangeLabel: ask.quantityLabel,
        sellerAlias: ask.sellerAlias,
        sellerVerification: ask.ownershipStatus,
        disclosureStage:
          ask.privacyLevel === 'PUBLIC_ANONYMOUS'
            ? ('ANONYMOUS' as const)
            : ('NDA_ONLY' as const),
        activeBidCount: current.bidOrders.filter(
          (bid) =>
            bid.companyName === ask.companyName &&
            bid.shareClass === ask.shareClass &&
            bid.tradeMode === ask.tradeMode &&
            bid.status === 'ACTIVE',
        ).length,
        activeMatchCount: 0,
        status: 'ACTIVE' as const,
      },
      ...current.listingRecords,
    ],
  };
}

function attachMatchesForAsk(current: TradingWorkspace, askId: string) {
  const ask = current.askOrders.find((item) => item.id === askId);

  if (!ask || ask.status !== 'ACTIVE_LISTING') {
    return current;
  }

  const eligibleBids = current.bidOrders.filter(
    (bid) =>
      bid.companyName === ask.companyName &&
      bid.shareClass === ask.shareClass &&
      bid.tradeMode === ask.tradeMode &&
      bid.status === 'ACTIVE',
  );

  const newMatches = eligibleBids
    .filter(
      (bid) =>
        !current.orderMatches.some(
          (match) => match.bidOrderId === bid.id && match.askOrderId === ask.id,
        ),
    )
    .map((bid, index) => ({
      id: `match-${current.orderMatches.length + index + 1}`,
      bidOrderId: bid.id,
      askOrderId: ask.id,
      companyName: ask.companyName,
      tradeMode: ask.tradeMode,
      matchScore: estimateMatchScore(),
      status: 'REVIEWING' as const,
      leadFaId: current.faRecommendationLeads[0]?.faId ?? 'fa-lead-01',
    }));

  if (newMatches.length === 0) {
    return current;
  }

  return {
    ...current,
    orderMatches: [...newMatches, ...current.orderMatches],
    listingRecords: current.listingRecords.map((listing) =>
      listing.askOrderId === ask.id
        ? {
            ...listing,
            activeBidCount: eligibleBids.length,
            activeMatchCount: listing.activeMatchCount + newMatches.length,
          }
        : listing,
    ),
  };
}

function attachMatchesForBid(current: TradingWorkspace, bidId: string) {
  const bid = current.bidOrders.find((item) => item.id === bidId);

  if (!bid || bid.status !== 'ACTIVE') {
    return current;
  }

  const eligibleListings = current.listingRecords.filter(
    (listing) =>
      listing.companyName === bid.companyName &&
      listing.shareClass === bid.shareClass &&
      listing.tradeMode === bid.tradeMode &&
      listing.status === 'ACTIVE',
  );

  const newMatches = eligibleListings
    .filter(
      (listing) =>
        !current.orderMatches.some(
          (match) => match.bidOrderId === bid.id && match.askOrderId === listing.askOrderId,
        ),
    )
    .map((listing, index) => ({
      id: `match-${current.orderMatches.length + index + 1}`,
      bidOrderId: bid.id,
      askOrderId: listing.askOrderId,
      companyName: bid.companyName,
      tradeMode: bid.tradeMode,
      matchScore: estimateMatchScore(),
      status: 'REVIEWING' as const,
      leadFaId: current.faRecommendationLeads[0]?.faId ?? 'fa-lead-01',
    }));

  if (newMatches.length === 0) {
    return current;
  }

  return {
    ...current,
    orderMatches: [...newMatches, ...current.orderMatches],
    listingRecords: current.listingRecords.map((listing) =>
      eligibleListings.some((item) => item.id === listing.id)
        ? {
            ...listing,
            activeBidCount: listing.activeBidCount + 1,
            activeMatchCount: listing.activeMatchCount + newMatches.filter(
              (match) => match.askOrderId === listing.askOrderId,
            ).length,
          }
        : listing,
    ),
  };
}

function createDealFromMatch(current: TradingWorkspace, matchId: string) {
  const match = current.orderMatches.find((item) => item.id === matchId);

  if (!match || match.status === 'CONVERTED') {
    return current;
  }

  const bid = current.bidOrders.find((item) => item.id === match.bidOrderId);
  const ask = current.askOrders.find((item) => item.id === match.askOrderId);
  const listing = current.listingRecords.find((item) => item.askOrderId === match.askOrderId);

  if (!bid || !ask || !listing) {
    return current;
  }

  const dealId = createId('deal', current.dealRecords.map((deal) => deal.id));
  const buyer = current.participants.find((participant) => participant.id === bid.buyerId);
  const nextAgreementIds = current.platformMandateAgreements.map((agreement) => agreement.id);
  const buyerAgreementId = createId('agreement', nextAgreementIds);
  const sellerAgreementId = createId('agreement', [...nextAgreementIds, buyerAgreementId]);

  return {
    ...current,
    orderMatches: current.orderMatches.map((item) =>
      item.id === matchId ? { ...item, status: 'CONVERTED' as const } : item,
    ),
    bidOrders: current.bidOrders.map((item) =>
      item.id === bid.id ? { ...item, status: 'DEAL_CREATED' as const } : item,
    ),
    askOrders: current.askOrders.map((item) =>
      item.id === ask.id ? { ...item, status: 'DEAL_CREATED' as const } : item,
    ),
    dealRecords: [
      {
        id: dealId,
        listingId: listing.id,
        bidOrderId: bid.id,
        askOrderId: ask.id,
        companyName: match.companyName,
        tradeMode: match.tradeMode,
        shareClass: ask.shareClass,
        amountLabel: `${bid.bidPriceLabel} / ${bid.quantityLabel}`,
        currentStage: 'NEGOTIATING' as const,
        disclosureStage: listing.disclosureStage,
        loiSigned: false,
        dataRoomReady: false,
        escrowReady: false,
        settlementReady: false,
        leadFaTeamId: current.faTeams[0]?.id ?? 'fa-team-1',
      },
      ...current.dealRecords,
    ],
    platformMandateAgreements: [
      {
        id: buyerAgreementId,
        side: 'BUYER' as const,
        principalName: buyer?.displayName ?? bid.buyerId,
        principalType: 'REGISTERED_BUYER' as const,
        relatedDealId: dealId,
        contractWith: 'PLATFORM' as const,
        agreementType: 'BUYER_MANDATE' as const,
        status: 'DRAFT' as const,
        signedDate: '2026-04-19',
        signingMethod: 'E_SIGN' as const,
        certificationStatus: 'PENDING' as const,
      },
      {
        id: sellerAgreementId,
        side: 'SELLER' as const,
        principalName: ask.sellerAlias,
        principalType: 'SELLER' as const,
        relatedDealId: dealId,
        contractWith: 'PLATFORM' as const,
        agreementType: 'SELLER_MANDATE' as const,
        status: 'DRAFT' as const,
        signedDate: '2026-04-19',
        signingMethod: 'PAPER_WITNESSED' as const,
        witnessType: 'LAWYER' as const,
        witnessLawFirm: 'Pending counsel confirmation',
        certificationStatus: 'PENDING' as const,
      },
      ...current.platformMandateAgreements,
    ],
    dashboardTasks: [
      {
        id: createId('task', current.dashboardTasks.map((task) => task.id)),
        companyName: match.companyName,
        owner: 'Execution desk',
        title: `Open deal room for ${dealId}`,
        dueLabel: 'Today',
        status: 'OPEN' as const,
        relatedEntity: 'DEAL' as const,
      },
      ...current.dashboardTasks,
    ],
  };
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
        {
          const updatedRecords = workspace.documentReviewRecords.map((record) =>
            record.id === id ? advanceDocumentReview(record) : record,
          );
          const updatedRecord = updatedRecords.find((record) => record.id === id);

          let nextWorkspace: TradingWorkspace = {
            ...workspace,
            documentReviewRecords: updatedRecords,
          };

          if (updatedRecord?.status === 'APPROVED' && updatedRecord.entityType === 'BUYER_KYC') {
            nextWorkspace = {
              ...nextWorkspace,
              bidOrders: nextWorkspace.bidOrders.map((bid) =>
              bid.id === updatedRecord.entityId
                  ? { ...bid, status: 'ACTIVE' as const, accreditedInvestor: true }
                  : bid,
              ),
            };
            nextWorkspace = attachMatchesForBid(nextWorkspace, updatedRecord.entityId);
          }

          if (updatedRecord?.status === 'APPROVED' && updatedRecord.entityType === 'ASK_OWNERSHIP') {
            nextWorkspace = {
              ...nextWorkspace,
              askOrders: nextWorkspace.askOrders.map((ask) =>
                ask.id === updatedRecord.entityId
                  ? {
                      ...ask,
                      ownershipStatus: 'VERIFIED' as const,
                      status: 'ACTIVE_LISTING' as const,
                    }
                  : ask,
              ),
            };
            nextWorkspace = ensureListingForAsk(nextWorkspace, updatedRecord.entityId);
            nextWorkspace = attachMatchesForAsk(nextWorkspace, updatedRecord.entityId);
          }

          return nextWorkspace;
        }
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
      case 'convertMatch':
        return createDealFromMatch(workspace, id ?? '');
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
          documentReviewRecords: [
            {
              id: createId('doc', workspace.documentReviewRecords.map((record) => record.id)),
              entityType: 'BUYER_KYC',
              entityId: bidId,
              companyName: payload.companyName,
              owner: 'Compliance',
              requiredDocuments: [
                'Accredited investor evidence',
                'Source of funds declaration',
                'Bank account for escrow or settlement',
              ],
              missingDocuments: [
                'Accredited investor evidence',
                'Source of funds declaration',
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
