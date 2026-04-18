# VentureFlow PRD V2 字段字典 v1

日期：2026-04-18  
适用仓库：`ventureflow-prd-v2`  
适用分支：`prd-v2-implementation`

## 一、文档目的

这份字段字典用于统一：

- 产品文档中的业务名词
- 前端页面显示逻辑
- 后端对象和接口字段
- 管理端运营字段
- 测试用例口径

原则：

- 一个业务概念，尽量只对应一个主字段名
- 同一概念不要在不同模块里换名字
- 当前能明确的字段先定下来，后续扩展在这个基础上加

---

## 二、全局基础字段

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 主键 | `string` | 全局唯一标识 |
| `createdAt` | 创建时间 | `datetime` | 建议所有核心对象都有 |
| `updatedAt` | 更新时间 | `datetime` | 建议所有核心对象都有 |
| `status` | 当前状态 | `enum/string` | 具体状态值由各对象定义 |
| `ownerId` | 归属人 ID | `string` | 用于任务、审批、记录归属 |
| `notes` | 备注 | `string` | 用于补充业务说明 |
| `version` | 版本号 | `number` | 适合文档、报价、合同、KYC 记录 |

---

## 三、参与方与账户

## 3.1 ParticipantProfile

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 参与方 ID | `string` | 用户或主体唯一标识 |
| `displayName` | 显示名称 | `string` | 页面展示名 |
| `role` | 平台角色 | `enum` | `BUYER / SELLER / FA` |
| `businessRole` | 业务角色 | `enum` | 后续建议补充，支持 `BUYER / SELLER / GP / FA / LP` |
| `entityType` | 主体类型 | `enum` | `INDIVIDUAL / INSTITUTION / FAMILY_OFFICE / GP` |
| `region` | 区域 | `string` | 地域或司法辖区 |
| `kycStatus` | KYC 状态 | `enum` | `NOT_STARTED / IN_REVIEW / APPROVED / REJECTED` |
| `qualified` | 是否通过准入 | `boolean` | 当前简化为总开关 |
| `aumLabel` | AUM 展示值 | `string` | 前端展示使用 |
| `sourceOfFunds` | 资金来源说明 | `string` | 买方重点字段 |

## 3.2 建议后续补充字段

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `accreditationStatus` | 投资者资格状态 | `enum` | 买方必须使用 |
| `countryOfIncorporation` | 机构注册地 | `string` | KYB 场景使用 |
| `uboStatus` | UBO 核验状态 | `enum` | 机构场景使用 |
| `authorizedSignatoryStatus` | 授权签字人状态 | `enum` | 机构场景使用 |

---

## 四、KYC / KYB / FA 入驻

## 4.1 KYC 提交对象

建议对象名：`kyc_submissions`

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | KYC 记录 ID | `string` | |
| `participantId` | 参与方 ID | `string` | 对应账户主体 |
| `businessRole` | 业务角色 | `enum` | `BUYER / SELLER / GP / FA / LP` |
| `entityType` | 主体类型 | `enum` | 个人或机构 |
| `kycStatus` | KYC 状态 | `enum` | 主状态 |
| `accreditationStatus` | 投资者资格状态 | `enum` | 买方场景 |
| `ownershipVerified` | 权属是否完成 | `boolean` | 卖方场景 |
| `sourceOfFundsStatus` | 资金来源审查状态 | `enum` | 买方场景 |
| `riskAckVersion` | 风险披露版本 | `string` | 风险确认留痕 |
| `reviewStatus` | 审核状态 | `enum` | 细分审核流 |
| `reviewerRole` | 审核角色 | `enum` | `OPS / LEGAL / COMPLIANCE` |

## 4.2 KYC 文件对象

建议对象名：`kyc_documents`

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 文件记录 ID | `string` | |
| `kycSubmissionId` | 对应 KYC ID | `string` | |
| `documentType` | 文件类型 | `enum` | 例如 `ID_DOC / ADDRESS_PROOF / ACCREDITATION_PROOF / STOCK_CERTIFICATE` |
| `requiredForRole` | 适用角色 | `enum/string[]` | 哪类主体必须提交 |
| `reviewStatus` | 审核状态 | `enum` | `PENDING / APPROVED / REJECTED / EXPIRED` |
| `reviewerId` | 审核人 | `string` | |
| `rejectionReason` | 驳回原因 | `string` | |
| `expiresAt` | 到期时间 | `datetime` | 有效期管理 |
| `fileUrl` | 文件地址 | `string` | 存储地址 |

