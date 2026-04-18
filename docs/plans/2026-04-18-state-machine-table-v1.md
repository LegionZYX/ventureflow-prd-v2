# VentureFlow PRD V2 状态机总表 v1

日期：2026-04-18  
适用仓库：`ventureflow-prd-v2`  
适用分支：`prd-v2-implementation`

## 一、文档目的

这份文档用于统一所有核心对象的状态流。

适用对象：

- 产品经理
- 前端
- 后端
- 测试
- 运营后台

目标：

- 每个对象只保留一套主状态机
- 每个状态都知道“上一步是什么、下一步是什么、谁来推进”
- 页面按钮、接口动作、后台审核和测试用例都基于同一套状态表

---

## 二、总览

当前建议优先统一 7 条状态机：

1. `BidOrder`
2. `AskOrder`
3. `FARecommendationLead`
4. `PlatformMandateAgreement`
5. `DealRecord`
6. `TransferApproval`
7. `EscrowRecord`

---

## 三、BidOrder 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `DRAFT` | 草稿 | 买方开始填写 bid | `SUBMITTED` | 买方 / 受权 FA |
| `SUBMITTED` | 已提交 | 买方提交成功 | `COMPLIANCE_REVIEW` | 系统 / 运营 |
| `COMPLIANCE_REVIEW` | 合规审核中 | 进入 KYC / AI / 规则校验 | `ACTIVE` / `EXPIRED` | 运营 / 合规 |
| `ACTIVE` | 生效中 | 通过审核并入 order book | `MATCHED` / `EXPIRED` | 系统 / 运营 |
| `MATCHED` | 已匹配 | 与 ask 成功进入匹配队列 | `NEGOTIATING` / `DEAL_CREATED` | 平台 / FA |
| `NEGOTIATING` | 谈判中 | 双方开始条款确认 | `DEAL_CREATED` / `EXPIRED` | 平台 / FA / 买方 |
| `DEAL_CREATED` | 已生成 deal | 创建正式交易 | 终态 | 系统 |
| `EXPIRED` | 已过期 | 超过有效期或未 reconfirm | 终态 / 允许重提 | 系统 / 买方 |

### 建议业务动作

- `submitBid`
- `approveBid`
- `expireBid`
- `matchBid`
- `startBidNegotiation`
- `createDealFromBid`

### 待确认动作

- `withdrawBid`
- `editBid`
- `reconfirmBid`
- `partialFillBid`

---

## 四、AskOrder 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `DRAFT` | 草稿 | 卖方开始填写 ask | `SUBMITTED` | 卖方 / 受权 FA |
| `SUBMITTED` | 已提交 | ask 提交成功 | `OWNERSHIP_REVIEW` | 系统 / 运营 |
| `OWNERSHIP_REVIEW` | 权属审核中 | 开始核验股权真实性 | `TRANSFERABILITY_REVIEW` / `WITHDRAWN` | 运营 / 法务 |
| `TRANSFERABILITY_REVIEW` | 可转让性审核中 | 检查 ROFR / issuer consent / restrictions | `ACTIVE_LISTING` / `WITHDRAWN` | 运营 / 法务 |
| `ACTIVE_LISTING` | 已上架 | ask 通过审核并生成 listing | `MATCHED` / `WITHDRAWN` | 系统 / 卖方 |
| `MATCHED` | 已匹配 | 与 bid 成功进入 match | `NEGOTIATING` / `DEAL_CREATED` | 平台 / FA |
| `NEGOTIATING` | 谈判中 | 条款开始确认 | `DEAL_CREATED` / `WITHDRAWN` | 平台 / FA / 卖方 |
| `DEAL_CREATED` | 已生成 deal | 创建正式交易 | 终态 | 系统 |
| `WITHDRAWN` | 已撤回 | 卖方撤回或平台终止 | 终态 | 卖方 / 平台 |

### 建议业务动作

- `submitAsk`
- `startOwnershipReview`
- `startTransferabilityReview`
- `activateListing`
- `matchAsk`
- `createDealFromAsk`

### 待确认动作

- `withdrawAsk`
- `editAsk`
- `reconfirmAsk`
- `partialFillAsk`

---

## 五、FARecommendationLead 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `PROSPECTED` | 已发现 prospect | FA 识别潜在买家 | `INTRO_SENT` | FA |
| `INTRO_SENT` | 已发送推荐 | prospect 收到项目信息 | `BOUND_TO_FA` | FA / 平台 |
| `BOUND_TO_FA` | 已绑定推荐关系 | prospect 接受并确认归因 | `KYC_STARTED` | 平台 |
| `KYC_STARTED` | KYC 启动 | prospect 开始注册和 KYC | `REGISTERED` | 买方 / 平台 |
| `REGISTERED` | 已注册 | 完成账户建立 | `DEAL_LINKED` | 平台 |
| `DEAL_LINKED` | 已关联交易 | 与 deal 或 bid 正式绑定 | 终态 | 平台 |

### 奖励规则

- `BOUND_TO_FA` 开始进入奖励轨道
- 到 `DEAL_LINKED` 后，后续 deal 可触发奖励

---

## 六、PlatformMandateAgreement 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `DRAFT` | 草稿 | 协议初始化 | `PENDING_SIGNATURE` | 平台 |
| `PENDING_SIGNATURE` | 待签署 | 已发给签约主体 | `SIGNED` | 买方 / 卖方 / 平台 |
| `SIGNED` | 已签署 | 完成签字 | `ACTIVE` | 平台 |
| `ACTIVE` | 生效中 | 协议正式生效 | `COMPLETED` | 平台 |
| `COMPLETED` | 已完成 | 协议履约结束 | 终态 | 平台 |

