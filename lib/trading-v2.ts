export type TradeMode = 'L1' | 'L2' | 'DIRECT';

export type KycStatus = 'NOT_STARTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'NEEDS_MORE_INFO';
export type BidStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'COMPLIANCE_REVIEW'
  | 'ACTIVE'
  | 'MATCHED'
  | 'NEGOTIATING'
  | 'DEAL_CREATED'
  | 'EXPIRED'
  | 'WITHDRAWN';
export type AskStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'OWNERSHIP_REVIEW'
  | 'TRANSFERABILITY_REVIEW'
  | 'ACTIVE_LISTING'
  | 'MATCHED'
  | 'NEGOTIATING'
  | 'DEAL_CREATED'
  | 'WITHDRAWN';
export type MatchStatus =
  | 'NEW'
  | 'REVIEWING'
  | 'NDA_REQUIRED'
  | 'READY_FOR_NEGOTIATION'
  | 'CONVERTED';
export type DealStage =
  | 'LISTED'
  | 'NEGOTIATING'
  | 'LOI_SIGNED'
  | 'DILIGENCE'
  | 'SPA_SIGNED'
  | 'ESCROW_FUNDED'
  | 'TRANSFER_IN_PROGRESS'
  | 'SETTLEMENT_PENDING'
  | 'COMPLETED';
export type DisclosureStage =
  | 'ANONYMOUS'
  | 'NDA_ONLY'
  | 'NEGOTIATION_SUMMARY'
  | 'LEGAL_DISCLOSURE';

export interface ParticipantProfile {
  id: string;
  displayName: string;
  role: 'BUYER' | 'SELLER' | 'FA';
  entityType: 'INDIVIDUAL' | 'INSTITUTION' | 'FAMILY_OFFICE' | 'GP';
  region: string;
  kycStatus: KycStatus;
  qualified: boolean;
  aumLabel?: string;
  sourceOfFunds?: string;
}

export interface BuyerLead {
  id: string;
  buyerId: string;
  targetCompany: string;
  preferredShareClass: string;
  targetRaise: string;
  timeline: string;
  accreditedInvestor: boolean;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED';
}

export interface AskOrder {
  id: string;
  sellerId: string;
  sellerAlias: string;
  companyId: string;
  companyName: string;
  tradeMode: TradeMode;
  shareClass: string;
  quantityLabel: string;
  remainingQuantityLabel?: string;
  askPriceLabel: string;
  validityLabel: string;
  expiresAt?: string;
  reconfirmedAt?: string;
  withdrawnAt?: string;
  lifecycleNote?: string;
  transferRestrictions: string;
  ownershipStatus: VerificationStatus;
  privacyLevel: 'PUBLIC_ANONYMOUS' | 'CONTROLLED_DISCLOSURE';
  status: AskStatus;
}

export interface BidOrder {
  id: string;
  buyerId: string;
  companyId: string;
  companyName: string;
  tradeMode: TradeMode;
  shareClass: string;
  bidPriceLabel: string;
  quantityLabel: string;
  remainingQuantityLabel?: string;
  validUntil: string;
  reconfirmedAt?: string;
  withdrawnAt?: string;
  lifecycleNote?: string;
  accreditedInvestor: boolean;
  conditions: string[];
  status: BidStatus;
}

export interface ListingRecord {
  id: string;
  askOrderId: string;
  companyId: string;
  companyName: string;
  tradeMode: TradeMode;
  shareClass: string;
  priceRangeLabel: string;
  quantityRangeLabel: string;
  sellerAlias: string;
  sellerVerification: VerificationStatus;
  disclosureStage: DisclosureStage;
  activeBidCount: number;
  activeMatchCount: number;
  status: 'ACTIVE' | 'PAUSED';
}

export interface OrderMatch {
  id: string;
  bidOrderId: string;
  askOrderId: string;
  companyName: string;
  tradeMode: TradeMode;
  matchScore: number;
  status: MatchStatus;
  leadFaId: string;
}

export interface FATeamMember {
  faId: string;
  name: string;
  role: 'LEAD_FA' | 'SELLER_FA' | 'BUYER_FA' | 'NEGOTIATOR' | 'EXECUTOR';
  commissionRatio: number;
}

export interface FATeam {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PENDING';
  members: FATeamMember[];
}

export interface DealRecord {
  id: string;
  listingId: string;
  bidOrderId: string;
  askOrderId: string;
  companyName: string;
  tradeMode: TradeMode;
  shareClass: string;
  amountLabel: string;
  currentStage: DealStage;
  disclosureStage: DisclosureStage;
  loiSigned: boolean;
  dataRoomReady: boolean;
  escrowReady: boolean;
  settlementReady: boolean;
  leadFaTeamId: string;
}

export interface FARecommendationLead {
  id: string;
  faId: string;
  faName: string;
  prospectName: string;
  prospectCompany: string;
  prospectEmail: string;
  targetCompany: string;
  recommendedListingId: string;
  tradeMode: TradeMode;
  status:
    | 'PROSPECTED'
    | 'INTRO_SENT'
    | 'BOUND_TO_FA'
    | 'KYC_STARTED'
    | 'REGISTERED'
    | 'DEAL_LINKED';
  rewardEligible: boolean;
  notes: string;
}

