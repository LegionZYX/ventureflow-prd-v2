export interface Buyer {
  id: string;
  name: string;
  type: 'individual' | 'institution' | 'broker';
  kycStatus: 'pending' | 'approved' | 'rejected';
  pofStatus: 'pending' | 'verified';
  email: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  company: string;
  type: 'byteDance' | 'ai' | 'spv' | 'other';
  valuation: number;
  priceRange: { min: number; max: number };
  lastMatchedPrice?: number;
  description: string;
  status: 'active' | 'sold' | 'suspended';
}

export interface Deal {
  id: string;
  assetId: string;
  buyerId: string;
  sellerId: string;
  offerPrice: number;
  status: 'negotiating' | 'signed' | 'closing' | 'completed';
  faFee: number;
  splitRules: { platform: number; broker: number[] };
}

export interface Agreement {
  id: string;
  type: 'fa' | 'subscription';
  dealId: string;
  status: 'draft' | 'pending' | 'signed' | 'completed';
  createdAt: string;
}

export const mockBuyers: Buyer[] = [
  { id: '1', name: 'BlueChip Capital', type: 'institution', kycStatus: 'approved', pofStatus: 'verified', email: 'contact@bluechip.com', createdAt: '2026-02-15' },
  { id: '2', name: 'Pacific Wealth Family Office', type: 'institution', kycStatus: 'approved', pofStatus: 'verified', email: 'info@pacificwealth.com', createdAt: '2026-02-18' },
  { id: '3', name: '李明', type: 'individual', kycStatus: 'pending', pofStatus: 'pending', email: 'liming@email.com', createdAt: '2026-02-25' },
  { id: '4', name: 'Zhang Broker Ltd', type: 'broker', kycStatus: 'approved', pofStatus: 'verified', email: 'deal@zhangbroker.com', createdAt: '2026-02-20' },
  { id: '5', name: 'Sarah Chen', type: 'individual', kycStatus: 'approved', pofStatus: 'verified', email: 'sarah.chen@email.com', createdAt: '2026-02-22' },
];

export const mockAssets: Asset[] = [
  { id: '1', name: '字节跳动 H 轮普通股', company: 'ByteDance', type: 'byteDance', valuation: 225000000000, priceRange: { min: 160, max: 170 }, lastMatchedPrice: 165.5, description: '机构级大额包，5000 万股', status: 'active' },
  { id: '2', name: '字节跳动员工期权包', company: 'ByteDance', type: 'byteDance', valuation: 210000000000, priceRange: { min: 138, max: 148 }, lastMatchedPrice: 142, description: '高折价小额起投', status: 'active' },
  { id: '3', name: 'AI 视频公司 A 轮', company: 'VideoAI Inc', type: 'ai', valuation: 500000000, priceRange: { min: 8.5, max: 9.5 }, description: '字节海外视频授权合作伙伴', status: 'active' },
  { id: '4', name: '太空算力 SPV', company: 'SpaceCompute LP', type: 'spv', valuation: 10000000000, priceRange: { min: 95, max: 105 }, description: '甲骨文 10 亿订单支持', status: 'active' },
  { id: '5', name: '字节跳动 RSU', company: 'ByteDance', type: 'byteDance', valuation: 230000000000, priceRange: { min: 168, max: 178 }, lastMatchedPrice: 172.8, description: '限制性股票协议转让', status: 'sold' },
];

export const mockDeals: Deal[] = [
  { id: '1', assetId: '1', buyerId: '1', sellerId: 'seller1', offerPrice: 165000000, status: 'negotiating', faFee: 2500000, splitRules: { platform: 0.3, broker: [0.4, 0.3] } },
  { id: '2', assetId: '2', buyerId: '2', sellerId: 'seller2', offerPrice: 48000000, status: 'signed', faFee: 720000, splitRules: { platform: 0.5, broker: [0.5] } },
  { id: '3', assetId: '3', buyerId: '4', sellerId: 'seller3', offerPrice: 85000000, status: 'closing', faFee: 1275000, splitRules: { platform: 0.4, broker: [0.6] } },
  { id: '4', assetId: '1', buyerId: '5', sellerId: 'seller1', offerPrice: 168000000, status: 'completed', faFee: 2520000, splitRules: { platform: 0.3, broker: [0.4, 0.3] } },
];

export const mockAgreements: Agreement[] = [
  { id: '1', type: 'fa', dealId: '1', status: 'pending', createdAt: '2026-02-26' },
  { id: '2', type: 'subscription', dealId: '1', status: 'draft', createdAt: '2026-02-26' },
  { id: '3', type: 'fa', dealId: '2', status: 'signed', createdAt: '2026-02-24' },
  { id: '4', type: 'subscription', dealId: '2', status: 'signed', createdAt: '2026-02-24' },
  { id: '5', type: 'fa', dealId: '4', status: 'completed', createdAt: '2026-02-20' },
];

export const dashboardStats = {
  totalGmv: 2500000000,
  pendingBuyers: 12,
  activeDeals: 8,
  monthlyClosed: 3,
};

export const activityTimeline = [
  { id: '1', type: 'buyer_joined', message: 'New buyer 李明 registered', time: '2 hours ago' },
  { id: '2', type: 'deal_completed', message: 'Deal #4 completed - $168M', time: '5 hours ago' },
  { id: '3', type: 'agreement_signed', message: 'FA Agreement #3 signed', time: '1 day ago' },
  { id: '4', type: 'kyc_approved', message: 'KYC approved for Pacific Wealth', time: '2 days ago' },
];
