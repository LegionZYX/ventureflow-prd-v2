# VentureFlow - FA Backend Demo

ByteDance Equity Secondary Market Trading Platform - FA Management System Demo

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm start
```

Server runs on http://localhost:3000

## 📋 Demo Credentials

### FA/Admin Login
- **URL:** http://localhost:3000/login
- **Email:** admin@ventureflow.com
- **Password:** admin123
- **Note:** Any password works for demo

### Investor Login  
- **URL:** http://localhost:3000/user/login
- **Credentials:** Any email / Any password

## 🗺️ Site Map

### Public Pages
- `/` - Landing Page
- `/opportunities` - Investment Opportunities
- `/kyc` - KYC Verification
- `/sell` - Sell Shares

### FA Backend (Requires Login)
- `/dashboard` - FA Dashboard
- `/dashboard/buyers` - Buyer Management
- `/dashboard/orders` - Order Management
- `/dashboard/assets` - Asset Management
- `/dashboard/deals` - Deal Pipeline
- `/dashboard/agreements` - Agreements
- `/dashboard/commission` - Commission Tracking
- `/dashboard/ai-tools` - AI Analysis Center
- `/dashboard/settings` - Settings

### Investor Portal (Requires Login)
- `/user/login` - Investor Login
- `/user/dashboard` - Portfolio Dashboard

## 📝 Change Log

### v1.1.0 (2026-03-01)
- ✅ Added Investor Login link on FA Login page
- ✅ Added FA/Admin Login link on Investor Login page
- ✅ Simplified authentication (no loading states)
- ✅ Fixed PriceChart component (static SVG, no re-renders)
- ✅ All pages use static data for demo purposes

### v1.0.0 (2026-02-28)
- ✅ Initial release
- ✅ Complete FA Backend with 9 management pages
- ✅ Investor Portal with portfolio dashboard
- ✅ Static price charts with "Reference Price" label
- ✅ Responsive design with Tailwind CSS

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel / Any Node.js host

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel deploy
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual
```bash
npm run build
pm2 start npm --name "ventureflow" -- start
```

## ⚠️ Demo Notice

This is a **demo application** with static data. No real authentication or backend is connected. All data resets on page refresh.

## 📄 License

Copyright © 2026 VentureFlow. All rights reserved.