## 4.3 FAOnboardingApplication

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | FA 入驻记录 ID | `string` | |
| `faId` | FA ID | `string` | |
| `legalName` | 法律主体名 | `string` | |
| `region` | 区域 | `string` | |
| `qualificationDocsReady` | 资质文件是否齐全 | `boolean` | |
| `bankVerified` | 收款账户是否完成验证 | `boolean` | |
| `trainingCompleted` | 培训是否完成 | `boolean` | |
| `serviceAgreementSigned` | 平台服务协议是否签署 | `boolean` | |
| `status` | 入驻状态 | `enum` | `SUBMITTED / QUALIFICATION_REVIEW / BANK_PENDING / TRAINING_PENDING / ACTIVE` |

---

## 五、交易供需对象

## 5.1 BidOrder

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | Bid ID | `string` | |
| `buyerId` | 买方 ID | `string` | |
| `companyId` | 公司 ID | `string` | |
| `companyName` | 公司名 | `string` | |
| `tradeMode` | 交易方式 | `enum` | `L1 / L2 / DIRECT` |
| `shareClass` | 股份类别 | `string` | |
| `bidPriceLabel` | 报价展示值 | `string` | 当前前端展示字段 |
| `quantityLabel` | 数量展示值 | `string` | 当前前端展示字段 |
| `validUntil` | 有效截止日 | `date` | |
| `accreditedInvestor` | 是否为合格投资者 | `boolean` | 当前简化字段 |
| `conditions` | 条件列表 | `string[]` | |
| `status` | Bid 状态 | `enum` | |

### 建议后续扩展

- `priceValue`
- `priceCurrency`
- `quantityValue`
- `expiresAt`
- `withdrawnAt`
- `reconfirmedAt`
- `remainingQuantity`
- `parentOrderId`

## 5.2 AskOrder

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | Ask ID | `string` | |
| `sellerId` | 卖方 ID | `string` | |
| `sellerAlias` | 卖方别名 | `string` | 卖家隐私关键字段 |
| `companyId` | 公司 ID | `string` | |
| `companyName` | 公司名 | `string` | |
| `tradeMode` | 交易方式 | `enum` | |
| `shareClass` | 股份类别 | `string` | |
| `quantityLabel` | 数量展示值 | `string` | |
| `askPriceLabel` | 卖方报价展示值 | `string` | |
| `validityLabel` | 有效期展示值 | `string` | |
| `transferRestrictions` | 转让限制说明 | `string` | |
| `ownershipStatus` | 权属状态 | `enum` | `PENDING / VERIFIED / NEEDS_MORE_INFO` |
| `privacyLevel` | 隐私级别 | `enum` | `PUBLIC_ANONYMOUS / CONTROLLED_DISCLOSURE` |
| `status` | Ask 状态 | `enum` | |

### 建议后续扩展

- `expiresAt`
- `withdrawnAt`
- `reconfirmedAt`
- `transferabilityStatus`
- `ownershipRecordId`

## 5.3 ListingRecord

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | Listing ID | `string` | |
| `askOrderId` | 来源 ask ID | `string` | |
| `companyId` | 公司 ID | `string` | |
| `companyName` | 公司名 | `string` | |
| `tradeMode` | 交易方式 | `enum` | |
| `shareClass` | 股份类别 | `string` | |
| `priceRangeLabel` | 价格区间 | `string` | |
| `quantityRangeLabel` | 数量区间 | `string` | |
| `sellerAlias` | 卖方别名 | `string` | |
| `sellerVerification` | 卖方验证状态 | `enum` | |
| `disclosureStage` | 披露阶段 | `enum` | `ANONYMOUS / NDA_ONLY / NEGOTIATION_SUMMARY / LEGAL_DISCLOSURE` |
| `activeBidCount` | 活跃 bid 数 | `number` | |
| `activeMatchCount` | 活跃撮合数 | `number` | |
| `status` | Listing 状态 | `enum` | `ACTIVE / PAUSED` |

## 5.4 CompanyRule

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 规则 ID | `string` | |
| `companyId` | 公司 ID | `string` | |
| `companyName` | 公司名 | `string` | |
| `rofrRequired` | 是否需要 ROFR | `boolean` | |
| `boardApprovalRequired` | 是否需要董事会批准 | `boolean` | |
| `transferWindow` | 转让窗口说明 | `string` | |
| `eligibleInvestorType` | 允许投资者类型 | `string` | |
| `sellerPrivacyGuard` | 卖家隐私规则级别 | `enum` | `STRICT / CONTROLLED` |

## 5.5 MarketSignal / OrderBookEntry

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `referencePriceLabel` | 参考价 | `string` | |
| `lastTradeLabel` | 最近成交说明 | `string` | |
| `bidCount` | bid 数量 | `number` | |
| `askCount` | ask 数量 | `number` | |
| `momentum` | 市场趋势 | `enum` | `UP / STABLE / DOWN` |
| `side` | 买卖方向 | `enum` | `BID / ASK` |
| `visibility` | 可见性 | `enum` | `PUBLIC / NDA_ONLY` |

