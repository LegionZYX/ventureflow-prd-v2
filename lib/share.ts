import { ShareRecord, Referral, PublicDeal, Company, mockPublicDeals } from './mockData';
import {
  loadShareRecords,
  saveShareRecords,
  loadReferrals,
  saveReferrals,
  loadPublicDeals,
  savePublicDeals,
  saveCompanies
} from './storage';

/** 生成随机分享 ID（8位字符） */
export function generateShareId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/** 获取分享链接 URL */
export function getShareUrl(shareId: string): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/share/${shareId}`;
}

/** 创建分享记录 */
export function createShareRecord(dealId: string, sharerName: string): ShareRecord {
  const records = loadShareRecords();
  const newRecord: ShareRecord = {
    id: generateShareId(),
    dealId,
    sharerName,
    createdAt: new Date().toISOString(),
    clickCount: 0,
    conversionCount: 0,
  };
  records.push(newRecord);
  saveShareRecords(records);
  return newRecord;
}

/** 根据 shareId 获取分享记录 */
export function getShareRecord(shareId: string): ShareRecord | null {
  const records = loadShareRecords();
  return records.find(r => r.id === shareId) || null;
}

/** 更新分享记录的点击次数 */
export function incrementShareClickCount(shareId: string): void {
  const records = loadShareRecords();
  const index = records.findIndex(r => r.id === shareId);
  if (index !== -1) {
    records[index].clickCount += 1;
    saveShareRecords(records);
  }
}

/** 更新分享记录的转化次数 */
export function incrementShareConversionCount(shareId: string): void {
  const records = loadShareRecords();
  const index = records.findIndex(r => r.id === shareId);
  if (index !== -1) {
    records[index].conversionCount += 1;
    saveShareRecords(records);
  }
}

/** 根据 dealId 获取 Deal */
export function getDealById(dealId: string): PublicDeal | null {
  const deals = loadPublicDeals();
  // 如果 localStorage 为空，使用 mock 数据
  const allDeals = deals.length > 0 ? deals : mockPublicDeals;
  return allDeals.find(d => d.id === dealId) || null;
}

/** 根据 companyId 获取该公司下的所有 Deals */
export function getDealsByCompanyId(companyId: string): PublicDeal[] {
  const deals = loadPublicDeals();
  // 如果 localStorage 为空，使用 mock 数据
  const allDeals = deals.length > 0 ? deals : mockPublicDeals;
  return allDeals.filter(d => d.companyId === companyId);
}

/** 创建推荐关系 */
export function createReferral(shareId: string, referredName: string, referredEmail: string, dealId: string): Referral {
  const referrals = loadReferrals();
  const newReferral: Referral = {
    id: generateShareId(),
    shareId,
    referredName,
    referredEmail,
    dealId,
    kycCompleted: false,
    agreementSigned: false,
    createdAt: new Date().toISOString(),
  };
  referrals.push(newReferral);
  saveReferrals(referrals);
  return newReferral;
}

/** 根据 shareId 获取推荐关系 */
export function getReferralByShareId(shareId: string): Referral | null {
  const referrals = loadReferrals();
  return referrals.find(r => r.shareId === shareId) || null;
}

/** 更新推荐关系（标记 KYC 完成） */
export function updateReferralKyc(referralId: string): void {
  const referrals = loadReferrals();
  const index = referrals.findIndex(r => r.id === referralId);
  if (index !== -1) {
    referrals[index].kycCompleted = true;
    saveReferrals(referrals);
  }
}

/** 更新推荐关系（标记 Agreement 签署） */
export function updateReferralAgreement(referralId: string): void {
  const referrals = loadReferrals();
  const index = referrals.findIndex(r => r.id === referralId);
  if (index !== -1) {
    referrals[index].agreementSigned = true;
    // 如果两个都完成了，记录完成时间
    if (referrals[index].kycCompleted && !referrals[index].completedAt) {
      referrals[index].completedAt = new Date().toISOString();
    }
    saveReferrals(referrals);
  }
}

/** 初始化默认数据到 LocalStorage（用于首次访问） */
export function initializeDefaultData(companies?: Company[], deals?: PublicDeal[]): void {
  // 如果提供了数据，且 localStorage 为空，则初始化
  if (companies && localStorage.getItem('vf_companies') === null) {
    saveCompanies(companies);
  }
  if (deals && localStorage.getItem('vf_public_deals') === null) {
    savePublicDeals(deals);
  }
}
