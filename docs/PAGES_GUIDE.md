# VentureFlow - 页面完整说明

## 🗺️ 站点地图

```
ventureflow-fa-backend/
├── 公开页面 (无需登录)
│   ├── /                    首页
│   ├── /opportunities       投资机会
│   ├── /kyc                 KYC 认证
│   ├── /sell                出售股份
│   ├── /about               关于我们
│   └── /contact             联系我们
│
├── FA 后台 (需 FA 登录)
│   ├── /login               FA 登录
│   ├── /dashboard           FA 仪表盘
│   ├── /dashboard/buyers    买家管理
│   ├── /dashboard/orders    订单管理
│   ├── /dashboard/assets    资产管理
│   ├── /dashboard/deals     交易管理
│   ├── /dashboard/agreements 协议管理
│   ├── /dashboard/commission 佣金管理
│   ├── /dashboard/ai-tools  AI 工具
│   └── /dashboard/settings  设置
│
└── 投资者门户 (需投资者登录)
    ├── /user/login          投资者登录
    └── /user/dashboard      投资仪表板
```

---

## 📄 公开页面详解

### 1. 首页 `/`

**URL**: `http://localhost:3000/`

**页面类型**: 公开落地页

**核心目标**: 
- 展示平台价值主张
- 建立信任感
- 引导用户转化（KYC 或浏览机会）

**页面结构**:
```
┌─────────────────────────────────────────┐
│            Navigation Bar               │
├─────────────────────────────────────────┤
│                                         │
│           Hero Section                  │
│   "ByteDance Equity Secondary Market"   │
│   [Start KYC] [Browse Opportunities]    │
│                                         │
├─────────────────────────────────────────┤
│     Stats Bar (Valuation, Volume...)    │
├─────────────────────────────────────────┤
│                                         │
│        Why Choose VentureFlow?          │
│   [KYC] [Equity Mgmt] [Deal] [Compliance]│
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      Featured Opportunities (2)         │
│   [Card 1]         [Card 2]             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         Trusted by Investors            │
│   [Testimonial 1] [2] [3]               │
│                                         │
├─────────────────────────────────────────┤
│              CTA Section                │
│   [Browse Opportunities] [Contact]      │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

**关键元素**:
| 元素 | 说明 | CTA |
|------|------|-----|
| Hero 标题 | "ByteDance Equity Secondary Market" | - |
| 标签 | "ByteDance Officially Authorized Platform" | - |
| 主按钮 | Start KYC Verification | `/kyc` |
| 次按钮 | Browse Opportunities | `/opportunities` |
| 数据统计 | 估值$225B、月交易量$1.45B 等 | - |
| 特色功能 | KYC、股权管理、交易执行、合规 | - |
| 机会预览 | 展示 2 个精选机会 | - |
| 用户评价 | 3 条投资者评价 | - |

**技术实现**:
- 组件：`app/page.tsx`
- Layout: `BuyerLayout`
- 图表：`PriceChart` (静态 SVG)

---

### 2. 投资机会页 `/opportunities`

**URL**: `http://localhost:3000/opportunities`

**页面类型**: 公开列表页

**核心目标**: 
- 展示所有可投资产
- 引导用户提交 Inquiry

**页面结构**:
```
┌─────────────────────────────────────────┐
│            Navigation Bar               │
├─────────────────────────────────────────┤
│                                         │
│  Investment Opportunities               │
│  "Browse verified ByteDance equity..."  │
│                                         │
├─────────────────────────────────────────┤
│  [Filters: Type ▼] [Sort: Price ▼]     │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐ ┌─────────────┐       │
│  │  Asset 1    │ │  Asset 2    │       │
│  │  Chart      │ │  Chart      │       │
│  │  Details    │ │  Details    │       │
│  │  [Express   │ │  [Express   │       │
│  │   Interest] │ │   Interest] │       │
│  └─────────────┘ └─────────────┘       │
│                                         │
│  ┌─────────────┐ ┌─────────────┐       │
│  │  Asset 3    │ │  Asset 4    │       │
│  │  ...        │ │  ...        │       │
│  └─────────────┘ └─────────────┘       │
│                                         │
├─────────────────────────────────────────┤
│              Footer                     │
└─────────────────────────────────────────┘
```

