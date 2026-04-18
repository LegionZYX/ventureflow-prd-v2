'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BuyerLayout from '@/components/BuyerLayout';
import PriceChart from '@/components/PriceChart';
import { Company, PublicDeal, ShareRecord, mockCompanies, mockPublicDeals } from '@/lib/mockData';
import {
  createReferral,
  getDealById,
  getShareRecord,
  incrementShareClickCount,
  initializeDefaultData,
} from '@/lib/share';
import { loadCompanies } from '@/lib/storage';

function resolveSharedOpportunity(shareId: string): {
  shareRecord: ShareRecord | null;
  deal: PublicDeal | null;
  company: Company | null;
} {
  if (typeof window === 'undefined') {
    return {
      shareRecord: null,
      deal: null,
      company: null,
    };
  }

  const shareRecord = getShareRecord(shareId);
  if (!shareRecord) {
    return {
      shareRecord: null,
      deal: null,
      company: null,
    };
  }

  const deal = getDealById(shareRecord.dealId);
  if (!deal) {
    return {
      shareRecord,
      deal: null,
      company: null,
    };
  }

  const loadedCompanies = loadCompanies();
  const companies = loadedCompanies.length > 0 ? loadedCompanies : mockCompanies;
  const company = companies.find((item) => item.id === deal.companyId) || null;

  return {
    shareRecord,
    deal,
    company,
  };
}

export default function SharePage() {
  const params = useParams();
  const shareId = params.shareId as string;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const loading = typeof window === 'undefined';
  const { shareRecord, deal, company } = resolveSharedOpportunity(shareId);
  const notFound = !loading && (!shareRecord || !deal || !company);

  useEffect(() => {
    initializeDefaultData(mockCompanies, mockPublicDeals);
    if (shareRecord) {
      incrementShareClickCount(shareId);
    }
  }, [shareId, shareRecord]);

  const handleStart = () => {
    if (!formData.name || !formData.email) {
      return;
    }

    setShowAgreement(true);
  };

  const handleSubmit = () => {
    if (!agreed || !deal) {
      return;
    }

    createReferral(shareId, formData.name, formData.email, deal.id);
    setCompleted(true);
  };

  if (loading) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </BuyerLayout>
    );
  }

  if (notFound || !shareRecord || !deal || !company) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">Share Link Not Found</h1>
          <p className="mb-6 text-slate-600">This share link may have expired or is invalid.</p>
          <Link href="/opportunities" className="text-blue-600 hover:text-blue-700">
            Browse All Opportunities →
          </Link>
        </div>
      </BuyerLayout>
    );
  }

  if (completed) {
    return (
      <BuyerLayout>
        <div className="py-12">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-green-200 bg-white p-8 text-center">
              <div className="mb-4 text-6xl">✓</div>
              <h1 className="mb-2 text-2xl font-bold text-slate-900">
                Thank You, {formData.name}!
              </h1>
              <p className="mb-6 text-slate-600">
                Your inquiry for <strong>{deal.name}</strong> at <strong>{company.name}</strong> has been submitted.
              </p>

              <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  A confirmation email has been sent to <strong>{formData.email}</strong>.
                </p>
              </div>

              <p className="mb-6 text-sm text-slate-600">
                Our team will contact you within 24 hours to discuss the next steps.
              </p>

              <Link
                href="/opportunities"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Browse More Opportunities
              </Link>
            </div>
          </div>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      <div className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-4">
            <p className="text-center text-sm text-purple-800">
              You were invited by <strong>{shareRecord.sharerName}</strong> to explore this opportunity.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-4xl">{company.logo}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{deal.name}</h1>
                <p className="text-slate-600">
                  {company.name} · {deal.type}
                </p>
              </div>
            </div>

            <PriceChart height={180} />

            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Valuation</p>
                <p className="font-semibold text-slate-900">{deal.valuation}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Price</p>
                <p className="font-semibold text-blue-600">{deal.price}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Volume</p>
                <p className="font-semibold text-slate-900">{deal.volume}</p>
              </div>
              {deal.discount && (
                <div>
                  <p className="text-xs text-slate-500">Discount</p>
                  <p className="font-semibold text-green-600">{deal.discount}</p>
                </div>
              )}
            </div>

            {deal.urgency && <p className="mt-2 text-sm text-blue-600">{deal.urgency}</p>}
            <p className="mt-2 text-sm text-slate-600">{deal.description}</p>
          </div>

          {!showAgreement ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Express Your Interest</h2>
              <p className="mb-6 text-slate-600">
                Complete the form below to receive more information about this opportunity.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    By continuing, you&apos;ll review and sign the fee agreement before submitting your inquiry.
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!formData.name || !formData.email}
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Continue to Agreement →
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Fee Agreement (FA)</h2>

              <div className="mb-4 max-h-64 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="space-y-2 text-sm text-slate-700">
                  <p><strong>1. Parties:</strong> This agreement is between the Buyer (you) and VentureFlow Platform.</p>
                  <p><strong>2. Fee Structure:</strong> Upon successful transaction completion, Buyer agrees to pay a facilitation fee of 1-3% of the total transaction value.</p>
                  <p><strong>3. Exclusivity:</strong> Buyer agrees not to circumvent the platform for this specific asset for 12 months.</p>
                  <p><strong>4. Confidentiality:</strong> All deal information shared is confidential and for Buyer&apos;s use only.</p>
                  <p><strong>5. Non-Binding:</strong> This inquiry is non-binding until definitive agreements are signed.</p>
                  <p><strong>6. Governing Law:</strong> This agreement is governed by Hong Kong law.</p>
                </div>
              </div>

              <div className="mb-4 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="cursor-pointer text-sm text-blue-800">
                  I have read and agree to the fee agreement terms above.
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAgreement(false)}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!agreed}
                  className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-colors ${
                    agreed
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'cursor-not-allowed bg-slate-300 text-slate-500'
                  }`}
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </BuyerLayout>
  );
}
