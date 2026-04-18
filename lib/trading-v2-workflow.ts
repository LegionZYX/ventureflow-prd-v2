import type {
  FARecommendationLead,
  PlatformMandateAgreement,
  ReferralRewardRecord,
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

export function advanceRecommendationStatus(
  lead: FARecommendationLead,
): FARecommendationLead {
  const index = recommendationFlow.indexOf(lead.status);
  const nextStatus =
    index >= 0 && index < recommendationFlow.length - 1
      ? recommendationFlow[index + 1]
      : lead.status;

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
  const index = agreementFlow.indexOf(agreement.status);
  const nextStatus =
    index >= 0 && index < agreementFlow.length - 1
      ? agreementFlow[index + 1]
      : agreement.status;

  return {
    ...agreement,
    status: nextStatus,
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
  const index = rewardFlow.indexOf(reward.status);
  const nextStatus =
    index >= 0 && index < rewardFlow.length - 1 ? rewardFlow[index + 1] : reward.status;

  return {
    ...reward,
    status: nextStatus,
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
