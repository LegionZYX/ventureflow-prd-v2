# VentureFlow Demo 更新说明

## 本次更新概述
本次版本基于原有 VentureFlow demo 项目进行前端演示流程增强，重点优化公开侧浏览结构与分享绑定流程，用于投资人演示，不涉及真实后端、数据库或正式电子签约能力。

## 主要改动

### 1. Opportunities 页面重构
- 原先 `/opportunities` 页面为直接展示 deal 列表
- 现已调整为按公司维度展示 company list
- 支持从公司列表进入对应公司详情页

### 2. 新增公司详情页
- 新增 `/opportunities/[company]` 页面
- 页面展示公司基本信息、公司简介/历史信息、以及该公司下的 deals
- 更符合“先看公司，再看 deal”的展示逻辑

### 3. 新增 Deal 分享能力
- 在公司详情页中的每个 deal 增加 `Share Deal` 按钮
- 支持生成并复制分享链接

### 4. 新增分享落地页
- 新增 `/share/[shareId]` 页面
- 被分享人无需注册即可进入
- 页面包含：
  - 被分享的 company / deal 信息
  - 简化版 KYC 表单
  - FA Agreement 勾选签署
  - 提交成功状态页

### 5. Referral / 归属关系模拟
- 通过 localStorage 模拟 share record 与 referral relationship
- 用于演示“分享—填写信息—签署协议—建立归属关系”的完整流程

## 主要访问路径
- `/opportunities`
- `/opportunities/bytedance`
- `/share/[shareId]`

## 验证情况
- `npm run build` 已通过
- TypeScript 检查通过
- 公开侧页面与动态路由可访问
- localStorage 可正常保存：
  - `vf_share_records`
  - `vf_referrals`

## 说明
本版本为演示型 demo 版本，重点在于前端展示和流程闭环，不包含真实后端接口、数据库持久化、正式 KYC 审核或电子签约能力。