export interface PlatformMandateAgreement {
  id: string;
  side: 'BUYER' | 'SELLER';
  principalName: string;
  principalType: 'REGISTERED_BUYER' | 'UNREGISTERED_PROSPECT' | 'SELLER' | 'GP';
  relatedDealId?: string;
  relatedRecommendationId?: string;
  contractWith: 'PLATFORM';
  agreementType: 'BUYER_MANDATE' | 'SELLER_MANDATE' | 'PLATFORM_FEE_AGREEMENT';
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'SIGNED' | 'ACTIVE' | 'COMPLETED';
  signedDate: string;
  signingMethod: 'E_SIGN' | 'PAPER_WITNESSED';
  witnessType?: 'LAWYER' | 'NOTARY';
  witnessLawFirm?: string;
  certificationStatus?: 'PENDING' | 'VERIFIED';
}

export interface ReferralRewardRecord {
  id: string;
  recommendationId: string;
  faId: string;
  relatedDealId: string;
  trigger: 'DEAL_SIGNED' | 'SETTLEMENT_COMPLETE';
  rewardType: 'FA_RECOMMENDATION_BONUS';
  amountLabel: string;
  status: 'PENDING' | 'APPROVED' | 'PAID';
}

export interface FAOnboardingApplication {
  id: string;
  faId: string;
  legalName: string;
  region: string;
  qualificationDocsReady: boolean;
  bankVerified: boolean;
  trainingCompleted: boolean;
  serviceAgreementSigned: boolean;
  status:
    | 'SUBMITTED'
    | 'QUALIFICATION_REVIEW'
    | 'BANK_PENDING'
    | 'TRAINING_PENDING'
    | 'ACTIVE';
}

export interface CompanyRule {
  id: string;
  companyId: string;
  companyName: string;
  rofrRequired: boolean;
  boardApprovalRequired: boolean;
  transferWindow: string;
  eligibleInvestorType: string;
  sellerPrivacyGuard: 'STRICT' | 'CONTROLLED';
}

export interface MarketSignal {
  id: string;
  companyId: string;
  companyName: string;
  referencePriceLabel: string;
  lastTradeLabel: string;
  bidCount: number;
  askCount: number;
  momentum: 'UP' | 'STABLE' | 'DOWN';
}

export interface OrderBookEntry {
  id: string;
  companyId: string;
  companyName: string;
  side: 'BID' | 'ASK';
  tradeMode: TradeMode;
  priceLabel: string;
  quantityLabel: string;
  visibility: 'PUBLIC' | 'NDA_ONLY';
  status: 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED';
}

export interface NegotiationRecord {
  id: string;
  dealId: string;
  companyName: string;
  channel: 'CALL' | 'MEETING' | 'COUNTER_OFFER';
  summary: string;
  priceSnapshotLabel: string;
  owner: string;
  status: 'OPEN' | 'LOCKED';
}

export interface TransferApproval {
  id: string;
  dealId: string;
  companyName: string;
  approvalType: 'ROFR' | 'ISSUER_CONSENT' | 'BOARD_APPROVAL';
  owner: string;
  status: 'PENDING' | 'ISSUER_REVIEW' | 'ROFR_WINDOW' | 'APPROVED' | 'REJECTED';
}

export interface EscrowRecord {
  id: string;
  dealId: string;
  companyName: string;
  accountLabel: string;
  amountLabel: string;
  status: 'DRAFT' | 'AWAITING_FUNDS' | 'FUNDED' | 'FROZEN' | 'RELEASED';
  paymentProofReady: boolean;
}

export interface DashboardTask {
  id: string;
  companyName: string;
  owner: string;
  title: string;
  dueLabel: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
  relatedEntity: 'KYC' | 'ASK' | 'DEAL' | 'ESCROW' | 'APPROVAL';
}

export interface DocumentReviewRecord {
  id: string;
  entityType: 'BUYER_KYC' | 'SELLER_KYC' | 'ASK_OWNERSHIP' | 'DEAL_LEGAL';
  entityId: string;
  companyName: string;
  owner: string;
  requiredDocuments: string[];
  missingDocuments: string[];
  status: 'PENDING' | 'NEEDS_MORE_INFO' | 'APPROVED';
  lastUpdated: string;
}

export interface SellerDisclosureRecord {
  id: string;
  dealId: string;
  companyName: string;
  stage: DisclosureStage;
  accessRole: 'BUYER' | 'FA' | 'LEGAL' | 'FINANCE';
  requestReason: string;
  approvedBy: string;
  status: 'REQUESTED' | 'APPROVED' | 'RELEASED';
  auditNote: string;
}

export interface SettlementStatement {
  id: string;
  dealId: string;
  companyName: string;
  sellerAlias: string;
  grossAmountLabel: string;
  platformFeeLabel: string;
  legalFeeLabel: string;
  netProceedsLabel: string;
  status: 'DRAFT' | 'ISSUED' | 'CONFIRMED' | 'SETTLED';
}

export interface SellerPayoutRecord {
  id: string;
  statementId: string;
  dealId: string;
  companyName: string;
  sellerAlias: string;
  destinationLabel: string;
  amountLabel: string;
  status: 'PENDING_APPROVAL' | 'READY_TO_PAY' | 'PAID' | 'RECONCILED';
  payoutEvidenceReady: boolean;
}

