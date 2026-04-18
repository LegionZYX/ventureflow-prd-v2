# PRD V2 Persistence & Forge Gap Closure

Date: 2026-04-18  
Branch: `prd-v2-implementation`

## What this round implemented

This round focused on closing the most execution-critical PRD V2 and Forge-inspired gaps without introducing a heavy infrastructure dependency.

### 1. Shared persisted workspace

- Added a file-backed trading workspace under `data/trading-v2-workspace.json`
- Added server-side read/write logic in `lib/trading-v2-store.ts`
- Added API endpoints:
  - `GET /api/trading-v2`
  - `POST /api/trading-v2/actions`
- Cross-page state now survives page refresh and page switching

### 2. PRD V2 business objects added

The unified workspace now includes:

- `faOnboardingApplications`
- `companyRules`
- `marketSignals`
- `orderBookEntries`
- `negotiationRecords`
- `transferApprovals`
- `escrowRecords`
- `dashboardTasks`

These fill the biggest remaining PRD / Forge gaps around:

- FA onboarding closure
- company-level order book and market signals
- negotiation snapshots
- issuer / ROFR approval states
- escrow evidence and release tracking
- dashboard task orchestration

### 3. Workflow actions added

The action layer now supports persisted progression for:

- recommendation binding
- platform agreement execution
- referral reward payout
- deal stage progression
- FA onboarding
- transfer approvals
- escrow flow

### 3.1 Contract execution rule update

- e-sign remains available, but is optional instead of mandatory
- paper signing is acceptable when the signed package includes lawyer witnessing or equivalent legal certification

### 4. Dashboard pages moved to persisted data

The following pages now use the shared API-backed workspace instead of local-only `useState` snapshots:

- `/dashboard`
- `/dashboard/intent-registry`
- `/dashboard/buyers`
- `/dashboard/orders`
- `/dashboard/agreements`
- `/dashboard/commission`
- `/dashboard/deals`

## Remaining PRD V2 / Forge gaps after this round

These are still important, but no longer blockers for a realistic V2 demo:

### P0 next

- real user auth and role-based permissions
- real document upload and verification workflow
- explicit bid edit / withdraw / reconfirm actions
- partial fills and richer match console
- contract templating and signing-method tracking, including lawyer-witnessed paper packs

### P1 next

- watchlist and company alerts
- company detail market-signal tabs
- seller disclosure audit log by viewer and stage
- settlement statement and seller payout ledger
- richer FA service request / SLA queue

### P2 later

- external pricing feeds
- deeper valuation products
- marketplace analytics and reporting

## Why this structure was chosen

The user priority for this branch is a clear and executable business chain, not infra complexity.  
Because of that, the implementation intentionally uses a lightweight persisted workspace instead of introducing a database migration stack first.

This gives us:

- real state persistence
- real API boundaries
- one source of truth for page behavior
- a clean seam for replacing the file store with Postgres / Prisma later
