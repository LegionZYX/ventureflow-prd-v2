# VentureFlow PRD V2 业务评审包

日期：2026-04-18  
适用仓库：`ventureflow-prd-v2`  
适用分支：`prd-v2-implementation`

## 一、这份文档怎么用

这份文档是给产品经理、业务负责人、开发一起开评审会用的。

建议开会时按下面顺序讨论：

1. 先过“已经确认的规则”
2. 再逐项确认“待拍板业务问题”
3. 每项都直接确定默认方案，不留模糊口径
4. 会后由产品把结论同步回 PRD，由开发按字段口径落库和实现

---

## 二、已经确认的业务规则

这些内容在当前 V2 分支中已经视为确认，不建议反复摇摆。

### 1. 交易方式范围

- 当前只做 `L1`
- 当前只做 `L2`
- 当前只做 `DIRECT`
- 本阶段不把基金/SPV/RWA 碎片化交易作为主流程

### 2. 卖家隐私规则

- 卖家身份不是默认公开信息
- `L2` 默认匿名展示
- `DIRECT` 也不是一开始就全面披露
- 只有在 NDA、法务、ROFR、托管、签约、交割等必要阶段，才按最小必要范围披露

### 3. FA 推荐规则

- FA 可以先向未注册买家推荐资产
- 买家接受后，与 FA 形成推荐绑定关系
- 后续如果成交，FA 可以获得推荐奖励
- 推荐绑定只决定归因和奖励，不改变法律签约对象

### 4. 平台签约规则

- 买方正式协议是和平台签
- 卖方正式协议也是和平台签
- FA 不是买卖双方的法律签约对手方

### 5. 签约方式规则

- 电子签可以用
- 纸质签也可以用
- 但纸质签约必须附律师鉴证，或等效法律认证文件

### 6. KYC / KYB 总规则

- 买方必须完成身份验证和投资者资格验证
- 卖方必须完成身份验证和权属证明
- 机构必须完成 KYB、授权代表、UBO/控制人核验
- FA 必须完成资质、收款账户、培训和入驻审核

---

## 三、待确认业务问题总览

本轮还需要拍板的，主要是 6 个问题。

| 编号 | 主题 | 为什么现在必须确认 |
|---|---|---|
| D-01 | Bid / Ask 生命周期 | 影响订单簿、撮合、前端操作按钮、管理端审核 |
| D-02 | KYC/权属文档审核机制 | 影响审核流程、任务流、文档状态、补件规则 |
| D-03 | 纸质签约的验真标准 | 影响合同流、法务流、交割前状态推进 |
| D-04 | 卖家信息披露边界 | 影响前台展示、资料室权限、审计和合规 |
| D-05 | 结算单与卖方打款规则 | 影响财务流、托管流、状态推进、佣金结算 |
| D-06 | FA 服务边界 | 影响 FA 权限设计、代操作范围、责任边界 |

---

## 四、逐项评审清单

## D-01 Bid / Ask 生命周期

### 问题

当前还没有完全确认：

- 提交后的 bid / ask 能不能改
- 能不能撤回
- 到期后能不能续期
- 能不能部分成交
- 部分成交后剩余份额如何继续挂单

### 建议默认方案

- 提交后允许修改，但仅限未进入正式 match / deal 之前
- 未进入 deal 前允许撤回
- 到期前给提醒
- 到期后允许 reconfirm，不建议直接自动续期
- 部分成交允许，但必须走管理端确认拆分

### 为什么我建议这样定

- 太严格会导致业务推进不灵活
- 太宽松会让 order book 不可信
- “允许改，但有边界”最适合当前 V2 阶段

### 对应技术对象

- `BidOrder`
- `AskOrder`
- `OrderBookEntry`
- `OrderMatch`

### 对应字段建议

- `status`
- `validUntil`
- 后续新增：
  - `expiresAt`
  - `withdrawnAt`
  - `reconfirmedAt`
  - `remainingQuantity`
  - `parentOrderId`

### 会上要拍板的问题

1. 部分成交是不是 V2 就上线
2. reconfirm 是用户主动点，还是系统提醒后默认延续
3. 修改后是否要重新审核

---

## D-02 KYC / 权属文档审核机制

### 问题

现在材料范围已经基本明确，但审核机制还没定死：

- 谁来审
- 审几轮
- 什么情况下要法务介入
- 驳回后怎么补件
- 文件是否有有效期

### 建议默认方案

- 第一层：自动规则校验
- 第二层：运营审核
- 第三层：法务/合规仅处理高风险或特殊案例
- 补件后回到上一审核层，不全部重走
- 身份、地址、投资者资格、银行账户等支持有效期管理

### 为什么我建议这样定

- 如果全部都要法务审，流程太重
- 如果只有运营审，复杂交易风险太高
- 分层审核是最稳的

### 对应技术对象

- 后续 `kyc_submissions`
- 后续 `kyc_documents`
- 后续 `ownership_records`
- `DashboardTask`

### 对应字段建议

- `reviewStatus`
- `reviewerRole`
- `rejectionReason`
- `requiredForRole`
- `expiresAt`
- `resubmittedAt`

### 会上要拍板的问题

1. 哪些文件必须法务参与
2. 文件有效期是否统一 90 天 / 180 天 / 365 天
3. 卖方权属材料是否必须双人复核

---

## D-03 纸质签约验真标准

### 问题

我们已经确认纸质签约可以替代电子签，但还没完全确认：

- 什么证明算“律师鉴证”
- 是否接受 notarization
- 是否接受仅上传扫描件
- 是否必须上传原件签署页

### 建议默认方案

