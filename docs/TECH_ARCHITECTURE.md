# VentureFlow - 技术架构文档

## 🏗️ 系统架构概览

```
┌─────────────────────────────────────────────────────────┐
│                      Client Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Public    │  │     FA      │  │   Investor  │    │
│  │   Pages     │  │   Backend   │  │   Portal    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Layouts   │  │    Pages    │  │ Components  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Mock Data  │  │   Context   │  │  LocalStorage│   │
│  │   (Demo)    │  │   (Auth)    │  │   (Session)  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## 📦 技术栈

### 核心框架
| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.1.6 | React 全栈框架 |
| **React** | 19.x | UI 库 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 3.x | 样式系统 |

### 开发工具
| 工具 | 用途 |
|------|------|
| Turbopack | 快速构建（Next.js 16 默认） |
| ESLint | 代码检查 |
| Prettier | 代码格式化 |

### 部署
| 平台 | 用途 |
|------|------|
| Vercel | 首选部署平台 |
| GitHub Pages | 静态页面托管 |
| Docker | 容器化部署 |

## 📁 项目结构

```
ventureflow-fa-backend/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx                # 根布局（含 AuthProvider）
│   ├── page.tsx                  # 首页
│   ├── globals.css               # 全局样式
│   ├── login/
│   │   └── page.tsx              # FA 登录页
│   ├── kyc/
│   │   └── page.tsx              # KYC 认证页
│   ├── opportunities/
│   │   └── page.tsx              # 投资机会页
│   ├── sell/
│   │   └── page.tsx              # 出售股份页
│   ├── user/
│   │   ├── login/
│   │   │   └── page.tsx          # 投资者登录页
│   │   └── dashboard/
│   │       └── page.tsx          # 投资者仪表板
│   └── dashboard/
│       ├── page.tsx              # FA 仪表盘
│       ├── buyers/
│       │   └── page.tsx          # 买家管理
│       ├── orders/
│       │   └── page.tsx          # 订单管理
│       ├── assets/
│       │   └── page.tsx          # 资产管理
│       ├── deals/
│       │   └── page.tsx          # 交易管理
│       ├── agreements/
│       │   └── page.tsx          # 协议管理
│       ├── commission/
│       │   └── page.tsx          # 佣金管理
│       ├── ai-tools/
│       │   └── page.tsx          # AI 工具
│       └── settings/
│           └── page.tsx          # 设置
│
├── components/                     # 可复用组件
│   ├── PriceChart.tsx             # 价格图表（静态 SVG）
│   ├── DashboardLayout.tsx        # FA 后台布局
│   └── BuyerLayout.tsx            # 投资者门户布局
│
├── contexts/                       # React Context
│   └── AuthContext.tsx            # 认证上下文（Demo：静态）
│
├── lib/                            # 工具库
│   ├── auth.ts                     # 认证工具（Demo：模拟）
│   ├── mockData.ts                 # 模拟数据
│   └── storage.ts                  # LocalStorage 封装
│
├── docs/                           # 文档
│   ├── BUSINESS_LOGIC.md          # 业务逻辑
│   ├── REQUIREMENTS.md            # 需求文档
│   ├── PAGES_GUIDE.md             # 页面说明
│   └── TECH_ARCHITECTURE.md       # 技术架构
│
├── .gitignore                      # Git 忽略文件
├── next.config.ts                  # Next.js 配置
├── package.json                    # 依赖管理
├── README.md                       # 项目说明
└── tsconfig.json                   # TypeScript 配置
```

## 🔐 认证架构（Demo 版）

### 当前实现（静态 Demo）

```typescript
// contexts/AuthContext.tsx
// Demo 模式：始终假设已登录，无实际验证

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{
      user: DEMO_USER,           // 静态用户数据
      login: () => {},           // 空操作
      logout: () => {},          // 空操作
      isAuthenticated: true,     // 始终为 true
      isLoading: false,          // 无加载状态
    }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### 生产环境建议实现

```typescript
// 建议的生产环境认证流程

1. 用户提交凭证 → 2. API 验证 → 3. 返回 JWT → 4. 存储 Token → 5. 后续请求携带 Token

// 使用 NextAuth.js 或自定义 JWT 方案
- 会话管理：JWT Token
- 刷新机制：Refresh Token
- 安全存储：HttpOnly Cookie
- 权限控制：RBAC（基于角色的访问控制）
```

## 💾 数据架构（Demo 版）

### 当前实现（静态数据）

```typescript
// lib/mockData.ts
// 所有数据均为静态，刷新后重置

export const dashboardStats = {
  totalGmv: 2350000000,
  pendingBuyers: 23,
  activeDeals: 12,
  monthlyClosed: 8,
};

export const buyers = [
  {
    id: '1',
    name: 'BlueChip Capital',
    email: 'contact@bluechip.com',
    type: 'Institution',
    kycStatus: 'Approved',
    // ...
  },
  // ...
];
```

### 生产环境建议实现

