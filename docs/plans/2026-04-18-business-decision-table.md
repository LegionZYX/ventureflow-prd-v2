# VentureFlow PRD V2 Business Decision Table

Date: 2026-04-18  
Repo line: `ventureflow-prd-v2 / prd-v2-implementation`

## Purpose

This document is the shared decision sheet for product, design, and engineering.

It does two things:

1. Lists the business decisions that are already confirmed.
2. Lists the business decisions that still need owner confirmation, together with the technical objects and field names they should map to.

The goal is to keep product wording and implementation wording aligned, so PRD discussions, backend models, admin operations, and UI copy all refer to the same concepts.

---

## 1. Confirmed Baseline

These points are already treated as confirmed in the current V2 branch.

| Area | Confirmed rule | Product wording | Technical mapping |
|---|---|---|---|
| Trade modes | Only `L1`, `L2`, `DIRECT` are in scope | Primary, anonymous secondary, direct trade | `tradeMode` |
| Seller privacy | Seller identity is not publicly exposed before the required stage | Anonymous listing / controlled disclosure | `sellerAlias`, `privacyLevel`, `disclosureStage` |
| Buyer-side signing | Buyer signs with platform, not with FA | Buyer mandate / platform fee agreement | `PlatformMandateAgreement.side=BUYER`, `contractWith=PLATFORM` |
| Seller-side signing | Seller or GP signs with platform | Seller mandate | `PlatformMandateAgreement.side=SELLER`, `contractWith=PLATFORM` |
| FA recommendation | FA may recommend assets to unregistered buyers and keep source attribution | Recommendation binding | `FARecommendationLead`, `ReferralRewardRecord` |
| Signing method | E-sign is optional; paper signing is allowed only with lawyer witnessing or equivalent legal certification | Signing method rule | Needs explicit signing-method fields next |
| Buyer KYC | Buyer must pass identity and investor qualification before active execution | Buyer KYC / accredited investor | `kycStatus`, `qualified`, future `accreditationStatus` |
| Seller verification | Seller must pass identity and ownership proof before listing activation | Seller ownership / transferability review | `ownershipStatus`, future `ownershipRecords` |
| FA onboarding | FA must pass qualification, bank, and training readiness | FA onboarding | `FAOnboardingApplication` |

---

## 2. Business-to-Technical Field Map

This section standardizes the main business chain and the fields each step should own.

### 2.1 Registration and KYC

| Business object | Product meaning | Canonical technical object | Core fields |
|---|---|---|---|
| User / participant | Buyer, seller, FA, or institutional actor | `ParticipantProfile` | `id`, `displayName`, `role`, `entityType`, `region`, `kycStatus`, `qualified` |
| Buyer KYC submission | Buyer identity + investor qualification | future `kyc_submissions` | `businessRole`, `entityType`, `kycStatus`, `accreditationStatus`, `sourceOfFundsStatus`, `riskAckVersion` |
| Seller KYC submission | Seller identity + ownership readiness | future `kyc_submissions` + `ownership_records` | `businessRole`, `ownershipVerified`, `transferabilityStatus` |
| Institution KYB | Entity verification | future `kyb_submissions` or role-aware `kyc_submissions` | `companyName`, `registrationNumber`, `countryOfIncorporation`, `uboStatus`, `authorizedSignatoryStatus` |
| FA onboarding | FA admission workflow | `FAOnboardingApplication` | `qualificationDocsReady`, `bankVerified`, `trainingCompleted`, `serviceAgreementSigned`, `status` |

### 2.2 Supply and Demand Intake

| Business object | Product meaning | Canonical technical object | Core fields |
|---|---|---|---|
| Buyer bid | Structured buy order | `BidOrder` | `companyId`, `companyName`, `tradeMode`, `shareClass`, `bidPriceLabel`, `quantityLabel`, `validUntil`, `status` |
| Seller ask | Structured sell order | `AskOrder` | `sellerId`, `sellerAlias`, `companyId`, `tradeMode`, `shareClass`, `askPriceLabel`, `quantityLabel`, `ownershipStatus`, `status` |
| Listing | Approved ask visible to the market | `ListingRecord` | `askOrderId`, `companyId`, `priceRangeLabel`, `quantityRangeLabel`, `sellerAlias`, `disclosureStage`, `status` |
| Company rule | Issuer-level transfer restriction logic | `CompanyRule` | `rofrRequired`, `boardApprovalRequired`, `transferWindow`, `eligibleInvestorType`, `sellerPrivacyGuard` |
| Market signal | Company-level demand and pricing reference | `MarketSignal` | `referencePriceLabel`, `lastTradeLabel`, `bidCount`, `askCount`, `momentum` |
| Order book entry | Bid / ask view at company level | `OrderBookEntry` | `side`, `tradeMode`, `priceLabel`, `quantityLabel`, `visibility`, `status` |

