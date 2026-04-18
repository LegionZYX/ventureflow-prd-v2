# VentureFlow PRD V2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the current demo around the PRD V2 trading chain so the product clearly expresses KYC, bid/ask, FA collaboration, deal progression, escrow, transfer, and settlement.

**Architecture:** Keep the current Next.js demo shell, but replace page-local mock logic with a shared PRD V2 business model layer. Build the first implementation around a minimum executable chain: role entry -> bid/ask creation -> listing visibility -> match -> deal stage progression. Delay real backend integration and keep the first milestone focused on business clarity.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, local mock/state utilities.

---

### Task 1: Lock the V2 business baseline

**Files:**
- Reference: `docs/PRD-VentureFlow-PRD-V2-统一基准版.md`
- Reference: `docs/05-Bid买方卖方FA交易流程设计.md`
- Create: `lib/trading-v2.ts`

**Step 1: Define the shared V2 enums and types**

Create one source of truth for:
- `trade_mode`: `L1 | L2 | DIRECT`
- bid, ask, listing, match, deal, and FA team statuses
- disclosure stage and KYC guard fields

**Step 2: Add minimal PRD-shaped mock datasets**

Model:
- buyer leads
- seller asks
- public listings
- bid orders
- order matches
- deals
- FA teams

**Step 3: Add helper selectors**

Expose helpers for:
- dashboard summaries
- active listings
- bid/ask registry views
- deal pipeline counts
- PRD stage labels

**Step 4: Verify imports compile**

Run: `npm run build`

**Step 5: Commit**

```bash
git add lib/trading-v2.ts
git commit -m "feat: add prd v2 trading domain model"
```

### Task 2: Refactor the public intent entry flow

**Files:**
- Modify: `app/sell/page.tsx`
- Reference: `lib/trading-v2.ts`

**Step 1: Replace generic “buy/sell intent” language with PRD V2 language**

Clarify:
- buyer submits `Bid`
- seller submits `Ask`
- both are gated by KYC or ownership verification

**Step 2: Show the minimum executable chain**

Display:
- buyer path: KYC -> NDA -> bid -> match -> deal
- seller path: KYC/KYB -> ownership verification -> ask -> listing -> negotiation

**Step 3: Align forms to PRD fields**

Add fields for:
- `trade_mode`
- share class
- validity window
- conditions
- ownership/transfer restriction

**Step 4: Keep the flow demo-friendly**

Submit actions can stay simulated, but they must clearly produce a PRD object outcome instead of generic alert copy.

**Step 5: Commit**

```bash
git add app/sell/page.tsx
git commit -m "feat: align intent entry flow with prd v2 bid ask model"
```

### Task 3: Refactor the public marketplace view

**Files:**
- Modify: `app/opportunities/page.tsx`
- Modify: `app/opportunities/[company]/page.tsx`
- Reference: `lib/trading-v2.ts`

**Step 1: Make listings PRD-native**

Every listing should show:
- company
- `trade_mode`
- share class
- price range
- quantity range
- seller privacy badge
- verification status

**Step 2: Add “market signal” structure**

Show:
- open asks
- matching bids
- active deal count
- whether the listing is L1, L2, or DIRECT

**Step 3: Preserve seller anonymity**

Use:
- seller alias
- verification badges
- no real seller identity in public view

**Step 4: Commit**

```bash
git add app/opportunities/page.tsx app/opportunities/[company]/page.tsx
git commit -m "feat: refactor marketplace around prd v2 listings"
```

### Task 4: Refactor the management registry view

**Files:**
- Modify: `app/dashboard/intent-registry/page.tsx`
- Reference: `lib/trading-v2.ts`

**Step 1: Replace “buy/sell intents” with bid/ask registry**

Split the registry into:
- bid orders
- ask orders
- listings
- match queue

**Step 2: Surface the real guards**

Show columns for:
- KYC state
- accredited investor gate
- ownership verification
- transfer restriction
- valid until

**Step 3: Add operational status labels**

Examples:
- `NeedMoreInfo`
- `ComplianceReview`
- `ActiveListing`
- `Negotiating`

**Step 4: Commit**

```bash
git add app/dashboard/intent-registry/page.tsx
git commit -m "feat: add prd v2 bid ask registry view"
```

### Task 5: Refactor the deal pipeline

**Files:**
- Modify: `app/dashboard/deals/page.tsx`
- Reference: `lib/trading-v2.ts`

**Step 1: Use PRD V2 stages instead of generic statuses**

Show:
- `已上架`
- `洽谈中`
- `LOI 已签署`
- `尽调中`
- `协议已签署`
- `资金托管中`
- `股权交割中`
- `待结算`
- `已完成`

**Step 2: Add trade chain visibility**

For each deal show:
- originating bid and ask
- trade mode
- current stage
- seller disclosure stage
- escrow readiness
- settlement readiness

**Step 3: Expose FA team involvement**

Include:
- lead FA
- team roles
- expected commission state

**Step 4: Commit**

```bash
git add app/dashboard/deals/page.tsx
git commit -m "feat: align deal pipeline with prd v2 lifecycle"
```

### Task 6: Clean navigation and framing

**Files:**
- Modify: `components/DashboardLayout.tsx`
- Modify: `components/BuyerLayout.tsx`
- Modify: `contexts/LangContext.tsx`

**Step 1: Update labels to PRD V2 terminology**

Normalize:
- marketplace
- bid / ask
- FA workspace
- deal pipeline
- holdings / verified assets

**Step 2: Remove contradictory legacy wording**

Avoid mixing:
- “intent registry”
- “sell page”
- “buyer portal”
when the page is really showing PRD V2 trading steps.

**Step 3: Commit**

```bash
git add components/DashboardLayout.tsx components/BuyerLayout.tsx contexts/LangContext.tsx
git commit -m "chore: normalize navigation around prd v2 terminology"
```

### Task 7: Verify and prepare new-repo publication

**Files:**
- Reference: repository root

**Step 1: Run verification**

Run:
- `npm run build`
- `npm run lint`

**Step 2: Review diff against original baseline**

Check:
- public marketplace
- public bid/ask entry
- admin registry
- deal pipeline

**Step 3: Prepare new remote workflow**

Suggested commands:

```bash
git checkout -b prd-v2-implementation
git remote add v2 <NEW_REPO_URL>
git push -u v2 prd-v2-implementation
```

**Step 4: Record next phase**

Next phase after this milestone:
- KYC center
- FA onboarding workspace
- contract/data room shell
- escrow/settlement shell

