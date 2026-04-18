import type {
  DealRecord,
  EscrowRecord,
  FAOnboardingApplication,
  FARecommendationLead,
  PlatformMandateAgreement,
  ReferralRewardRecord,
  TransferApproval,
} from '@/lib/trading-v2';

const recommendationFlow: FARecommendationLead['status'][] = [
  'PROSPECTED',
  'INTRO_SENT',
  'BOUND_TO_FA',
  'KYC_STARTED',
  'REGISTERED',
  'DEAL_LINKED',
];

const agreementFlow: PlatformMandateAgreement['status'][] = [
  'DRAFT',
  'PENDING_SIGNATURE',
  'SIGNED',
  'ACTIVE',
  'COMPLETED',
];

const rewardFlow: ReferralRewardRecord['status'][] = ['PENDING', 'APPROVED', 'PAID'];
const faOnboardingFlow: FAOnboardingApplication['status'][] = [
  'SUBMITTED',
  'QUALIFICATION_REVIEW',
  'BANK_PENDING',
  'TRAINING_PENDING',
  'ACTIVE',
];
const transferApprovalFlow: TransferApproval['status'][] = [
  'PENDING',
  'ISSUER_REVIEW',
  'ROFR_WINDOW',
  'APPROVED',
];
const escrowFlow: EscrowRecord['status'][] = [
  'DRAFT',
  'AWAITING_FUNDS',
  'FUNDED',
  'FROZEN',
  'RELEASED',
];
const dealFlow: DealRecord['currentStage'][] = [
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

function getNextValue<T>(flow: T[], current: T): T {
  const index = flow.indexOf(current);
  return index >= 0 && index < flow.length - 1 ? flow[index + 1] : current;
}

export function advanceRecommendationStatus(lead: FARecommendationLead): FARecommendationLead {
  const nextStatus = getNextValue(recommendationFlow, lead.status);

  return {
    ...lead,
    status: nextStatus,
    rewardEligible:
      nextStatus === 'BOUND_TO_FA' ||
      nextStatus === 'KYC_STARTED' ||
      nextStatus === 'REGISTERED' ||
      nextStatus === 'DEAL_LINKED',
  };
}

export function getRecommendationActionLabel(status: FARecommendationLead['status']) {
  switch (status) {
    case 'PROSPECTED':
      return 'Send Intro';
    case 'INTRO_SENT':
      return 'Bind to FA';
    case 'BOUND_TO_FA':
      return 'Start KYC';
    case 'KYC_STARTED':
      return 'Mark Registered';
    case 'REGISTERED':
      return 'Link to Deal';
    case 'DEAL_LINKED':
    default:
      return 'Completed';
  }
}

export function canAdvanceRecommendation(status: FARecommendationLead['status']) {
  return status !== 'DEAL_LINKED';
}

export function advanceAgreementStatus(
  agreement: PlatformMandateAgreement,
): PlatformMandateAgreement {
  return {
    ...agreement,
    status: getNextValue(agreementFlow, agreement.status),
  };
}

export function getAgreementActionLabel(status: PlatformMandateAgreement['status']) {
  switch (status) {
    case 'DRAFT':
      return 'Send for Signature';
    case 'PENDING_SIGNATURE':
      return 'Mark Signed';
    case 'SIGNED':
      return 'Activate';
    case 'ACTIVE':
      return 'Complete';
    case 'COMPLETED':
    default:
      return 'Completed';
  }
}

export function canAdvanceAgreement(status: PlatformMandateAgreement['status']) {
  return status !== 'COMPLETED';
}

export function advanceRewardStatus(reward: ReferralRewardRecord): ReferralRewardRecord {
  return {
    ...reward,
    status: getNextValue(rewardFlow, reward.status),
  };
}

export function getRewardActionLabel(status: ReferralRewardRecord['status']) {
  switch (status) {
    case 'PENDING':
      return 'Approve';
    case 'APPROVED':
      return 'Mark Paid';
    case 'PAID':
    default:
      return 'Paid';
  }
}

export function canAdvanceReward(status: ReferralRewardRecord['status']) {
  return status !== 'PAID';
}

export function advanceFAOnboardingStatus(
  application: FAOnboardingApplication,
): FAOnboardingApplication {
  const nextStatus = getNextValue(faOnboardingFlow, application.status);

  return {
    ...application,
    status: nextStatus,
    qualificationDocsReady: application.qualificationDocsReady || nextStatus !== 'SUBMITTED',
    bankVerified: application.bankVerified || nextStatus === 'TRAINING_PENDING' || nextStatus === 'ACTIVE',
    trainingCompleted: application.trainingCompleted || nextStatus === 'ACTIVE',
  };
}

export function getFAOnboardingActionLabel(status: FAOnboardingApplication['status']) {
  switch (status) {
    case 'SUBMITTED':
      return 'Review Qualification';
    case 'QUALIFICATION_REVIEW':
      return 'Verify Bank';
    case 'BANK_PENDING':
      return 'Complete Training';
    case 'TRAINING_PENDING':
      return 'Activate';
    case 'ACTIVE':
    default:
      return 'Active';
  }
}

export function canAdvanceFAOnboarding(status: FAOnboardingApplication['status']) {
  return status !== 'ACTIVE';
}

export function advanceTransferApprovalStatus(approval: TransferApproval): TransferApproval {
  return {
    ...approval,
    status: getNextValue(transferApprovalFlow, approval.status),
  };
}

export function getTransferApprovalActionLabel(status: TransferApproval['status']) {
  switch (status) {
    case 'PENDING':
      return 'Start Issuer Review';
    case 'ISSUER_REVIEW':
      return 'Open ROFR Window';
    case 'ROFR_WINDOW':
      return 'Mark Approved';
    case 'APPROVED':
    case 'REJECTED':
    default:
      return 'Completed';
  }
}

export function canAdvanceTransferApproval(status: TransferApproval['status']) {
  return status !== 'APPROVED' && status !== 'REJECTED';
}

export function advanceEscrowStatus(record: EscrowRecord): EscrowRecord {
  const nextStatus = getNextValue(escrowFlow, record.status);

  return {
    ...record,
    status: nextStatus,
    paymentProofReady:
      record.paymentProofReady ||
      nextStatus === 'FUNDED' ||
      nextStatus === 'FROZEN' ||
      nextStatus === 'RELEASED',
  };
}

export function getEscrowActionLabel(status: EscrowRecord['status']) {
  switch (status) {
    case 'DRAFT':
      return 'Send Wire Instructions';
    case 'AWAITING_FUNDS':
      return 'Mark Funded';
    case 'FUNDED':
      return 'Freeze Escrow';
    case 'FROZEN':
      return 'Release Funds';
    case 'RELEASED':
    default:
      return 'Released';
  }
}

export function canAdvanceEscrow(status: EscrowRecord['status']) {
  return status !== 'RELEASED';
}

export function advanceDealStage(deal: DealRecord): DealRecord {
  const nextStage = getNextValue(dealFlow, deal.currentStage);

  return {
    ...deal,
    currentStage: nextStage,
    loiSigned: deal.loiSigned || nextStage !== 'LISTED' && nextStage !== 'NEGOTIATING',
    dataRoomReady:
      deal.dataRoomReady ||
      nextStage === 'DILIGENCE' ||
      nextStage === 'SPA_SIGNED' ||
      nextStage === 'ESCROW_FUNDED' ||
      nextStage === 'TRANSFER_IN_PROGRESS' ||
      nextStage === 'SETTLEMENT_PENDING' ||
      nextStage === 'COMPLETED',
    escrowReady:
      deal.escrowReady ||
      nextStage === 'ESCROW_FUNDED' ||
      nextStage === 'TRANSFER_IN_PROGRESS' ||
      nextStage === 'SETTLEMENT_PENDING' ||
      nextStage === 'COMPLETED',
    settlementReady:
      deal.settlementReady || nextStage === 'SETTLEMENT_PENDING' || nextStage === 'COMPLETED',
  };
}

export function getDealActionLabel(stage: DealRecord['currentStage']) {
  switch (stage) {
    case 'LISTED':
      return 'Start Negotiation';
    case 'NEGOTIATING':
      return 'Mark LOI Signed';
    case 'LOI_SIGNED':
      return 'Enter Diligence';
    case 'DILIGENCE':
      return 'Mark SPA Signed';
    case 'SPA_SIGNED':
      return 'Fund Escrow';
    case 'ESCROW_FUNDED':
      return 'Start Transfer';
    case 'TRANSFER_IN_PROGRESS':
      return 'Prepare Settlement';
    case 'SETTLEMENT_PENDING':
      return 'Close Deal';
    case 'COMPLETED':
    default:
      return 'Completed';
  }
}

export function canAdvanceDeal(stage: DealRecord['currentStage']) {
  return stage !== 'COMPLETED';
}
