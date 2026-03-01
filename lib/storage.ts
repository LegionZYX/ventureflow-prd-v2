import { Buyer, Asset, Deal, Agreement } from './mockData';

const STORAGE_KEYS = {
  BUYERS: 'vf_buyers',
  ASSETS: 'vf_assets',
  DEALS: 'vf_deals',
  AGREEMENTS: 'vf_agreements',
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

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
}