```typescript
// 建议的数据库 Schema（PostgreSQL）

-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,  -- 'admin', 'fa', 'broker', 'investor'
  kyc_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 资产表
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,  -- 'common', 'preferred', 'option'
  valuation DECIMAL(20, 2),
  price_per_share DECIMAL(10, 2),
  volume DECIMAL(20, 2),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 询盘表
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id UUID REFERENCES users(id),
  asset_id UUID REFERENCES assets(id),
  amount_min DECIMAL(20, 2),
  amount_max DECIMAL(20, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 交易表
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id UUID REFERENCES assets(id),
  buyer_id UUID REFERENCES users(id),
  seller_id UUID REFERENCES users(id),
  amount DECIMAL(20, 2),
  commission_rate DECIMAL(5, 4),
  status VARCHAR(50) DEFAULT 'lead',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 组件架构

### 布局组件

#### DashboardLayout
```typescript
// 用于 FA 后台所有页面
// 功能：侧边栏导航、顶部栏、登出

<DashboardLayout>
  <PageContent />
</DashboardLayout>
```

#### BuyerLayout
```typescript
// 用于投资者门户所有页面
// 功能：顶部导航、页脚

<BuyerLayout>
  <PageContent />
</BuyerLayout>
```

### 共享组件

#### PriceChart
```typescript
// 静态 SVG 图表组件
// Props: height (number)
// 特点：无状态、纯展示、无 re-render

<PriceChart height={200} />
```

## 🔄 数据流

### Demo 模式数据流

```
用户交互 → Component State → UI Update
                              ↓
                         (无后端)
```

### 生产环境建议数据流

```
用户交互 → Component State → API Call → Database
     ↓                                  ↓
   UI Update ← Response ← API Response
```

## 🚀 性能优化

### 当前实现

| 优化项 | 实现方式 | 效果 |
|--------|----------|------|
| 静态生成 | `npm run build` 生成静态 HTML | 首屏 < 1s |
| 组件懒加载 | Next.js 自动代码分割 | 按需加载 |
| 图片优化 | 使用 SVG 替代 PNG | 体积小 |
| 无客户端状态 | 静态数据，无 useState | 无 re-render |

### 生产环境建议优化

| 优化项 | 实现方式 |
|--------|----------|
| ISR | Incremental Static Regeneration |
| SWR | 数据缓存和重新验证 |
| Image CDN | Next.js Image 组件 |
| Edge Functions | Vercel Edge Network |

## 🔒 安全考虑

### Demo 模式（无安全）
- ⚠️ 无实际认证
- ⚠️ 无数据加密
- ⚠️ 无 CSRF 防护
- ⚠️ 仅用于演示

### 生产环境必需安全措施

| 安全项 | 实现方式 |
|--------|----------|
| 认证 | NextAuth.js / 自定义 JWT |
| 加密 | HTTPS + bcrypt 密码哈希 |
| CSRF | CSRF Token |
| XSS | 输入验证 + 输出转义 |
| 速率限制 | API Rate Limiting |
| 日志 | 审计日志 + 异常监控 |

## 📊 部署架构

### Vercel 部署（推荐）

```
GitHub Push → Vercel Auto Build → Edge Network → User
                    ↓
              Automatic Preview
```

### 自定义服务器部署

```bash
# Docker 部署流程
docker build -t ventureflow .
docker run -p 3000:3000 ventureflow
```

### 环境变量配置

```env
# .env.production
DATABASE_URL=postgresql://user:pass@host:5432/ventureflow
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

## 🧪 测试策略

### 建议测试覆盖

| 测试类型 | 工具 | 覆盖范围 |
|----------|------|----------|
| 单元测试 | Jest + React Testing Library | 组件、工具函数 |
| 集成测试 | Playwright | API、数据流 |
| E2E 测试 | Cypress | 完整用户流程 |
| 视觉回归 | Percy | UI 一致性 |

### 测试示例

```typescript
// __tests__/PriceChart.test.tsx
import { render, screen } from '@testing-library/react'
import PriceChart from '@/components/PriceChart'

describe('PriceChart', () => {
  it('renders without crashing', () => {
    render(<PriceChart height={200} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
```

## 📈 监控与日志

### 建议集成

| 服务 | 用途 |
|------|------|
| Vercel Analytics | 页面性能监控 |
| Sentry | 错误追踪 |
| Google Analytics | 用户行为分析 |
| LogRocket | 会话回放 |

## 🔮 技术债务与改进

### 当前限制（Demo）

- [ ] 无真实后端
- [ ] 无数据持久化
- [ ] 无用户认证
- [ ] 无文件上传
- [ ] 无实时通知

### 改进路线图

#### Phase 1: 基础功能
- [ ] 数据库集成（PostgreSQL + Prisma）
- [ ] 用户认证（NextAuth.js）
- [ ] API 路由（Next.js API Routes）

#### Phase 2: 核心功能
- [ ] 文件上传（AWS S3 / Vercel Blob）
- [ ] 邮件发送（Resend / SendGrid）
- [ ] 实时通知（WebSocket / Server-Sent Events）

#### Phase 3: 高级功能
- [ ] AI 集成（OpenAI API）
- [ ] 支付集成（Stripe）
- [ ] 电子签名（DocuSign API）

## 📚 参考资源

### 官方文档
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### 最佳实践
- [Next.js App Router Best Practices](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/react/server-components)
- [Vercel Deployment Guide](https://vercel.com/docs)
