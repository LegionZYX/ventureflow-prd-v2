'use client';

import { useMemo, useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import { getTradeModeLabel, TradeMode } from '@/lib/trading-v2';

type EntrySide = 'SELECT' | 'BID' | 'ASK';

function TradeModeCards() {
  const modes: TradeMode[] = ['L1', 'L2', 'DIRECT'];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {modes.map((mode) => (
        <div key={mode} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">{getTradeModeLabel(mode)}</p>
          <p className="mt-2 text-sm text-slate-600">
            {mode === 'L1' && '面向发行方或项目方组织的一级认购。'}
            {mode === 'L2' && '二级市场匿名撮合，卖家隐私默认保护。'}
            {mode === 'DIRECT' && '已有明确交易对手，由平台负责履约与审计。'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function IntentRegistryPage() {
  const [entrySide, setEntrySide] = useState<EntrySide>('SELECT');

  if (entrySide === 'BID') {
    return <BidEntryForm onBack={() => setEntrySide('SELECT')} />;
  }

  if (entrySide === 'ASK') {
    return <AskEntryForm onBack={() => setEntrySide('SELECT')} />;
  }

  return (
    <BuyerLayout>
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1 text-sm text-blue-100">
            PRD V2 Entry Layer
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">统一从 Bid / Ask 入口进入交易主链</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
            这里不是泛化的“意向登记”。买方提交的是 `Bid`，卖方提交的是 `Ask`。两者都会进入
            KYC、验证、撮合、谈判、Deal、托管、交割与结算主链。
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-slate-900">Current Trade Modes</h2>
            <div className="mt-6">
              <TradeModeCards />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <button
              onClick={() => setEntrySide('BID')}
              className="rounded-3xl border-2 border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-blue-500 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Buyer Bid Entry</h2>
                  <p className="text-sm text-slate-500">KYC → NDA → Bid → Match → Deal</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>1. 买方先确认 KYC 与 accredited investor 资格。</li>
                <li>2. 指定公司、股份类别、价格、数量、有效期与条件。</li>
                <li>3. Bid 激活后才能进入 order match 与谈判阶段。</li>
              </ul>
            </button>

            <button
              onClick={() => setEntrySide('ASK')}
              className="rounded-3xl border-2 border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-emerald-500 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white">
                  🏷️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Seller Ask Entry</h2>
                  <p className="text-sm text-slate-500">KYC/KYB → Ownership → Ask → Listing → Negotiation</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>1. 卖方或 GP 要先通过 KYC/KYB 与所有权验证。</li>
                <li>2. Ask 必须带价格区间、数量、限制条件和有效期。</li>
                <li>3. 上架展示默认匿名，卖家身份按阶段披露。</li>
              </ul>
            </button>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}

function BidEntryForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [tradeMode, setTradeMode] = useState<TradeMode>('L2');
  const [companyName, setCompanyName] = useState('ByteDance');
  const [shareClass, setShareClass] = useState('Series H Common');
  const [price, setPrice] = useState('$165');
  const [quantity, setQuantity] = useState('250k shares');
  const [validUntil, setValidUntil] = useState('30 days');
  const [conditions, setConditions] = useState('NDA signed, escrow in HKD');

  const summary = useMemo(
    () => `${getTradeModeLabel(tradeMode)} · ${companyName} · ${shareClass} · ${price} · ${quantity}`,
    [companyName, price, quantity, shareClass, tradeMode],
  );

  return (
    <BuyerLayout>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700">
              ← Back
            </button>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">Create Buyer Bid</h1>
            <p className="mt-2 text-slate-600">
              当前目标是明确一笔正式 Bid，而不是泛意向。未通过 KYC 和 accredited investor guard 的
              买方不能激活 bid。
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-blue-50 p-5 text-sm text-blue-900">
                Buyer execution chain: KYC approved → NDA → active bid → match review → negotiation → deal.
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Trade Mode</label>
                <select
                  value={tradeMode}
                  onChange={(event) => setTradeMode(event.target.value as TradeMode)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="DIRECT">DIRECT</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Target Company</label>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Share Class</label>
                  <input
                    value={shareClass}
                    onChange={(event) => setShareClass(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Bid Price</label>
                  <input
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Quantity / Amount</label>
                  <input
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Validity Window</label>
                  <input
                    value={validUntil}
                    onChange={(event) => setValidUntil(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Conditions</label>
                  <input
                    value={conditions}
                    onChange={(event) => setConditions(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Generated Bid Summary</p>
                <p className="mt-2 font-semibold text-slate-900">{summary}</p>
                <p className="mt-2 text-sm text-slate-600">
                  On activation, this bid should enter `ComplianceReview`, then `Active`, then the order match queue.
                </p>
              </div>

              <button
                onClick={() => setStep(step + 1)}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
              >
                Simulate Bid Activation
              </button>

              {step > 1 && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                  Bid created. Next required guards: accredited investor verified, NDA signed, then matching with
                  active ask/listing.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}

function AskEntryForm({ onBack }: { onBack: () => void }) {
  const [tradeMode, setTradeMode] = useState<TradeMode>('L2');
  const [companyName, setCompanyName] = useState('ByteDance');
  const [shareClass, setShareClass] = useState('Series H Common');
  const [quantity, setQuantity] = useState('300k shares');
  const [priceRange, setPriceRange] = useState('$162 - $168');
  const [validity, setValidity] = useState('30 days');
  const [restriction, setRestriction] = useState('ROFR review required');
  const [submitted, setSubmitted] = useState(false);

  return (
    <BuyerLayout>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700">
              ← Back
            </button>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">Create Seller Ask</h1>
            <p className="mt-2 text-slate-600">
              Ask 是卖方的正式挂单对象。进入公开 listing 前，必须完成所有权验证与可转让性审核。
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-900">
                Seller execution chain: KYC/KYB → ownership proof → transferability review → active listing →
                negotiation → deal.
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Trade Mode</label>
                <select
                  value={tradeMode}
                  onChange={(event) => setTradeMode(event.target.value as TradeMode)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="DIRECT">DIRECT</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Company</label>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Share Class</label>
                  <input
                    value={shareClass}
                    onChange={(event) => setShareClass(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                  <input
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Ask Price Range</label>
                  <input
                    value={priceRange}
                    onChange={(event) => setPriceRange(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Validity</label>
                  <input
                    value={validity}
                    onChange={(event) => setValidity(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Transfer Restriction</label>
                  <input
                    value={restriction}
                    onChange={(event) => setRestriction(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                Public display rule: listing can show company, share class, price range, quantity range, restriction,
                seller alias, and verification state. It cannot expose seller real identity.
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700"
              >
                Simulate Ask Submission
              </button>

              {submitted && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                  Ask submitted. Next state should be `OwnershipReview`, then `TransferabilityReview`, then
                  `ActiveListing` with seller alias only.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
