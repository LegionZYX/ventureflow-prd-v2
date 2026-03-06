// === 现有类型（保持兼容） ===
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

// === 新增类型：Demo 最小化设计 ===

/** 公司实体 */
export interface Company {
  id: string;                    // URL 友好 ID: "bytedance", "videoai"
  name: string;                  // 显示名称: "ByteDance"
  logo?: string;                 // Emoji 或图片 URL
  industry: string;              // "Technology", "AI", "Space"
  description: string;           // 公司描述
  valuation: string;             // "$225B"
  foundedYear?: number;          // 2012
  headquarters: string;          // "Beijing, China"
  tags: string[];                // ["Unicorn", "Pre-IPO"]
  status: 'active' | 'inactive';
}

/** 重新定义的 Deal（用于公开侧展示） */
export interface PublicDeal {
  id: string;
  companyId: string;             // 关联到 Company
  name: string;                  // "Series H Common Stock"
  type: string;                  // "Common Stock", "Employee Options"
  valuation: string;             // "$225B"
  price: string;                 // "$165.5"
  volume: string;                // "$50M"
  discount?: string;             // "-15.2%"
  description: string;
  status: 'active' | 'sold' | 'suspended';
  urgency?: string;              // "Large Block - Institutional"
}

/** 分享记录 */
export interface ShareRecord {
  id: string;                    // 唯一 ID（用于 URL）
  dealId: string;                // 关联的 Deal ID
  sharerName: string;             // 分享人姓名（展示用）
  createdAt: string;             // ISO 8601
  clickCount: number;            // 点击次数
  conversionCount: number;       // 转化次数
}

/** 推荐关系 */
export interface Referral {
  id: string;
  shareId: string;               // 关联的 ShareRecord ID
  referredName: string;          // 被推荐人姓名
  referredEmail: string;         // 被推荐人邮箱
  dealId: string;                // 感兴趣的 Deal
  kycCompleted: boolean;         // 是否完成 KYC
  agreementSigned: boolean;      // 是否签署 FA Agreement
  completedAt?: string;          // 完成时间
  createdAt: string;
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

// === 新增 Mock 数据：Company ===
export const mockCompanies: Company[] = [
  {
    id: 'bytedance',
    name: 'ByteDance',
    logo: '🦄',
    industry: 'Technology',
    description: 'Chinese multinational internet technology company operating various content platforms, including TikTok and Douyin.',
    valuation: '$225B',
    foundedYear: 2012,
    headquarters: 'Beijing, China',
    tags: ['Unicorn', 'Tech Giant', 'Pre-IPO'],
    status: 'active',
  },
  {
    id: 'videoai',
    name: 'VideoAI Inc',
    logo: '🎬',
    industry: 'AI',
    description: 'AI-powered video editing platform, official overseas partner of ByteDance.',
    valuation: '$500M',
    foundedYear: 2020,
    headquarters: 'San Francisco, USA',
    tags: ['AI', 'Series A', 'ByteDance Partner'],
    status: 'active',
  },
  {
    id: 'spacecompute',
    name: 'SpaceCompute LP',
    logo: '🚀',
    industry: 'Space',
    description: 'Space computing infrastructure provider backed by Oracle $10B order, NVIDIA partner.',
    valuation: '$10B',
    foundedYear: 2019,
    headquarters: 'Austin, Texas',
    tags: ['Space Tech', 'Series B', 'Enterprise'],
    status: 'active',
  },
];

// === 新增 Mock 数据：PublicDeal（用于公开侧展示） ===
export const mockPublicDeals: PublicDeal[] = [
  {
    id: '1',
    companyId: 'bytedance',
    name: 'Series H Common Stock',
    type: 'Common Stock',
    valuation: '$225B',
    price: '$165.5',
    volume: '$50M',
    discount: '-15.2%',
    description: 'Large institutional block, 50M shares available',
    status: 'active',
    urgency: 'Large Block - Institutional',
  },
  {
    id: '2',
    companyId: 'bytedance',
    name: 'Employee Options Package',
    type: 'Employee Options',
    valuation: '$210B',
    price: '$142',
    volume: '$5M',
    discount: '-22.5%',
    description: 'High discount, retail-friendly minimum',
    status: 'active',
    urgency: 'High Discount - Retail Friendly',
  },
  {
    id: '3',
    companyId: 'bytedance',
    name: 'RSU Transfer',
    type: 'RSU',
    valuation: '$230B',
    price: '$172.8',
    volume: '$12M',
    discount: '-8.5%',
    description: 'Restricted Stock Unit transfer',
    status: 'active',
  },
  {
    id: '4',
    companyId: 'bytedance',
    name: 'Series E-2 Preferred',
    type: 'Preferred Stock',
    valuation: '$245B',
    price: '$188',
    volume: '$100M',
    discount: '-5%',
    description: 'Top tier, long-term hold with liquidation preference',
    status: 'active',
  },
  {
    id: '5',
    companyId: 'videoai',
    name: 'Series A Preferred',
    type: 'Preferred Stock',
    valuation: '$500M',
    price: '$9.0',
    volume: '$2M',
    description: 'Early-stage AI video editing platform',
    status: 'active',
  },
  {
    id: '6',
    companyId: 'spacecompute',
    name: 'Series B Common Stock',
    type: 'Common Stock',
    valuation: '$10B',
    price: '$100',
    volume: '$100M',
    description: 'Enterprise space computing infrastructure',
    status: 'active',
  },
];

// === 新增 Mock 数据：ShareRecord 和 Referral（初始为空） ===
export const mockShareRecords: ShareRecord[] = [];
export const mockReferrals: Referral[] = [];

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