export interface TradingWorkspace {
  participants: ParticipantProfile[];
  buyerLeads: BuyerLead[];
  askOrders: AskOrder[];
  bidOrders: BidOrder[];
  listingRecords: ListingRecord[];
  orderMatches: OrderMatch[];
  faTeams: FATeam[];
  dealRecords: DealRecord[];
  faRecommendationLeads: FARecommendationLead[];
  platformMandateAgreements: PlatformMandateAgreement[];
  referralRewardRecords: ReferralRewardRecord[];
  faOnboardingApplications: FAOnboardingApplication[];
  companyRules: CompanyRule[];
  marketSignals: MarketSignal[];
  orderBookEntries: OrderBookEntry[];
  negotiationRecords: NegotiationRecord[];
  transferApprovals: TransferApproval[];
  escrowRecords: EscrowRecord[];
  dashboardTasks: DashboardTask[];
  documentReviewRecords: DocumentReviewRecord[];
  sellerDisclosureRecords: SellerDisclosureRecord[];
  settlementStatements: SettlementStatement[];
  sellerPayoutRecords: SellerPayoutRecord[];
}

export const dealStages: DealStage[] = [
  'LISTED',
  'NEGOTIATING',
  'LOI_SIGNED',
  'DILIGENCE',
  'SPA_SIGNED',
  'ESCROW_FUNDED',
  'TRANSFER_IN_PROGRESS',
  'SETTLEMENT_PENDING',
  'COMPLETED',
];

export const seedTradingWorkspace = createSeedTradingWorkspace();
export const participants = seedTradingWorkspace.participants;
export const buyerLeads = seedTradingWorkspace.buyerLeads;
export const askOrders = seedTradingWorkspace.askOrders;
export const bidOrders = seedTradingWorkspace.bidOrders;
export const listingRecords = seedTradingWorkspace.listingRecords;
export const orderMatches = seedTradingWorkspace.orderMatches;
export const faTeams = seedTradingWorkspace.faTeams;
export const dealRecords = seedTradingWorkspace.dealRecords;
export const faRecommendationLeads = seedTradingWorkspace.faRecommendationLeads;
export const platformMandateAgreements = seedTradingWorkspace.platformMandateAgreements;
export const referralRewardRecords = seedTradingWorkspace.referralRewardRecords;
export const documentReviewRecords = seedTradingWorkspace.documentReviewRecords;
export const sellerDisclosureRecords = seedTradingWorkspace.sellerDisclosureRecords;
export const settlementStatements = seedTradingWorkspace.settlementStatements;
export const sellerPayoutRecords = seedTradingWorkspace.sellerPayoutRecords;