### 2.3 Match and Negotiation

| Business object | Product meaning | Canonical technical object | Core fields |
|---|---|---|---|
| Match | Bid/ask pairing candidate | `OrderMatch` | `bidOrderId`, `askOrderId`, `matchScore`, `status`, `leadFaId` |
| Negotiation log | Structured commercial negotiation record | `NegotiationRecord` | `dealId`, `channel`, `summary`, `priceSnapshotLabel`, `owner`, `status` |
| FA recommendation lead | FA-sourced, not-yet-registered buyer lead | `FARecommendationLead` | `faId`, `prospectName`, `prospectEmail`, `recommendedListingId`, `status`, `rewardEligible` |

### 2.4 Deal Execution

| Business object | Product meaning | Canonical technical object | Core fields |
|---|---|---|---|
| Deal | Formal execution record | `DealRecord` | `listingId`, `bidOrderId`, `askOrderId`, `companyName`, `tradeMode`, `currentStage`, `leadFaTeamId` |
| Platform agreement | Buyer-side or seller-side legal agreement with the platform | `PlatformMandateAgreement` | `side`, `principalName`, `agreementType`, `status`, `signedDate`, `relatedDealId` |
| Transfer approval | ROFR / issuer consent / board approval step | `TransferApproval` | `dealId`, `approvalType`, `owner`, `status` |
| Escrow record | Escrow and payment-proof step | `EscrowRecord` | `dealId`, `accountLabel`, `amountLabel`, `status`, `paymentProofReady` |
| Dashboard task | Operational action item | `DashboardTask` | `companyName`, `owner`, `title`, `dueLabel`, `status`, `relatedEntity` |

### 2.5 Incentives and Settlement

| Business object | Product meaning | Canonical technical object | Core fields |
|---|---|---|---|
| FA team | Delivery team and split ownership | `FATeam`, `FATeamMember` | `members`, `role`, `commissionRatio` |
| Referral reward | Reward for recommendation source | `ReferralRewardRecord` | `recommendationId`, `relatedDealId`, `trigger`, `amountLabel`, `status` |
| Settlement statement | Final commercial statement for seller and platform | future `settlement_statements` | `dealId`, `grossAmount`, `platformFee`, `netPayout`, `taxNotes`, `status` |
| Seller payout | Actual outbound payment to seller | future `seller_payouts` | `dealId`, `bankAccountId`, `amount`, `currency`, `payoutStatus`, `paidAt` |

---

## 3. Decision Table: Pending Business Confirmations

These are the main items still needing final business confirmation.

