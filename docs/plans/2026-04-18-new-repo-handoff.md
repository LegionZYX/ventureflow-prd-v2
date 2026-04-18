# New Repo Handoff

## Goal

Keep the original repository as the historical baseline, while continuing PRD V2 implementation on a separate line that can later be pushed to a brand new GitHub repository for comparison.

## Current Local Setup

- Base repository: `LegionZYX/ventureflow-fa-backend`
- Local implementation branch: `prd-v2-implementation`
- Working method: continue from the existing codebase instead of rebuilding from scratch

## Recommended Push Flow

1. Create a new empty GitHub repository for the V2 implementation.
2. Add it as a second remote:

```bash
git remote add v2 <NEW_REPO_URL>
```

3. Push the implementation branch to the new repository:

```bash
git push -u v2 prd-v2-implementation:main
```

4. Keep the original repository remote untouched for baseline comparison.

## Comparison Strategy

- Original product baseline:
  - original repo `main`
- PRD V2 implementation:
  - new repo `main`
  - or original repo local branch `prd-v2-implementation`

This makes it easy to compare:

- feature coverage
- information architecture
- business flow changes
- page-level refactors
- later backend/API work

## Immediate Next Development Focus

1. Expand registry review into clearer compliance actions:
   - KYC review
   - ownership review
   - disclosure approval
2. Turn deal pipeline into execution checklist views:
   - LOI
   - due diligence
   - SPA
   - escrow
   - settlement
3. Unify remaining old demo pages with PRD V2 language:
   - buyers
   - orders
   - agreements
   - commission
4. Add a lightweight mock workflow state layer so actions can advance records across pages.