export function createSeedTradingWorkspace(): TradingWorkspace {
  return {
    participants: [
      {
        id: 'buyer-citic',
        displayName: 'CITIC Hong Kong',
        role: 'BUYER',
        entityType: 'INSTITUTION',
        region: 'Hong Kong',
        kycStatus: 'APPROVED',
        qualified: true,
        aumLabel: '$200M',
        sourceOfFunds: 'Institutional treasury',
      },
      {
        id: 'buyer-antalpha',
        displayName: 'Antalpha Growth Desk',
        role: 'BUYER',
        entityType: 'INSTITUTION',
        region: 'Singapore',
        kycStatus: 'APPROVED',
        qualified: true,
        aumLabel: '$100M',
        sourceOfFunds: 'Fund allocation',
      },
      {
        id: 'buyer-li',
        displayName: 'Li Ming Family Office',
        role: 'BUYER',
        entityType: 'FAMILY_OFFICE',
        region: 'Shanghai',
        kycStatus: 'IN_REVIEW',
        qualified: false,
        aumLabel: '$35M',
        sourceOfFunds: 'Family office capital',
      },
      {
        id: 'seller-bd-01',
        displayName: 'Verified Seller BD-01',
        role: 'SELLER',
        entityType: 'INDIVIDUAL',
        region: 'Beijing',
        kycStatus: 'APPROVED',
        qualified: true,
      },
      {
        id: 'seller-bd-02',
        displayName: 'Verified GP Byte Alpha',
        role: 'SELLER',
        entityType: 'GP',
        region: 'Hong Kong',
        kycStatus: 'APPROVED',
        qualified: true,
      },
      {
        id: 'fa-lead-01',
        displayName: 'Lead FA Helen',
        role: 'FA',
        entityType: 'INSTITUTION',
        region: 'Hong Kong',
        kycStatus: 'APPROVED',
        qualified: true,
      },
      {
        id: 'fa-buyer-01',
        displayName: 'Buyer FA Jason',
        role: 'FA',
        entityType: 'INSTITUTION',
        region: 'Singapore',
        kycStatus: 'APPROVED',
        qualified: true,
      },
    ],
    buyerLeads: [
      {
        id: 'lead-1',
        buyerId: 'buyer-citic',
        targetCompany: 'ByteDance',
        preferredShareClass: 'Series H Common',
        targetRaise: '$50M+',
        timeline: 'Immediate',
        accreditedInvestor: true,
        status: 'QUALIFIED',
      },
      {
        id: 'lead-2',
        buyerId: 'buyer-antalpha',
        targetCompany: 'ByteDance',
        preferredShareClass: 'Employee Options',
        targetRaise: '$5M-$20M',
        timeline: '30 days',
        accreditedInvestor: true,
        status: 'CONTACTED',
      },
      {
        id: 'lead-3',
        buyerId: 'buyer-li',
        targetCompany: 'SpaceX',
        preferredShareClass: 'Series I',
        targetRaise: '$1M-$5M',
        timeline: '60 days',
        accreditedInvestor: false,
        status: 'NEW',
      },
    ],
    askOrders: [
      {
        id: 'ask-1',
        sellerId: 'seller-bd-01',
        sellerAlias: 'Seller-BD-01',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'L2',
        shareClass: 'Series H Common',
        quantityLabel: '300k shares',
        remainingQuantityLabel: '180k shares',
        askPriceLabel: '$162 - $168',
        validityLabel: 'Valid for 30 days',
        expiresAt: '2026-05-06',
        reconfirmedAt: '2026-04-16',
        transferRestrictions: 'ROFR review required',
        ownershipStatus: 'VERIFIED',
        privacyLevel: 'PUBLIC_ANONYMOUS',
        status: 'ACTIVE_LISTING',
      },
      {
        id: 'ask-2',
        sellerId: 'seller-bd-02',
        sellerAlias: 'Seller-BD-GP',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'DIRECT',
        shareClass: 'Employee Options',
        quantityLabel: '80k options',
        remainingQuantityLabel: '60k options',
        askPriceLabel: '$138 - $145',
        validityLabel: 'Valid for 14 days',
        expiresAt: '2026-04-28',
        transferRestrictions: 'Issuer consent required',
        ownershipStatus: 'VERIFIED',
        privacyLevel: 'CONTROLLED_DISCLOSURE',
        status: 'MATCHED',
      },
      {
        id: 'ask-3',
        sellerId: 'seller-bd-02',
        sellerAlias: 'Issuer-L1-Spot',
        companyId: 'spacex',
        companyName: 'SpaceX',
        tradeMode: 'L1',
        shareClass: 'Preferred Subscription',
        quantityLabel: '$10M allocation',
        remainingQuantityLabel: '$10M allocation',
        askPriceLabel: 'At issuance terms',
        validityLabel: 'Window closes in 10 days',
        expiresAt: '2026-04-26',
        transferRestrictions: 'Issuer subscription memo',
        ownershipStatus: 'PENDING',
        privacyLevel: 'PUBLIC_ANONYMOUS',
        status: 'TRANSFERABILITY_REVIEW',
      },
    ],
    bidOrders: [
      {
        id: 'bid-1',
        buyerId: 'buyer-citic',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'L2',
        shareClass: 'Series H Common',
        bidPriceLabel: '$165',
        quantityLabel: '250k shares',
        remainingQuantityLabel: '180k shares',
        validUntil: '2026-05-10',
        reconfirmedAt: '2026-04-17',
        accreditedInvestor: true,
        conditions: ['NDA signed', 'Data room access', 'Escrow in HKD'],
        status: 'MATCHED',
      },
      {
        id: 'bid-2',
        buyerId: 'buyer-antalpha',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'DIRECT',
        shareClass: 'Employee Options',
        bidPriceLabel: '$142',
        quantityLabel: '60k options',
        remainingQuantityLabel: '60k options',
        validUntil: '2026-05-01',
        accreditedInvestor: true,
        conditions: ['Issuer approval', 'FA-led negotiation'],
        status: 'NEGOTIATING',
      },
      {
        id: 'bid-3',
        buyerId: 'buyer-li',
        companyId: 'spacex',
        companyName: 'SpaceX',
        tradeMode: 'L1',
        shareClass: 'Preferred Subscription',
        bidPriceLabel: '$2M ticket',
        quantityLabel: '$2M subscription',
        remainingQuantityLabel: '$2M subscription',
        validUntil: '2026-05-15',
        accreditedInvestor: false,
        conditions: ['KYC approval pending'],
        status: 'COMPLIANCE_REVIEW',
      },
    ],
    listingRecords: [
      {
        id: 'listing-1',
        askOrderId: 'ask-1',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'L2',
        shareClass: 'Series H Common',
        priceRangeLabel: '$162 - $168',
        quantityRangeLabel: '200k - 300k shares',
        sellerAlias: 'Seller-BD-01',
        sellerVerification: 'VERIFIED',
        disclosureStage: 'ANONYMOUS',
        activeBidCount: 3,
        activeMatchCount: 1,
        status: 'ACTIVE',
      },
      {
        id: 'listing-2',
        askOrderId: 'ask-2',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        tradeMode: 'DIRECT',
        shareClass: 'Employee Options',
        priceRangeLabel: '$138 - $145',
        quantityRangeLabel: '40k - 80k options',
        sellerAlias: 'Seller-BD-GP',
        sellerVerification: 'VERIFIED',
        disclosureStage: 'NDA_ONLY',
        activeBidCount: 1,
        activeMatchCount: 1,
        status: 'ACTIVE',
      },
    ],
    orderMatches: [
      {
        id: 'match-1',
        bidOrderId: 'bid-1',
        askOrderId: 'ask-1',
        companyName: 'ByteDance',
        tradeMode: 'L2',
        matchScore: 94,
        status: 'READY_FOR_NEGOTIATION',
        leadFaId: 'fa-lead-01',
      },
      {
        id: 'match-2',
        bidOrderId: 'bid-2',
        askOrderId: 'ask-2',
        companyName: 'ByteDance',
        tradeMode: 'DIRECT',
        matchScore: 88,
        status: 'NDA_REQUIRED',
        leadFaId: 'fa-buyer-01',
      },
    ],
    faTeams: [
      {
        id: 'fa-team-1',
        name: 'ByteDance Core Team',
        status: 'ACTIVE',
        members: [
          { faId: 'fa-lead-01', name: 'Helen', role: 'LEAD_FA', commissionRatio: 0.25 },
          { faId: 'fa-buyer-01', name: 'Jason', role: 'BUYER_FA', commissionRatio: 0.22 },
          { faId: 'fa-seller-01', name: 'Ava', role: 'SELLER_FA', commissionRatio: 0.22 },
          { faId: 'fa-neg-01', name: 'Chris', role: 'NEGOTIATOR', commissionRatio: 0.18 },
          { faId: 'fa-exec-01', name: 'Mina', role: 'EXECUTOR', commissionRatio: 0.13 },
        ],
      },
    ],
    dealRecords: [
      {
        id: 'deal-1',
        listingId: 'listing-1',
        bidOrderId: 'bid-1',
        askOrderId: 'ask-1',
        companyName: 'ByteDance',
        tradeMode: 'L2',
        shareClass: 'Series H Common',
        amountLabel: '$41.2M',
        currentStage: 'DILIGENCE',
        disclosureStage: 'NEGOTIATION_SUMMARY',
        loiSigned: true,
        dataRoomReady: true,
        escrowReady: false,
        settlementReady: false,
        leadFaTeamId: 'fa-team-1',
      },
      {
        id: 'deal-2',
        listingId: 'listing-2',
        bidOrderId: 'bid-2',
        askOrderId: 'ask-2',
        companyName: 'ByteDance',
        tradeMode: 'DIRECT',
        shareClass: 'Employee Options',
        amountLabel: '$8.5M',
        currentStage: 'SPA_SIGNED',
        disclosureStage: 'LEGAL_DISCLOSURE',
        loiSigned: true,
        dataRoomReady: true,
        escrowReady: true,
        settlementReady: false,
        leadFaTeamId: 'fa-team-1',
      },
    ],
    faRecommendationLeads: [
      {
        id: 'rec-1',
        faId: 'fa-buyer-01',
        faName: 'Jason',
        prospectName: 'Atlas Family Office',
        prospectCompany: 'Atlas Capital',
        prospectEmail: 'atlas@sample.com',
        targetCompany: 'ByteDance',
        recommendedListingId: 'listing-1',
        tradeMode: 'L2',
        status: 'BOUND_TO_FA',
        rewardEligible: true,
        notes:
          'FA sourced prospect before platform registration and introduced ByteDance L2 block.',
      },
      {
        id: 'rec-2',
        faId: 'fa-lead-01',
        faName: 'Helen',
        prospectName: 'NorthBridge Ventures',
        prospectCompany: 'NorthBridge',
        prospectEmail: 'northbridge@sample.com',
        targetCompany: 'ByteDance',
        recommendedListingId: 'listing-2',
        tradeMode: 'DIRECT',
        status: 'DEAL_LINKED',
        rewardEligible: true,
        notes:
          'Prospect accepted recommendation, completed onboarding, and linked into direct negotiation.',
      },
      {
        id: 'rec-3',
        faId: 'fa-buyer-01',
        faName: 'Jason',
        prospectName: 'Summit PE',
        prospectCompany: 'Summit Partners',
        prospectEmail: 'summit@sample.com',
        targetCompany: 'ByteDance',
        recommendedListingId: 'listing-1',
        tradeMode: 'L2',
        status: 'INTRO_SENT',
        rewardEligible: false,
        notes: 'Still unregistered, waiting for KYC start.',
      },
    ],
    platformMandateAgreements: [
      {
        id: 'agreement-1',
        side: 'BUYER',
        principalName: 'CITIC Hong Kong',
        principalType: 'REGISTERED_BUYER',
        relatedDealId: 'deal-1',
        contractWith: 'PLATFORM',
        agreementType: 'BUYER_MANDATE',
        status: 'SIGNED',
        signedDate: '2026-04-03',
        signingMethod: 'E_SIGN',
        certificationStatus: 'VERIFIED',
      },
      {
        id: 'agreement-2',
        side: 'SELLER',
        principalName: 'Seller-BD-01',
        principalType: 'SELLER',
        relatedDealId: 'deal-1',
        contractWith: 'PLATFORM',
        agreementType: 'SELLER_MANDATE',
        status: 'ACTIVE',
        signedDate: '2026-03-28',
        signingMethod: 'PAPER_WITNESSED',
        witnessType: 'LAWYER',
        witnessLawFirm: 'Han Kun Law Offices',
        certificationStatus: 'VERIFIED',
      },
      {
        id: 'agreement-3',
        side: 'BUYER',
        principalName: 'NorthBridge Ventures',
        principalType: 'UNREGISTERED_PROSPECT',
        relatedDealId: 'deal-2',
        relatedRecommendationId: 'rec-2',
        contractWith: 'PLATFORM',
        agreementType: 'PLATFORM_FEE_AGREEMENT',
        status: 'PENDING_SIGNATURE',
        signedDate: '2026-04-15',
        signingMethod: 'PAPER_WITNESSED',
        witnessType: 'LAWYER',
        witnessLawFirm: 'Maples Asia',
        certificationStatus: 'PENDING',
      },
      {
        id: 'agreement-4',
        side: 'SELLER',
        principalName: 'Seller-BD-GP',
        principalType: 'GP',
        relatedDealId: 'deal-2',
        contractWith: 'PLATFORM',
        agreementType: 'SELLER_MANDATE',
        status: 'SIGNED',
        signedDate: '2026-04-11',
        signingMethod: 'E_SIGN',
        certificationStatus: 'VERIFIED',
      },
    ],
    referralRewardRecords: [
      {
        id: 'reward-1',
        recommendationId: 'rec-2',
        faId: 'fa-lead-01',
        relatedDealId: 'deal-2',
        trigger: 'SETTLEMENT_COMPLETE',
        rewardType: 'FA_RECOMMENDATION_BONUS',
        amountLabel: '$96K',
        status: 'PENDING',
      },
      {
        id: 'reward-2',
        recommendationId: 'rec-1',
        faId: 'fa-buyer-01',
        relatedDealId: 'deal-1',
        trigger: 'DEAL_SIGNED',
        rewardType: 'FA_RECOMMENDATION_BONUS',
        amountLabel: '$140K',
        status: 'APPROVED',
      },
    ],
    faOnboardingApplications: [
      {
        id: 'fa-app-1',
        faId: 'fa-lead-01',
        legalName: 'Helen Advisory Limited',
        region: 'Hong Kong',
        qualificationDocsReady: true,
        bankVerified: true,
        trainingCompleted: false,
        serviceAgreementSigned: true,
        status: 'TRAINING_PENDING',
      },
      {
        id: 'fa-app-2',
        faId: 'fa-buyer-01',
        legalName: 'Jason Capital Partners',
        region: 'Singapore',
        qualificationDocsReady: true,
        bankVerified: false,
        trainingCompleted: false,
        serviceAgreementSigned: true,
        status: 'BANK_PENDING',
      },
    ],
    companyRules: [
      {
        id: 'rule-1',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        rofrRequired: true,
        boardApprovalRequired: true,
        transferWindow: 'Quarter-end transfer window',
        eligibleInvestorType: 'Accredited institutional or qualified family office',
        sellerPrivacyGuard: 'STRICT',
      },
      {
        id: 'rule-2',
        companyId: 'spacex',
        companyName: 'SpaceX',
        rofrRequired: false,
        boardApprovalRequired: true,
        transferWindow: 'Issuer memo allocation cycle',
        eligibleInvestorType: 'Qualified placement investor',
        sellerPrivacyGuard: 'CONTROLLED',
      },
    ],
    marketSignals: [
      {
        id: 'signal-1',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        referencePriceLabel: '$164 reference',
        lastTradeLabel: '$163.5 matched last week',
        bidCount: 4,
        askCount: 2,
        momentum: 'UP',
      },
      {
        id: 'signal-2',
        companyId: 'spacex',
        companyName: 'SpaceX',
        referencePriceLabel: '$2M min ticket',
        lastTradeLabel: 'No recent public match',
        bidCount: 1,
        askCount: 1,
        momentum: 'STABLE',
      },
    ],
    orderBookEntries: [
      {
        id: 'book-1',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        side: 'BID',
        tradeMode: 'L2',
        priceLabel: '$165',
        quantityLabel: '250k shares',
        visibility: 'PUBLIC',
        status: 'ACTIVE',
      },
      {
        id: 'book-2',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        side: 'ASK',
        tradeMode: 'L2',
        priceLabel: '$166',
        quantityLabel: '200k shares',
        visibility: 'PUBLIC',
        status: 'EXPIRING_SOON',
      },
      {
        id: 'book-3',
        companyId: 'bytedance',
        companyName: 'ByteDance',
        side: 'ASK',
        tradeMode: 'DIRECT',
        priceLabel: '$142',
        quantityLabel: '60k options',
        visibility: 'NDA_ONLY',
        status: 'ACTIVE',
      },
    ],
    negotiationRecords: [
      {
        id: 'neg-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        channel: 'MEETING',
        summary: 'Lead FA confirmed diligence package and narrowed price band to $164-$165.',
        priceSnapshotLabel: '$164.5 midpoint',
        owner: 'Helen',
        status: 'LOCKED',
      },
      {
        id: 'neg-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        channel: 'COUNTER_OFFER',
        summary: 'Buyer requested revised vesting treatment before SPA signature.',
        priceSnapshotLabel: '$142 direct option block',
        owner: 'Jason',
        status: 'OPEN',
      },
    ],
    transferApprovals: [
      {
        id: 'approval-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        approvalType: 'ROFR',
        owner: 'Platform legal',
        status: 'ROFR_WINDOW',
      },
      {
        id: 'approval-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        approvalType: 'ISSUER_CONSENT',
        owner: 'Issuer liaison',
        status: 'ISSUER_REVIEW',
      },
    ],
    escrowRecords: [
      {
        id: 'escrow-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        accountLabel: 'HSBC escrow / HKD',
        amountLabel: '$41.2M',
        status: 'AWAITING_FUNDS',
        paymentProofReady: false,
      },
      {
        id: 'escrow-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        accountLabel: 'DBS escrow / SGD',
        amountLabel: '$8.5M',
        status: 'FUNDED',
        paymentProofReady: true,
      },
    ],
    dashboardTasks: [
      {
        id: 'task-1',
        companyName: 'ByteDance',
        owner: 'Ops',
        title: 'Finish seller ownership evidence review',
        dueLabel: 'Today',
        status: 'OPEN',
        relatedEntity: 'ASK',
      },
      {
        id: 'task-2',
        companyName: 'ByteDance',
        owner: 'Legal',
        title: 'Open ROFR notice package for deal-1',
        dueLabel: 'Tomorrow',
        status: 'IN_PROGRESS',
        relatedEntity: 'APPROVAL',
      },
      {
        id: 'task-3',
        companyName: 'ByteDance',
        owner: 'Finance',
        title: 'Verify incoming escrow wire for deal-1',
        dueLabel: 'This week',
        status: 'OPEN',
        relatedEntity: 'ESCROW',
      },
    ],
    documentReviewRecords: [
      {
        id: 'doc-1',
        entityType: 'BUYER_KYC',
        entityId: 'bid-3',
        companyName: 'SpaceX',
        owner: 'Compliance',
        requiredDocuments: ['Accredited investor proof', 'Source of funds memo', 'Bank account letter'],
        missingDocuments: ['Accredited investor proof'],
        status: 'NEEDS_MORE_INFO',
        lastUpdated: '2026-04-18',
      },
      {
        id: 'doc-2',
        entityType: 'ASK_OWNERSHIP',
        entityId: 'ask-1',
        companyName: 'ByteDance',
        owner: 'Platform legal',
        requiredDocuments: ['Stock certificate', 'Transfer restriction memo', 'Seller identity pack'],
        missingDocuments: [],
        status: 'APPROVED',
        lastUpdated: '2026-04-16',
      },
      {
        id: 'doc-3',
        entityType: 'DEAL_LEGAL',
        entityId: 'deal-1',
        companyName: 'ByteDance',
        owner: 'External counsel',
        requiredDocuments: ['SPA execution package', 'ROFR notice', 'Escrow instruction letter'],
        missingDocuments: ['Escrow instruction letter'],
        status: 'PENDING',
        lastUpdated: '2026-04-18',
      },
    ],
    sellerDisclosureRecords: [
      {
        id: 'disclosure-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        stage: 'NEGOTIATION_SUMMARY',
        accessRole: 'BUYER',
        requestReason: 'Buyer requested cap table and seller employment status summary.',
        approvedBy: 'Platform legal',
        status: 'APPROVED',
        auditNote: 'Buyer can see redacted cap table only until SPA execution.',
      },
      {
        id: 'disclosure-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        stage: 'LEGAL_DISCLOSURE',
        accessRole: 'LEGAL',
        requestReason: 'Counsel needs full seller identity pack to verify transfer package.',
        approvedBy: 'General counsel',
        status: 'RELEASED',
        auditNote: 'Full seller identity released to approved legal team only.',
      },
    ],
    settlementStatements: [
      {
        id: 'statement-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        sellerAlias: 'Seller-BD-01',
        grossAmountLabel: '$41.2M',
        platformFeeLabel: '$824K',
        legalFeeLabel: '$90K',
        netProceedsLabel: '$40.286M',
        status: 'ISSUED',
      },
      {
        id: 'statement-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        sellerAlias: 'Seller-BD-GP',
        grossAmountLabel: '$8.5M',
        platformFeeLabel: '$170K',
        legalFeeLabel: '$35K',
        netProceedsLabel: '$8.295M',
        status: 'CONFIRMED',
      },
    ],
    sellerPayoutRecords: [
      {
        id: 'payout-1',
        statementId: 'statement-1',
        dealId: 'deal-1',
        companyName: 'ByteDance',
        sellerAlias: 'Seller-BD-01',
        destinationLabel: 'HSBC seller settlement account',
        amountLabel: '$40.286M',
        status: 'READY_TO_PAY',
        payoutEvidenceReady: false,
      },
      {
        id: 'payout-2',
        statementId: 'statement-2',
        dealId: 'deal-2',
        companyName: 'ByteDance',
        sellerAlias: 'Seller-BD-GP',
        destinationLabel: 'DBS GP distribution account',
        amountLabel: '$8.295M',
        status: 'PAID',
        payoutEvidenceReady: true,
      },
    ],
  };
}

