'use client';

import { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import { useTradingWorkspace } from '@/hooks/useTradingWorkspace';
import { getTradeModeLabel, type TradeMode } from '@/lib/trading-v2';

type EntrySide = 'SELECT' | 'BID' | 'ASK';

function TradeModeCards() {
  const modes: TradeMode[] = ['L1', 'L2', 'DIRECT'];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {modes.map((mode) => (
        <div key={mode} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">{getTradeModeLabel(mode)}</p>
          <p className="mt-2 text-sm text-slate-600">
            {mode === 'L1' && 'Primary issuance or allocation workflow driven by issuer rules.'}
            {mode === 'L2' && 'Anonymous secondary market workflow with seller privacy guard.'}
            {mode === 'DIRECT' && 'Known counterparty workflow managed by the platform execution desk.'}
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
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Unified Bid / Ask entry for the live execution chain
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-blue-100">
            Buyer submissions become formal bids. Seller submissions become formal asks. Both now feed the
            same KYC, review, matching, deal, escrow, and settlement workflow.
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
              <h2 className="text-2xl font-bold text-slate-900">Buyer Bid Entry</h2>
              <p className="mt-2 text-sm text-slate-500">KYC -&gt; NDA -&gt; Bid -&gt; Match -&gt; Deal</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>1. Buyer intent is captured as a real bid order, not a generic lead.</li>
                <li>2. The bid enters compliance review before it becomes active.</li>
                <li>3. Once active, the bid can move into order matching and negotiation.</li>
              </ul>
            </button>

            <button
              onClick={() => setEntrySide('ASK')}
              className="rounded-3xl border-2 border-slate-200 bg-white p-8 text-left shadow-sm transition hover:border-emerald-500 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold text-slate-900">Seller Ask Entry</h2>
              <p className="mt-2 text-sm text-slate-500">KYC/KYB -&gt; Ownership -&gt; Ask -&gt; Listing -&gt; Negotiation</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li>1. Seller or GP flow starts with a real ask order.</li>
                <li>2. Ownership and transferability review remain hard gates before listing.</li>
                <li>3. Public board exposure stays at seller alias level until disclosure is approved.</li>
              </ul>
            </button>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}

function BidEntryForm({ onBack }: { onBack: () => void }) {
  const { error, isPending, runAction } = useTradingWorkspace();
  const [submitted, setSubmitted] = useState(false);
  const [tradeMode, setTradeMode] = useState<TradeMode>('L2');
  const [buyerName, setBuyerName] = useState('New Investor Desk');
  const [companyName, setCompanyName] = useState('ByteDance');
  const [shareClass, setShareClass] = useState('Series H Common');
  const [price, setPrice] = useState('$165');
  const [quantity, setQuantity] = useState('150k shares');
  const [validUntil, setValidUntil] = useState('2026-05-20');
  const [conditions, setConditions] = useState('NDA signed, escrow in HKD');

  const handleSubmit = async () => {
    await runAction('createBid', undefined, {
      buyerName,
      companyName,
      shareClass,
      tradeMode,
      bidPriceLabel: price,
      quantityLabel: quantity,
      validUntil,
      conditions: conditions
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });
    setSubmitted(true);
  };

  return (
    <BuyerLayout>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700">
              Back
            </button>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">Create Buyer Bid</h1>
            <p className="mt-2 text-slate-600">
              This now creates a real bid order in the shared workspace and opens a compliance task.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-blue-50 p-5 text-sm text-blue-900">
                Buyer execution chain: KYC approved -&gt; NDA -&gt; active bid -&gt; match review -&gt; negotiation -&gt; deal.
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Buyer Name</label>
                <input
                  value={buyerName}
                  onChange={(event) => setBuyerName(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
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
                <InputField label="Target Company" value={companyName} onChange={setCompanyName} />
                <InputField label="Share Class" value={shareClass} onChange={setShareClass} />
                <InputField label="Bid Price" value={price} onChange={setPrice} />
                <InputField label="Quantity / Amount" value={quantity} onChange={setQuantity} />
                <InputField label="Valid Until" value={validUntil} onChange={setValidUntil} />
                <InputField label="Conditions" value={conditions} onChange={setConditions} />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-slate-300"
              >
                {isPending ? 'Submitting...' : 'Submit Bid To Workspace'}
              </button>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                  Bid submitted. The order is now in compliance review and should appear in the bid registry.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}

function AskEntryForm({ onBack }: { onBack: () => void }) {
  const { error, isPending, runAction } = useTradingWorkspace();
  const [submitted, setSubmitted] = useState(false);
  const [tradeMode, setTradeMode] = useState<TradeMode>('L2');
  const [sellerAlias, setSellerAlias] = useState('Seller-New-01');
  const [companyName, setCompanyName] = useState('ByteDance');
  const [shareClass, setShareClass] = useState('Series H Common');
  const [quantity, setQuantity] = useState('180k shares');
  const [priceRange, setPriceRange] = useState('$164 - $167');
  const [validity, setValidity] = useState('Valid for 21 days');
  const [restriction, setRestriction] = useState('ROFR review required');

  const handleSubmit = async () => {
    await runAction('createAsk', undefined, {
      sellerAlias,
      companyName,
      shareClass,
      tradeMode,
      askPriceLabel: priceRange,
      quantityLabel: quantity,
      validityLabel: validity,
      transferRestrictions: restriction,
    });
    setSubmitted(true);
  };

  return (
    <BuyerLayout>
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700">
              Back
            </button>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">Create Seller Ask</h1>
            <p className="mt-2 text-slate-600">
              This now creates a real ask order, opens ownership review, and adds a legal task.
            </p>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-900">
                Seller execution chain: KYC/KYB -&gt; ownership proof -&gt; transferability review -&gt; active listing
                -&gt; negotiation -&gt; deal.
              </div>

              <InputField label="Seller Alias" value={sellerAlias} onChange={setSellerAlias} />

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
                <InputField label="Company" value={companyName} onChange={setCompanyName} />
                <InputField label="Share Class" value={shareClass} onChange={setShareClass} />
                <InputField label="Quantity" value={quantity} onChange={setQuantity} />
                <InputField label="Ask Price Range" value={priceRange} onChange={setPriceRange} />
                <InputField label="Validity" value={validity} onChange={setValidity} />
                <InputField label="Transfer Restriction" value={restriction} onChange={setRestriction} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                Public display rule: company, share class, price range, quantity range, restrictions, seller
                alias, and verification status can be shown. Seller real identity remains blocked.
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white hover:bg-emerald-700 disabled:bg-slate-300"
              >
                {isPending ? 'Submitting...' : 'Submit Ask To Workspace'}
              </button>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
                  Ask submitted. The order is now in ownership review and should appear in the ask registry.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}

function InputField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
    </div>
  );
}
