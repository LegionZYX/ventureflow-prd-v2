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
  | 'EXPIRED';
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
export type MatchStatus = 'NEW' | 'REVIEWING' | 'NDA_REQUIRED' | 'READY_FOR_NEGOTIATION' | 'CONVERTED';
export type DealStage =
  | '已上架'
  | '洽谈中'
  | 'LOI 已签署'
  | '尽调中'
  | '协议已签署'
  | '资金托管中'
  | '股权交割中'
  | '待结算'
  | '已完成';
export type DisclosureStage = 'ANONYMOUS' | 'NDA_ONLY' | 'NEGOTIATION_SUMMARY' | 'LEGAL_DISCLOSURE';

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
  askPriceLabel: string;
  validityLabel: string;
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
  validUntil: string;
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
  status: 'PROSPECTED' | 'INTRO_SENT' | 'BOUND_TO_FA' | 'KYC_STARTED' | 'REGISTERED' | 'DEAL_LINKED';
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

export const participants: ParticipantProfile[] = [
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
];

export const buyerLeads: BuyerLead[] = [
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
];

export const askOrders: AskOrder[] = [
  {
    id: 'ask-1',
    sellerId: 'seller-bd-01',
    sellerAlias: 'Seller-BD-01',
    companyId: 'bytedance',
    companyName: 'ByteDance',
    tradeMode: 'L2',
    shareClass: 'Series H Common',
    quantityLabel: '300k shares',
    askPriceLabel: '$162 - $168',
    validityLabel: 'Valid for 30 days',
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
    askPriceLabel: '$138 - $145',
    validityLabel: 'Valid for 14 days',
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
    askPriceLabel: 'At issuance terms',
    validityLabel: 'Window closes in 10 days',
    transferRestrictions: 'Issuer subscription memo',
    ownershipStatus: 'PENDING',
    privacyLevel: 'PUBLIC_ANONYMOUS',
    status: 'TRANSFERABILITY_REVIEW',
  },
];

export const bidOrders: BidOrder[] = [
  {
    id: 'bid-1',
    buyerId: 'buyer-citic',
    companyId: 'bytedance',
    companyName: 'ByteDance',
    tradeMode: 'L2',
    shareClass: 'Series H Common',
    bidPriceLabel: '$165',
    quantityLabel: '250k shares',
    validUntil: '2026-05-10',
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
    validUntil: '2026-05-15',
    accreditedInvestor: false,
    conditions: ['KYC approval pending'],
    status: 'COMPLIANCE_REVIEW',
  },
];

export const listingRecords: ListingRecord[] = [
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
];

export const orderMatches: OrderMatch[] = [
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
];

export const faTeams: FATeam[] = [
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
];

export const faRecommendationLeads: FARecommendationLead[] = [
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
    notes: 'FA sourced prospect before platform registration and introduced ByteDance L2 block.',
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
    notes: 'Prospect accepted recommendation, completed onboarding, and linked into direct negotiation.',
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
];

export const dealRecords: DealRecord[] = [
  {
    id: 'deal-1',
    listingId: 'listing-1',
    bidOrderId: 'bid-1',
    askOrderId: 'ask-1',
    companyName: 'ByteDance',
    tradeMode: 'L2',
    shareClass: 'Series H Common',
    amountLabel: '$41.2M',
    currentStage: '尽调中',
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
    currentStage: '协议已签署',
    disclosureStage: 'LEGAL_DISCLOSURE',
    loiSigned: true,
    dataRoomReady: true,
    escrowReady: true,
    settlementReady: false,
    leadFaTeamId: 'fa-team-1',
  },
];

export const platformMandateAgreements: PlatformMandateAgreement[] = [
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
  },
];

export const referralRewardRecords: ReferralRewardRecord[] = [
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
];

export const dealStages: DealStage[] = [
  '已上架',
  '洽谈中',
  'LOI 已签署',
  '尽调中',
  '协议已签署',
  '资金托管中',
  '股权交割中',
  '待结算',
  '已完成',
];

export function getParticipantById(id: string) {
  return participants.find((participant) => participant.id === id);
}

export function getActiveListings() {
  return listingRecords.filter((listing) => listing.status === 'ACTIVE');
}

export function getMarketplaceCompanies() {
  return Array.from(
    new Set(getActiveListings().map((listing) => listing.companyName)),
  ).map((companyName) => ({
    companyName,
    listings: getActiveListings().filter((listing) => listing.companyName === companyName),
    activeDeals: dealRecords.filter((deal) => deal.companyName === companyName).length,
  }));
}

export function getBidRegistry() {
  return bidOrders.map((bid) => ({
    ...bid,
    buyer: getParticipantById(bid.buyerId),
  }));
}

export function getAskRegistry() {
  return askOrders.map((ask) => ({
    ...ask,
    seller: getParticipantById(ask.sellerId),
  }));
}

export function getPipelineCounts() {
  return dealStages.map((stage) => ({
    stage,
    count: dealRecords.filter((deal) => deal.currentStage === stage).length,
  }));
}

export function getFARecommendationQueue() {
  return faRecommendationLeads.map((lead) => ({
    ...lead,
    listing: listingRecords.find((listing) => listing.id === lead.recommendedListingId) || null,
  }));
}

export function getPlatformAgreementBoard() {
  return platformMandateAgreements.map((agreement) => ({
    ...agreement,
    deal: agreement.relatedDealId
      ? dealRecords.find((deal) => deal.id === agreement.relatedDealId) || null
      : null,
  }));
}

export function getReferralRewards() {
  return referralRewardRecords.map((reward) => ({
    ...reward,
    recommendation:
      faRecommendationLeads.find((lead) => lead.id === reward.recommendationId) || null,
    deal: dealRecords.find((deal) => deal.id === reward.relatedDealId) || null,
  }));
}

export function getTradeModeLabel(mode: TradeMode) {
  switch (mode) {
    case 'L1':
      return 'L1 一级认购';
    case 'L2':
      return 'L2 匿名撮合';
    case 'DIRECT':
      return 'Direct 定向交易';
  }
}

export function getDisclosureStageLabel(stage: DisclosureStage) {
  switch (stage) {
    case 'ANONYMOUS':
      return '匿名展示';
    case 'NDA_ONLY':
      return 'NDA 后披露';
    case 'NEGOTIATION_SUMMARY':
      return '谈判摘要披露';
    case 'LEGAL_DISCLOSURE':
      return '法务必要披露';
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