| ID | Topic | Decision question | Recommended default | Alternative options | Technical objects | Core fields to lock |
|---|---|---|---|---|---|---|
| D-01 | Bid / ask lifecycle | Can users edit, withdraw, reconfirm, and partially fill live orders? | Allow edit before match; allow withdraw anytime before formal deal; expire by validity date; reconfirm after expiry warning; support partial fill only after admin-confirmed match split | A. No edit after submission. B. Allow full self-service edit. C. No partial fill in V2 | `BidOrder`, `AskOrder`, `OrderBookEntry`, `OrderMatch` | `status`, `validUntil`, future `expiresAt`, `withdrawnAt`, `reconfirmedAt`, `remainingQuantity` |
| D-02 | Document review | Who reviews which KYC and ownership documents, and in how many rounds? | Auto checks first, then ops review, then legal/compliance review only for exceptions or high-risk cases | A. Ops only. B. Legal must review every file | future `kyc_submissions`, `kyc_documents`, `ownership_records`, `DashboardTask` | `reviewStatus`, `reviewerRole`, `rejectionReason`, `requiredForRole`, `expiresAt` |
| D-03 | Paper signing evidence | What exact evidence is acceptable when replacing e-sign with paper signing? | Signed pack + lawyer witnessing letter or notarized certification + scanned copy uploaded before stage advance | A. Only lawyer witness. B. Notary only. C. Original courier receipt also required | `PlatformMandateAgreement`, future `contract_documents` | future `signingMethod`, `witnessType`, `witnessLawFirm`, `paperPackReceivedAt`, `certificationDocumentId` |
| D-04 | Seller disclosure boundary | At which stages can seller identity, contact details, and full ownership files be shown, and to whom? | Identity remains hidden until NDA or legally required stage; full ownership files visible only to approved internal roles plus the required external counterparty during approval/signing | A. Reveal at match. B. Reveal only at SPA. C. Reveal separately for ROFR vs counterparty | `ListingRecord`, `DealRecord`, future `seller_disclosures`, `ownership_records` | `disclosureStage`, future `disclosedToRole`, `disclosedToUserId`, `reason`, `approvedBy`, `disclosedAt` |
| D-05 | Settlement and payout | When is settlement statement generated, and when can seller payout be released? | Generate settlement statement after transfer approval and funded escrow; release payout only after transfer evidence and finance confirmation | A. Generate at SPA. B. Payout immediately after escrow release. C. Seller confirms receipt before deal close | `EscrowRecord`, future `settlement_statements`, future `seller_payouts`, `DealRecord` | future `statementStatus`, `grossAmount`, `platformFee`, `netPayout`, `payoutStatus`, `releasedAt`, `receiptConfirmedAt` |
| D-06 | FA service boundary | What can FA do after recommendation binding? | FA can recommend, coordinate, follow up, submit structured negotiation context, and upload documents on behalf of client only with explicit authority | A. FA only tracks. B. FA can act as full delegated operator. C. Different boundary by FA role | `FARecommendationLead`, `FATeam`, `NegotiationRecord`, future `delegated_permissions` | future `authorityScope`, `canUploadDocs`, `canSubmitBid`, `canAcceptTerms`, `delegationSource` |

---

## 4. Suggested Field Naming Standard

Use these names consistently in PRD, API, admin, and analytics.

| Business meaning | Preferred field |
|---|---|
| Trade mode | `tradeMode` |
| Business role | `businessRole` |
| Entity type | `entityType` |
| Seller alias | `sellerAlias` |
| Disclosure stage | `disclosureStage` |
| Signing method | `signingMethod` |
| Lawyer witness type | `witnessType` |
| Accredited investor status | `accreditationStatus` |
| Ownership verification | `ownershipVerified` or `ownershipStatus` |
| Transferability status | `transferabilityStatus` |
| Payout status | `payoutStatus` |
| Reward eligibility | `rewardEligible` |
| Recommendation binding status | `status` under `FARecommendationLead` |
| Transfer approval status | `status` under `TransferApproval` |
| Escrow status | `status` under `EscrowRecord` |

---

## 5. Suggested Status Standards

Keep status vocabularies narrow and stable.

### 5.1 Order status

- `DRAFT`
- `SUBMITTED`
- `COMPLIANCE_REVIEW`
- `ACTIVE`
- `MATCHED`
- `NEGOTIATING`
- `DEAL_CREATED`
- `EXPIRED`
- `WITHDRAWN`

### 5.2 Recommendation status

- `PROSPECTED`
- `INTRO_SENT`
- `BOUND_TO_FA`
- `KYC_STARTED`
- `REGISTERED`
- `DEAL_LINKED`

### 5.3 Agreement status

- `DRAFT`
- `PENDING_SIGNATURE`
- `SIGNED`
- `ACTIVE`
- `COMPLETED`

### 5.4 Deal stage

- `LISTED`
- `NEGOTIATING`
- `LOI_SIGNED`
- `DILIGENCE`
- `SPA_SIGNED`
- `ESCROW_FUNDED`
- `TRANSFER_IN_PROGRESS`
- `SETTLEMENT_PENDING`
- `COMPLETED`

### 5.5 Approval and escrow status

Transfer approval:

- `PENDING`
- `ISSUER_REVIEW`
- `ROFR_WINDOW`
- `APPROVED`
- `REJECTED`

Escrow:

- `DRAFT`
- `AWAITING_FUNDS`
- `FUNDED`
- `FROZEN`
- `RELEASED`

---

## 6. Recommended Next Product Review Agenda

If we want to keep momentum, the next review should lock these in order:

1. `D-03` paper signing evidence
2. `D-04` seller disclosure boundary
3. `D-05` settlement and payout release rule
4. `D-01` bid / ask edit-withdraw-reconfirm lifecycle
5. `D-06` FA service boundary
6. `D-02` document review routing

This order reduces downstream rework, because contract evidence, disclosure, and payout rules affect the largest number of screens and backend objects.