function mergeSeedById<T extends { id: string }>(items: T[] | undefined, seedItems: T[]) {
  if (!Array.isArray(items)) {
    return seedItems;
  }

  const seedMap = new Map(seedItems.map((item) => [item.id, item]));
  return items.map((item) => ({ ...(seedMap.get(item.id) ?? {}), ...item })) as T[];
}

export function normalizeTradingWorkspace(workspace: Partial<TradingWorkspace>): TradingWorkspace {
  const seed = createSeedTradingWorkspace();

  return {
    participants: mergeSeedById(workspace.participants, seed.participants),
    buyerLeads: mergeSeedById(workspace.buyerLeads, seed.buyerLeads),
    askOrders: mergeSeedById(workspace.askOrders, seed.askOrders),
    bidOrders: mergeSeedById(workspace.bidOrders, seed.bidOrders),
    listingRecords: mergeSeedById(workspace.listingRecords, seed.listingRecords),
    orderMatches: mergeSeedById(workspace.orderMatches, seed.orderMatches),
    faTeams: mergeSeedById(workspace.faTeams, seed.faTeams),
    dealRecords: mergeSeedById(workspace.dealRecords, seed.dealRecords),
    faRecommendationLeads: mergeSeedById(
      workspace.faRecommendationLeads,
      seed.faRecommendationLeads,
    ),
    platformMandateAgreements: mergeSeedById(
      workspace.platformMandateAgreements,
      seed.platformMandateAgreements,
    ),
    referralRewardRecords: mergeSeedById(
      workspace.referralRewardRecords,
      seed.referralRewardRecords,
    ),
    faOnboardingApplications: mergeSeedById(
      workspace.faOnboardingApplications,
      seed.faOnboardingApplications,
    ),
    companyRules: mergeSeedById(workspace.companyRules, seed.companyRules),
    marketSignals: mergeSeedById(workspace.marketSignals, seed.marketSignals),
    orderBookEntries: mergeSeedById(workspace.orderBookEntries, seed.orderBookEntries),
    negotiationRecords: mergeSeedById(workspace.negotiationRecords, seed.negotiationRecords),
    transferApprovals: mergeSeedById(workspace.transferApprovals, seed.transferApprovals),
    escrowRecords: mergeSeedById(workspace.escrowRecords, seed.escrowRecords),
    dashboardTasks: mergeSeedById(workspace.dashboardTasks, seed.dashboardTasks),
    documentReviewRecords: mergeSeedById(
      workspace.documentReviewRecords,
      seed.documentReviewRecords,
    ),
    sellerDisclosureRecords: mergeSeedById(
      workspace.sellerDisclosureRecords,
      seed.sellerDisclosureRecords,
    ),
    settlementStatements: mergeSeedById(
      workspace.settlementStatements,
      seed.settlementStatements,
    ),
    sellerPayoutRecords: mergeSeedById(
      workspace.sellerPayoutRecords,
      seed.sellerPayoutRecords,
    ),
  };
}