- 接受纸质签约
- 但必须同时满足：
  - 签字页扫描件
  - 律师见证函或等效法律认证文件
  - 平台法务审核通过

### 可选收紧方案

- 必须上传整套签署包
- 必须上传律师事务所盖章见证函
- 必须由平台确认原件已收或可追溯

### 对应技术对象

- `PlatformMandateAgreement`
- 后续 `contract_documents`

### 对应字段建议

- `signingMethod`
- `witnessType`
- `witnessLawFirm`
- `paperPackReceivedAt`
- `certificationDocumentId`

### 会上要拍板的问题

1. notarization 能不能替代律师见证
2. 是否必须记录律师事务所名称
3. 平台是否必须保留纸质原件或原件追踪信息

---

## D-04 卖家信息披露边界

### 问题

现在只确认了“卖家隐私必须保护”，但还没拍板：

- 哪个阶段可以看到实名
- 哪个阶段可以看到联系方式
- 哪个阶段可以看到完整权属文件
- 哪些角色可以看
- 每次披露是否都要留审批和审计

### 建议默认方案

- 前台公开页：只看 seller alias
- NDA 前：不看实名、不看联系方式、不看完整权属材料
- NDA 后：允许看最小必要交易信息
- ROFR / 法务 / SPA / 托管阶段：按需披露实名和必要材料
- 完整权属文件仅限必要内部角色与被批准外部对手方可见

### 为什么我建议这样定

- 这最符合你们现在的交易模式和 PRD V2 的安全要求
- 也最接近 Forge 的匿名卖盘逻辑

### 对应技术对象

- `ListingRecord`
- `DealRecord`
- 后续 `seller_disclosures`
- 后续 `ownership_records`

### 对应字段建议

- `disclosureStage`
- `disclosedToRole`
- `disclosedToUserId`
- `reason`
- `approvedBy`
- `disclosedAt`

### 会上要拍板的问题

1. `DIRECT` 是否在 match 时就能实名
2. 买方是否必须先签 NDA 才能看卖方主体
3. 完整权属材料是否只允许平台法务下载

---

## D-05 结算单与卖方打款规则

### 问题

现在托管和 transfer 已经有主链骨架，但还没定：

- 什么时候生成 settlement statement
- 平台费怎么列
- 什么时候能放款给卖方
- 卖方是否要确认到账后才能完结 deal

### 建议默认方案

- transfer approval 完成后生成结算单
- escrow 到账并冻结后，待股权交割确认，再释放打款
- 平台费、推荐奖励、净额全部在结算单里体现
- 卖方确认收款后，deal 才允许进入最终 completed

### 对应技术对象

- `EscrowRecord`
- 后续 `settlement_statements`
- 后续 `seller_payouts`
- `DealRecord`

### 对应字段建议

- `statementStatus`
- `grossAmount`
- `platformFee`
- `netPayout`
- `payoutStatus`
- `releasedAt`
- `receiptConfirmedAt`

### 会上要拍板的问题

1. 卖方是否必须点击确认收款
2. 平台费是在结算单里直扣还是单独列单
3. 税费备注是展示说明还是进入正式对账单

---

## D-06 FA 服务边界

### 问题

现在 FA 的推荐绑定和奖励已经明确，但后续权限边界还没完全确认：

- FA 只能推荐，还是能代客户推进
- FA 能不能上传材料
- FA 能不能提交 bid
- FA 能不能接受商业条款
- FA 能不能代签或代确认

### 建议默认方案

- FA 可以推荐和跟进
- FA 可以提交结构化推进信息
- FA 可以代上传材料，但必须有明确授权
- FA 不能默认代签
- FA 不能默认代替客户接受最终法律条款

### 为什么我建议这样定

- 这样既保留 FA 的服务价值，又不会把法律责任边界搞乱

### 对应技术对象

- `FARecommendationLead`
- `FATeam`
- `NegotiationRecord`
- 后续 `delegated_permissions`

### 对应字段建议

- `authorityScope`
- `canUploadDocs`
- `canSubmitBid`
- `canAcceptTerms`
- `delegationSource`

### 会上要拍板的问题

1. FA 是否能代买方提交正式 bid
2. FA 是否能代客户上传身份证明
3. FA 的授权是一次性还是按 deal 生效

---

## 五、建议这次会议直接形成的结论

如果想减少后面返工，建议这次会议至少拍板以下内容：

1. 纸质签约的法律验真标准
2. 卖家披露边界
3. 结算单和卖方打款触发条件
4. bid / ask 是否允许修改、撤回、续期、部分成交
5. FA 是否允许代上传、代提交、代推进到什么程度

---

## 六、给产品经理和开发的统一口径

以后在产品文档、原型、接口设计、开发实现里，尽量统一用以下名词：

- 交易方式：`tradeMode`
- 业务角色：`businessRole`
- 卖家别名：`sellerAlias`
- 披露阶段：`disclosureStage`
- 签约方式：`signingMethod`
- 投资者资格：`accreditationStatus`
- 权属状态：`ownershipStatus`
- 可转让性状态：`transferabilityStatus`
- 打款状态：`payoutStatus`
- 推荐奖励状态：`ReferralRewardRecord.status`
- 交割审批状态：`TransferApproval.status`
- 托管状态：`EscrowRecord.status`

---

## 七、建议下一步输出

这份会后我建议继续补两份文件：

1. 《字段字典 v1》
   - 把核心对象字段全部列成 dictionary
2. 《状态机总表 v1》
   - 把 bid、ask、recommendation、agreement、deal、approval、escrow 全部列成状态图

这样产品、设计、前端、后端就能真正共享一套语言。