---

## 六、撮合与推荐

## 6.1 OrderMatch

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | Match ID | `string` | |
| `bidOrderId` | 对应 bid | `string` | |
| `askOrderId` | 对应 ask | `string` | |
| `companyName` | 公司名 | `string` | |
| `tradeMode` | 交易方式 | `enum` | |
| `matchScore` | 撮合分数 | `number` | |
| `status` | 撮合状态 | `enum` | `NEW / REVIEWING / NDA_REQUIRED / READY_FOR_NEGOTIATION / CONVERTED` |
| `leadFaId` | 主导 FA | `string` | |

## 6.2 FARecommendationLead

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 推荐记录 ID | `string` | |
| `faId` | FA ID | `string` | |
| `faName` | FA 名称 | `string` | |
| `prospectName` | prospect 名称 | `string` | |
| `prospectCompany` | prospect 所属机构 | `string` | |
| `prospectEmail` | prospect 邮箱 | `string` | |
| `targetCompany` | 目标公司 | `string` | |
| `recommendedListingId` | 对应 listing | `string` | |
| `tradeMode` | 交易方式 | `enum` | |
| `status` | 推荐绑定状态 | `enum` | |
| `rewardEligible` | 是否进入奖励轨道 | `boolean` | |
| `notes` | 备注 | `string` | |

## 6.3 NegotiationRecord

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 谈判记录 ID | `string` | |
| `dealId` | 对应 deal | `string` | |
| `companyName` | 公司名 | `string` | |
| `channel` | 谈判渠道 | `enum` | `CALL / MEETING / COUNTER_OFFER` |
| `summary` | 摘要 | `string` | |
| `priceSnapshotLabel` | 价格快照 | `string` | |
| `owner` | 记录归属人 | `string` | |
| `status` | 状态 | `enum` | `OPEN / LOCKED` |

---

## 七、签约、交割、托管、结算

## 7.1 PlatformMandateAgreement

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 协议 ID | `string` | |
| `side` | 买卖方方向 | `enum` | `BUYER / SELLER` |
| `principalName` | 签约主体名称 | `string` | |
| `principalType` | 主体类型 | `enum` | |
| `relatedDealId` | 对应 deal | `string` | |
| `relatedRecommendationId` | 对应推荐关系 | `string` | |
| `contractWith` | 合同对手方 | `enum` | 当前固定为 `PLATFORM` |
| `agreementType` | 协议类型 | `enum` | `BUYER_MANDATE / SELLER_MANDATE / PLATFORM_FEE_AGREEMENT` |
| `status` | 协议状态 | `enum` | |
| `signedDate` | 签署日期 | `date` | |

### 建议后续扩展

- `signingMethod`
- `witnessType`
- `witnessLawFirm`
- `certificationDocumentId`
- `paperPackReceivedAt`

## 7.2 DealRecord

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | Deal ID | `string` | |
| `listingId` | 来源 listing | `string` | |
| `bidOrderId` | 来源 bid | `string` | |
| `askOrderId` | 来源 ask | `string` | |
| `companyName` | 公司名 | `string` | |
| `tradeMode` | 交易方式 | `enum` | |
| `shareClass` | 股份类别 | `string` | |
| `amountLabel` | 金额展示值 | `string` | |
| `currentStage` | 当前交易阶段 | `enum` | |
| `disclosureStage` | 当前披露阶段 | `enum` | |
| `loiSigned` | LOI 是否完成 | `boolean` | |
| `dataRoomReady` | 资料室是否就绪 | `boolean` | |
| `escrowReady` | 托管是否就绪 | `boolean` | |
| `settlementReady` | 结算是否就绪 | `boolean` | |
| `leadFaTeamId` | 主导 FA 团队 | `string` | |

## 7.3 TransferApproval

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 审批记录 ID | `string` | |
| `dealId` | 对应 deal | `string` | |
| `companyName` | 公司名 | `string` | |
| `approvalType` | 审批类型 | `enum` | `ROFR / ISSUER_CONSENT / BOARD_APPROVAL` |
| `owner` | 责任人 | `string` | |
| `status` | 审批状态 | `enum` | |

### 建议后续扩展

- `approvedBy`
- `approvedAt`
- `rejectedReason`
- `issuerResponseDocumentId`

## 7.4 EscrowRecord

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 托管记录 ID | `string` | |
| `dealId` | 对应 deal | `string` | |
| `companyName` | 公司名 | `string` | |
| `accountLabel` | 托管账户说明 | `string` | |
| `amountLabel` | 金额展示值 | `string` | |
| `status` | 托管状态 | `enum` | |
| `paymentProofReady` | 付款凭证是否齐全 | `boolean` | |

### 建议后续扩展