**资产卡片信息**:
| 字段 | 示例值 |
|------|--------|
| 资产名称 | ByteDance Series H Common Stock |
| 类型 | Common Stock |
| 估值 | $225B |
| 每股价格 | $165.5 |
| 交易量 | $50M |
| 折扣 | -15.2% |
| 状态 | Active |
| 紧急度 | Large Block - Institutional |
| 图表 | 价格趋势图 |

**交互流程**:
1. 用户浏览资产卡片
2. 点击"Express Interest"
3. 弹出 Inquiry 表单
4. 填写金额范围
5. 提交后 FA 联系

---

### 3. KYC 认证页 `/kyc`

**URL**: `http://localhost:3000/kyc`

**页面类型**: 公开表单页

**核心目标**: 
- 收集投资者信息
- 完成合规审核

**表单字段**:
| 步骤 | 字段 | 必填 |
|------|------|------|
| 1. 类型选择 | 个人/机构 | ✅ |
| 2. 基本信息 | 姓名、邮箱、电话 | ✅ |
| 3. 身份信息 | 护照/身份证号码 | ✅ |
| 4. 投资资质 | 合格投资者证明 | ✅ |
| 5. 风险揭示 | 电子签名确认 | ✅ |

---

### 4. 出售股份页 `/sell`

**URL**: `http://localhost:3000/sell`

**页面类型**: 公开表单页

**核心目标**: 
- 收集卖家委托信息
- 引导联系 FA

**功能**:
- 持股信息填写
- 期望价格
- 联系方式
- FA 回电预约

---

## 🔐 FA 后台页面详解

### 5. FA 登录页 `/login`

**URL**: `http://localhost:3000/login`

**页面类型**: 公开登录页

**核心目标**: FA 管理员身份验证

**页面元素**:
```
┌─────────────────────────────────────┐
│                                     │
│         🚀 VentureFlow              │
│      FA Backend Management          │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Email                              │
│  [________________]                 │
│                                     │
│  Password                           │
│  [________________]                 │
│                                     │
│  [    Sign In    ]                  │
│                                     │
├─────────────────────────────────────┤
│  Demo Credentials:                  │
│  admin@ventureflow.com              │
│  admin123                           │
├─────────────────────────────────────┤
│  [👤 Investor Login →]              │
│                                     │
└─────────────────────────────────────┘
```

**Demo 说明**: 
- 任意邮箱/密码均可登录
- 实际生产环境需要验证

---

### 6. FA 仪表盘 `/dashboard`

**URL**: `http://localhost:3000/dashboard`

**页面类型**: 私有（需登录）

**核心目标**: 展示业务概览，快速入口

**页面结构**:
```
┌─────────────────────────────────────────┐
│  Sidebar  │  Header                     │
│           ├─────────────────────────────┤
│  Dashboard│  Stats Grid (4 cards)       │
│  Buyers   │  ┌──┐ ┌──┐ ┌──┐ ┌──┐      │
│  Orders   │  │  │ │  │ │  │ │  │      │
│  Assets   │  └──┘ └──┘ └──┘ └──┘      │
│  Deals    ├─────────────────────────────┤
│  Agreements│  Recent Activity │ Quick   │
│  Commission│  ┌─────────┐    │ Actions │
│  AI Tools  │  │ Timeline│    │ ┌─────┐ │
│  Settings  │  │ List    │    │ │Btn1 │ │
│           │  └─────────┘    │ │Btn2 │ │
│           │                 │ └─────┘ │
│           ├─────────────────────────────┤
│           │  Market Overview (Blue)     │
│           │  Valuation │ Volume │ Disc  │
└───────────┴─────────────────────────────┘
```

**核心指标卡**:
| 指标 | 值 | 环比 |
|------|-----|------|
| Total GMV | $2.35B | +12.5% |
| Pending Buyers | 23 | +3 |
| Active Deals | 12 | +2 |
| Monthly Closed | 8 | +1 |

**快捷操作**:
- Review KYC → `/dashboard/buyers`
- Create Asset → `/dashboard/assets`
- Manage Deals → `/dashboard/deals`
- AI Tools → `/dashboard/ai-tools`

**市场概览**:
- ByteDance Valuation: $225B (+4.2%)
- Monthly Volume: $1.45B (+12.5%)
- Avg Discount: -1.2% (vs Series F)

---

### 7. 买家管理页 `/dashboard/buyers`

**URL**: `http://localhost:3000/dashboard/buyers`

**页面类型**: 私有（需登录）

**核心目标**: 管理潜在客户，追踪跟进