### 补充说明

- 当前签约方式不是单独状态
- 后续建议用字段 `signingMethod` 管理，而不是再开一条签约方式状态机

---

## 七、DealRecord 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `LISTED` | 已进入交易链 | 由 match 或平台推进进入 deal | `NEGOTIATING` | 平台 / FA |
| `NEGOTIATING` | 谈判中 | 条款开始确认 | `LOI_SIGNED` | 平台 / FA / 双方 |
| `LOI_SIGNED` | LOI 已签 | 商务意向确认 | `DILIGENCE` | 平台 / 双方 |
| `DILIGENCE` | 尽调中 | Data room / 法务材料进入阶段 | `SPA_SIGNED` | 平台 / 双方 / 法务 |
| `SPA_SIGNED` | 正式协议已签 | SPA 或同类文件完成 | `ESCROW_FUNDED` | 平台 / 双方 |
| `ESCROW_FUNDED` | 托管到位 | 资金到托管账户 | `TRANSFER_IN_PROGRESS` | 财务 / 平台 |
| `TRANSFER_IN_PROGRESS` | 股权交割中 | ROFR / issuer / board / transfer 完成推进 | `SETTLEMENT_PENDING` | 平台 / 法务 |
| `SETTLEMENT_PENDING` | 待结算 | 等待结算单和卖方打款 | `COMPLETED` | 财务 / 平台 |
| `COMPLETED` | 已完成 | 结算完成，交易闭环 | 终态 | 平台 |

### 关键依赖

- `LOI_SIGNED` 依赖意向确认
- `DILIGENCE` 依赖资料室准备
- `SPA_SIGNED` 依赖正式协议
- `ESCROW_FUNDED` 依赖资金到位
- `TRANSFER_IN_PROGRESS` 依赖审批和交割文件
- `SETTLEMENT_PENDING` 依赖交割完成
- `COMPLETED` 依赖结算完成

---

## 八、TransferApproval 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `PENDING` | 待发起审批 | deal 进入需要审批阶段 | `ISSUER_REVIEW` | 平台 / 法务 |
| `ISSUER_REVIEW` | issuer 审核中 | 已通知 issuer 或公司 | `ROFR_WINDOW` / `APPROVED` / `REJECTED` | issuer / 平台 |
| `ROFR_WINDOW` | ROFR 窗口中 | 进入优先购买权窗口 | `APPROVED` / `REJECTED` | issuer / 平台 |
| `APPROVED` | 已批准 | 审批通过 | 终态 | 平台 |
| `REJECTED` | 已拒绝 | 审批不通过 | 终态 | issuer / 平台 |

### 说明

- `ROFR_WINDOW` 不一定所有公司都有
- 有些场景可能直接从 `ISSUER_REVIEW` 到 `APPROVED`

---

## 九、EscrowRecord 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `DRAFT` | 托管草稿 | deal 进入托管准备 | `AWAITING_FUNDS` | 平台 / 财务 |
| `AWAITING_FUNDS` | 等待资金到账 | 已发付款指令 | `FUNDED` | 买方 / 财务 |
| `FUNDED` | 已到账 | 资金确认到账 | `FROZEN` | 财务 |
| `FROZEN` | 已冻结 | 等待交割完成 | `RELEASED` | 财务 / 平台 |
| `RELEASED` | 已释放 | 已放款或完成托管释放 | 终态 | 财务 |

### 关键依赖

- `FUNDED` 前建议要求付款凭证
- `RELEASED` 前建议要求 transfer evidence 和 release approval

---

## 十、ReferralRewardRecord 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `PENDING` | 待确认奖励 | 满足奖励触发条件 | `APPROVED` | 平台 / 财务 |
| `APPROVED` | 已批准奖励 | 奖励审核通过 | `PAID` | 财务 |
| `PAID` | 已发放 | 奖励完成打款 | 终态 | 财务 |

### 奖励触发字段

- `trigger = DEAL_SIGNED`
- `trigger = SETTLEMENT_COMPLETE`

---

## 十一、DashboardTask 状态机

| 状态 | 中文含义 | 进入条件 | 下一步 | 推进角色 |
|---|---|---|---|---|
| `OPEN` | 待处理 | 系统或人工创建任务 | `IN_PROGRESS` / `DONE` | 负责人 |
| `IN_PROGRESS` | 处理中 | 已有人领取或处理 | `DONE` | 负责人 |
| `DONE` | 已完成 | 任务收尾 | 终态 | 负责人 |

---

## 十二、推荐的系统动作命名

建议前后端统一动词命名：

- `submit`
- `approve`
- `reject`
- `activate`
- `match`
- `startNegotiation`
- `sign`
- `fundEscrow`
- `freezeEscrow`
- `releaseEscrow`
- `complete`
- `reconfirm`
- `withdraw`
- `resubmit`

---

## 十三、测试侧建议关注的关键断点

测试用例建议重点覆盖这些断点：

1. 未通过 KYC 的买方不能进入 `ACTIVE bid`
2. 未通过权属验证的卖方不能进入 `ACTIVE_LISTING`
3. `DIRECT` 交易不应默认公开卖家实名
4. 纸质签约未附律师鉴证时，不允许进入协议完成状态
5. escrow 未 funded 时，不允许进入 transfer
6. transfer approval 未 approved 时，不允许进入 settlement
7. settlement 未完成时，不允许自动发放 recommendation reward

---

## 十四、下一步建议

状态机总表确认后，建议继续补：

1. 《接口动作清单 v1》
   - 把每个状态推进动作对应到 API
2. 《测试断点清单 v1》
   - 把每条状态机的关键拦截条件列成测试用例