- `paymentProofDocumentId`
- `fundedAt`
- `releasedAt`
- `releaseApprovedBy`

## 7.5 Settlement / Payout

建议后续新增两个对象：

### `settlement_statements`

| 字段名 | 中文含义 |
|---|---|
| `id` | 结算单 ID |
| `dealId` | Deal ID |
| `grossAmount` | 总金额 |
| `platformFee` | 平台费 |
| `referralRewardAmount` | 推荐奖励 |
| `netPayout` | 卖方净打款 |
| `taxNotes` | 税费说明 |
| `statementStatus` | 结算单状态 |

### `seller_payouts`

| 字段名 | 中文含义 |
|---|---|
| `id` | 打款记录 ID |
| `dealId` | Deal ID |
| `bankAccountId` | 收款账户 ID |
| `amount` | 打款金额 |
| `currency` | 币种 |
| `payoutStatus` | 打款状态 |
| `releasedAt` | 放款时间 |
| `receiptConfirmedAt` | 卖方确认时间 |

---

## 八、奖励与团队协作

## 8.1 FATeam / FATeamMember

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 团队 ID | `string` | |
| `name` | 团队名 | `string` | |
| `status` | 团队状态 | `enum` | `ACTIVE / PENDING` |
| `members` | 成员列表 | `array` | |
| `faId` | 成员 FA ID | `string` | |
| `role` | 成员分工 | `enum` | `LEAD_FA / SELLER_FA / BUYER_FA / NEGOTIATOR / EXECUTOR` |
| `commissionRatio` | 分佣比例 | `number` | 建议 0~1 |

## 8.2 ReferralRewardRecord

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 奖励记录 ID | `string` | |
| `recommendationId` | 来源推荐记录 | `string` | |
| `faId` | FA ID | `string` | |
| `relatedDealId` | 对应 deal | `string` | |
| `trigger` | 奖励触发点 | `enum` | `DEAL_SIGNED / SETTLEMENT_COMPLETE` |
| `rewardType` | 奖励类型 | `enum` | 当前为推荐奖励 |
| `amountLabel` | 奖励金额展示值 | `string` | |
| `status` | 奖励状态 | `enum` | `PENDING / APPROVED / PAID` |

---

## 九、运营任务与审计

## 9.1 DashboardTask

| 字段名 | 中文含义 | 类型建议 | 说明 |
|---|---|---|---|
| `id` | 任务 ID | `string` | |
| `companyName` | 公司名 | `string` | |
| `owner` | 负责人 | `string` | |
| `title` | 任务标题 | `string` | |
| `dueLabel` | 截止时间展示值 | `string` | 当前展示字段 |
| `status` | 任务状态 | `enum` | `OPEN / IN_PROGRESS / DONE` |
| `relatedEntity` | 关联对象类型 | `enum` | `KYC / ASK / DEAL / ESCROW / APPROVAL` |

## 9.2 审计建议统一字段

建议后续所有关键动作都统一保留：

- `actedBy`
- `actedAt`
- `actionType`
- `entityType`
- `entityId`
- `beforeValue`
- `afterValue`
- `reason`

---

## 十、建议统一的枚举值

## 10.1 Trade mode

- `L1`
- `L2`
- `DIRECT`

## 10.2 Disclosure stage

- `ANONYMOUS`
- `NDA_ONLY`
- `NEGOTIATION_SUMMARY`
- `LEGAL_DISCLOSURE`

## 10.3 Recommendation status

- `PROSPECTED`
- `INTRO_SENT`
- `BOUND_TO_FA`
- `KYC_STARTED`
- `REGISTERED`
- `DEAL_LINKED`

## 10.4 Agreement status

- `DRAFT`
- `PENDING_SIGNATURE`
- `SIGNED`
- `ACTIVE`
- `COMPLETED`

## 10.5 Deal stage

- `LISTED`
- `NEGOTIATING`
- `LOI_SIGNED`
- `DILIGENCE`
- `SPA_SIGNED`
- `ESCROW_FUNDED`
- `TRANSFER_IN_PROGRESS`
- `SETTLEMENT_PENDING`
- `COMPLETED`

## 10.6 Transfer approval status

- `PENDING`
- `ISSUER_REVIEW`
- `ROFR_WINDOW`
- `APPROVED`
- `REJECTED`

## 10.7 Escrow status

- `DRAFT`
- `AWAITING_FUNDS`
- `FUNDED`
- `FROZEN`
- `RELEASED`

---

## 十一、后续维护建议

这份字段字典建议每次做下面这些动作时同步更新：

1. 新增对象
2. 新增状态
3. 产品改名词
4. 接口重命名
5. 后台运营新增任务类型

建议以后每个版本都带版本号，例如：

- `字段字典 v1`
- `字段字典 v1.1`
- `字段字典 v2`