**表格字段**:
| 字段 | 说明 |
|------|------|
| Buyer | 买家姓名/机构 |
| Email | 联系邮箱 |
| Type | 个人/机构 |
| KYC Status | 审核状态 |
| Inquiries | 询盘数量 |
| Last Contact | 最后联系时间 |
| Actions | 操作按钮 |

**操作功能**:
- ✅ 查看买家详情（抽屉式）
- ✅ KYC 审核（Approve/Reject）
- ✅ 添加跟进记录
- ✅ 发送邮件（AI 生成）
- ✅ 安排会议（日历集成）

**AI 功能**:
- 智能邮件文案生成
- 买家投资偏好分析
- 最佳联系时间推荐

---

### 8. 订单管理页 `/dashboard/orders`

**URL**: `http://localhost:3000/dashboard/orders`

**页面类型**: 私有（需登录）

**核心目标**: 管理所有交易订单

**订单状态**:
```
Pending → In Review → Meeting Scheduled → Documents Signed → Completed
```

**功能**:
- 订单列表（按状态筛选）
- 订单详情查看
- 进度更新
- 日历视图

---

### 9. 资产管理页 `/dashboard/assets`

**URL**: `http://localhost:3000/dashboard/assets`

**页面类型**: 私有（需登录）

**核心目标**: 创建和管理可投资产

**功能**:
- 资产列表（表格）
- 创建资产（表单）
- 编辑/下架
- 询价列表

**资产字段**:
| 字段 | 说明 |
|------|------|
| Asset Name | 资产名称 |
| Type | Common/Preferred/Option |
| Valuation | 公司估值 |
| Price/Share | 每股价格 |
| Volume | 可交易量 |
| Discount | 相对估值折扣 |
| Status | Active/Sold/Suspended |

---

### 10. 交易管理页 `/dashboard/deals`

**URL**: `http://localhost:3000/dashboard/deals`

**页面类型**: 私有（需登录）

**核心目标**: 管理交易管道

**看板列**:
```
| Lead | Contacted | Negotiation | Due Diligence | Closing | Completed |
```

**功能**:
- Kanban 看板视图
- 拖拽阶段推进
- 参与方管理
- 文件附件

---

### 11. 协议管理页 `/dashboard/agreements`

**URL**: `http://localhost:3000/dashboard/agreements`

**页面类型**: 私有（需登录）

**核心目标**: 管理交易协议

**协议类型**:
- NDA（保密协议）
- SPA（股权购买协议）
- FA Agreement（财务顾问协议）

**功能**:
- 协议列表
- 模板管理
- 状态追踪（Draft/Sent/Signed）
- 下载/打印

---

### 12. 佣金管理页 `/dashboard/commission`

**URL**: `http://localhost:3000/dashboard/commission`

**页面类型**: 私有（需登录）

**核心目标**: 追踪佣金收入

**字段**:
| 字段 | 说明 |
|------|------|
| Deal ID | 交易编号 |
| Amount | 交易金额 |
| Rate | 佣金比例 |
| Commission | 佣金金额 |
| Status | Pending/Paid |
| Due Date | 结算日期 |

**功能**:
- 佣金列表
- 自动计算
- 导出报表（CSV/Excel）

---

### 13. AI 工具页 `/dashboard/ai-tools`

**URL**: `http://localhost:3000/dashboard/ai-tools`

**页面类型**: 私有（需登录）

**核心目标**: 利用 AI 提升 FA 效率

**功能模块**:

#### AI 邮件生成
```
输入: 买家名称 + 项目信息
输出: 个性化营销邮件

示例:
"Hi [Buyer],

I noticed your interest in ByteDance equity. 
We currently have a $50M block available at..."
```

#### 买家分析
- 投资偏好分析
- 活跃度评分
- 转化概率预测

#### 智能推荐
- 项目-买家匹配
- 最佳联系时间
- 定价建议

#### 日程安排
- 自动会议安排
- 时区转换
- 会议提醒

---

### 14. 设置页 `/dashboard/settings`

**URL**: `http://localhost:3000/dashboard/settings`

**页面类型**: 私有（需登录）

**功能**:
- 个人资料
- 通知设置
- 团队管理
- API 密钥

---

## 👤 投资者门户页面详解

### 15. 投资者登录页 `/user/login`

**URL**: `http://localhost:3000/user/login`

**页面类型**: 公开登录页

**核心目标**: 投资者身份验证

