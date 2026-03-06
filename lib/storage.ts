import { Buyer, Asset, Deal, Agreement, Company, PublicDeal, ShareRecord, Referral } from './mockData';

const STORAGE_KEYS = {
  BUYERS: 'vf_buyers',
  ASSETS: 'vf_assets',
  DEALS: 'vf_deals',
  AGREEMENTS: 'vf_agreements',
  // 新增 key
  COMPANIES: 'vf_companies',
  PUBLIC_DEALS: 'vf_public_deals',
  SHARE_RECORDS: 'vf_share_records',
  REFERRALS: 'vf_referrals',
};

export function loadData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data);
  } catch {
    return defaultValue;
  }
}

export function saveData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadBuyers(): Buyer[] {
  return loadData<Buyer[]>(STORAGE_KEYS.BUYERS, []);
}

export function saveBuyers(buyers: Buyer[]): void {
  saveData(STORAGE_KEYS.BUYERS, buyers);
}

export function loadAssets(): Asset[] {
  return loadData<Asset[]>(STORAGE_KEYS.ASSETS, []);
}

export function saveAssets(assets: Asset[]): void {
  saveData(STORAGE_KEYS.ASSETS, assets);
}

export function loadDeals(): Deal[] {
  return loadData<Deal[]>(STORAGE_KEYS.DEALS, []);
}

export function saveDeals(deals: Deal[]): void {
  saveData(STORAGE_KEYS.DEALS, deals);
}

export function loadAgreements(): Agreement[] {
  return loadData<Agreement[]>(STORAGE_KEYS.AGREEMENTS, []);
}

export function saveAgreements(agreements: Agreement[]): void {
  saveData(STORAGE_KEYS.AGREEMENTS, agreements);
}

// === 新增存储函数 ===

export function loadCompanies(): Company[] {
  return loadData<Company[]>(STORAGE_KEYS.COMPANIES, []);
}

export function saveCompanies(companies: Company[]): void {
  saveData(STORAGE_KEYS.COMPANIES, companies);
}

export function loadPublicDeals(): PublicDeal[] {
  return loadData<PublicDeal[]>(STORAGE_KEYS.PUBLIC_DEALS, []);
}

export function savePublicDeals(deals: PublicDeal[]): void {
  saveData(STORAGE_KEYS.PUBLIC_DEALS, deals);
}

export function loadShareRecords(): ShareRecord[] {
  return loadData<ShareRecord[]>(STORAGE_KEYS.SHARE_RECORDS, []);
}

export function saveShareRecords(records: ShareRecord[]): void {
  saveData(STORAGE_KEYS.SHARE_RECORDS, records);
}

export function loadReferrals(): Referral[] {
  return loadData<Referral[]>(STORAGE_KEYS.REFERRALS, []);
}

export function saveReferrals(referrals: Referral[]): void {
  saveData(STORAGE_KEYS.REFERRALS, referrals);
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