export function getParticipantById(workspace: TradingWorkspace = seedTradingWorkspace, id: string) {
  return workspace.participants.find((participant) => participant.id === id);
}

export function getActiveListings(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.listingRecords.filter((listing) => listing.status === 'ACTIVE');
}

export function getMarketplaceCompanies(workspace: TradingWorkspace = seedTradingWorkspace) {
  return Array.from(new Set(getActiveListings(workspace).map((listing) => listing.companyName))).map(
    (companyName) => ({
      companyName,
      listings: getActiveListings(workspace).filter((listing) => listing.companyName === companyName),
      activeDeals: workspace.dealRecords.filter((deal) => deal.companyName === companyName).length,
    }),
  );
}

export function getBidRegistry(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.bidOrders.map((bid) => ({
    ...bid,
    buyer: getParticipantById(workspace, bid.buyerId),
  }));
}

export function getAskRegistry(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.askOrders.map((ask) => ({
    ...ask,
    seller: getParticipantById(workspace, ask.sellerId),
  }));
}

export function getPipelineCounts(workspace: TradingWorkspace = seedTradingWorkspace) {
  return dealStages.map((stage) => ({
    stage,
    count: workspace.dealRecords.filter((deal) => deal.currentStage === stage).length,
  }));
}

export function getFARecommendationQueue(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.faRecommendationLeads.map((lead) => ({
    ...lead,
    listing: workspace.listingRecords.find((listing) => listing.id === lead.recommendedListingId) || null,
  }));
}