**页面元素**:
```
┌─────────────────────────────────────┐
│         Navigation Bar              │
├─────────────────────────────────────┤
│                                     │
│         👤 Investor Login           │
│   Access your portfolio and...      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Email Address                      │
│  [________________]                 │
│                                     │
│  Password                           │
│  [________________]                 │
│                                     │
│  [    Sign In    ]                  │
│                                     │
├─────────────────────────────────────┤
│  Complete KYC to Register           │
├─────────────────────────────────────┤
│  FA/Admin Login →                   │
├─────────────────────────────────────┤
│  Demo: Any email / Any password     │
└─────────────────────────────────────┘
```

**Demo 说明**: 
- 任意邮箱/密码均可登录
- 自动跳转到 `/user/dashboard`

---

### 16. 投资仪表板 `/user/dashboard`

**URL**: `http://localhost:3000/user/dashboard`

**页面类型**: 私有（需登录）

**核心目标**: 管理投资组合

**页面结构**:
```
┌─────────────────────────────────────────┐
│            Navigation Bar               │
├─────────────────────────────────────────┤
│                                         │
│  My Portfolio - Welcome back, John      │
│                                         │
├─────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Total   │ │ Gain/   │ │ Active  │   │
│  │ Value   │ │ Loss    │ │ Inq.    │   │
│  │ $2.45M  │ │ +$76.5K │ │ 2       │   │
│  └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────┤
│                                         │
│  My Holdings (2/3)      │ My Inquiries │
│  ┌───────────────────┐  │ ┌──────────┐ │
│  │ ByteDance Series H│  │ │ RSU      │ │
│  │ 5000 shares       │  │ │ Pending  │ │
│  │ $827,500 (+6.4%)  │  │ └──────────┘ │
│  │ [Chart]           │  │ ┌──────────┐ │
│  │ [Request to Sell] │  │ │ SPV      │ │
│  └───────────────────┘  │ │ Meeting  │ │
│  ┌───────────────────┐  │ └──────────┘ │
│  │ Employee Options  │  │              │
│  │ ...               │  │ [+ New Inq.] │
│  └───────────────────┘  │              │
│                         ├──────────────┤
│                         │ Quick Actions│
│                         │ [Browse]     │
│                         │ [Sell]       │
│                         └──────────────┘
└─────────────────────────────────────────┘
```

**持仓卡片信息**:
| 字段 | 示例值 |
|------|--------|
| 资产名称 | ByteDance Series H Common |
| 持股数 | 5,000 shares |
| 平均成本 | $155.00 |
| 当前价格 | $165.50 |
| 当前价值 | $827,500 |
| 盈亏 | +$52,500 (+6.4%) |
| 图表 | 价格趋势 |
| 操作 | Request to Sell / Details |

**出售申请弹窗**:
```
┌──────────────────────────────┐
│      Request to Sell         │
├──────────────────────────────┤
│ You are requesting to sell   │
│ your ByteDance Series H      │
│ Common holdings.             │
│                              │
│ Shares: 5,000                │
│ Estimated Value: $827,500    │
│                              │
│ An FA representative will    │
│ contact you within 24 hours. │
│                              │
│ [Cancel] [Submit Request]    │
└──────────────────────────────┘
```

**Inquiry 状态**:
| 状态 | 说明 |
|------|------|
| Pending | 待 FA 审核 |
| In Review | FA 审核中 |
| Meeting Scheduled | 已安排会议 |
| Completed | 已完成 |

---

## 📱 响应式设计

所有页面支持以下断点：

| 断点 | 宽度 | 布局 |
|------|------|------|
| Mobile | < 640px | 单列 |
| Tablet | 640px - 1024px | 双列 |
| Desktop | > 1024px | 多列/侧边栏 |

---

## 🔗 页面跳转关系

```
首页 [/]
├── KYC [/kyc] → 完成 → 投资者登录 [/user/login]
├── 机会 [/opportunities] → 询价 → 登录 → 仪表板 [/user/dashboard]
├── 出售 [/sell] → 表单提交 → FA 联系
├── FA 登录 [/login] → 后台 [/dashboard]
└── 投资者登录 [/user/login] → 仪表板 [/user/dashboard]

FA 后台 [/dashboard]
├── Buyers [/dashboard/buyers]
├── Orders [/dashboard/orders]
├── Assets [/dashboard/assets]
├── Deals [/dashboard/deals]
├── Agreements [/dashboard/agreements]
├── Commission [/dashboard/commission]
├── AI Tools [/dashboard/ai-tools]
└── Settings [/dashboard/settings]
```