export function getPlatformAgreementBoard(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.platformMandateAgreements.map((agreement) => ({
    ...agreement,
    deal: agreement.relatedDealId
      ? workspace.dealRecords.find((deal) => deal.id === agreement.relatedDealId) || null
      : null,
  }));
}

export function getReferralRewards(workspace: TradingWorkspace = seedTradingWorkspace) {
  return workspace.referralRewardRecords.map((reward) => ({
    ...reward,
    recommendation:
      workspace.faRecommendationLeads.find((lead) => lead.id === reward.recommendationId) || null,
    deal: workspace.dealRecords.find((deal) => deal.id === reward.relatedDealId) || null,
  }));
}

export function getTradeModeLabel(mode: TradeMode) {
  switch (mode) {
    case 'L1':
      return 'L1 Primary';
    case 'L2':
      return 'L2 Anonymous';
    case 'DIRECT':
      return 'Direct Trade';
  }
}

export function getDisclosureStageLabel(stage: DisclosureStage) {
  switch (stage) {
    case 'ANONYMOUS':
      return 'Anonymous';
    case 'NDA_ONLY':
      return 'NDA gated';
    case 'NEGOTIATION_SUMMARY':
      return 'Negotiation summary';
    case 'LEGAL_DISCLOSURE':
      return 'Legal disclosure';
  }
}

export function getDealStageLabel(stage: DealStage) {
  switch (stage) {
    case 'LISTED':
      return 'Listed';
    case 'NEGOTIATING':
      return 'Negotiating';
    case 'LOI_SIGNED':
      return 'LOI signed';
    case 'DILIGENCE':
      return 'Diligence';
    case 'SPA_SIGNED':
      return 'SPA signed';
    case 'ESCROW_FUNDED':
      return 'Escrow funded';
    case 'TRANSFER_IN_PROGRESS':
      return 'Transfer in progress';
    case 'SETTLEMENT_PENDING':
      return 'Settlement pending';
    case 'COMPLETED':
      return 'Completed';
  }
}

export function getVerificationBadgeColor(status: VerificationStatus) {
  switch (status) {
    case 'VERIFIED':
      return 'bg-green-100 text-green-700';
    case 'NEEDS_MORE_INFO':
      return 'bg-yellow-100 text-yellow-700';
    case 'PENDING':
    default:
      return 'bg-slate-100 text-slate-700';
  }
}
