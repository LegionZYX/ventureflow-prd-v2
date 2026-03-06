'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import PriceChart from '@/components/PriceChart';
import { Company, PublicDeal, mockCompanies, mockPublicDeals } from '@/lib/mockData';
import {
  getShareRecord,
  getDealById,
  createReferral,
  incrementShareClickCount,
  initializeDefaultData,
} from '@/lib/share';
import { loadCompanies } from '@/lib/storage';

export default function SharePage() {
  const params = useParams();
  const router = useRouter();
  const shareId = params.shareId as string;

  const [shareRecord, setShareRecord] = useState<any>(null);
  const [deal, setDeal] = useState<PublicDeal | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [showKyc, setShowKyc] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [referralId, setReferralId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    initializeDefaultData(mockCompanies, mockPublicDeals);

    // 获取分享记录
    const record = getShareRecord(shareId);
    if (!record) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setShareRecord(record);
    incrementShareClickCount(shareId);

    // 获取 Deal
    const dealData = getDealById(record.dealId);
    if (!dealData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setDeal(dealData);

    // 获取 Company
    const loadedCompanies = loadCompanies();
    const allCompanies = loadedCompanies.length > 0 ? loadedCompanies : mockCompanies;
    const companyData = allCompanies.find(c => c.id === dealData.companyId);
    setCompany(companyData || null);

    setLoading(false);
  }, [shareId]);

  const handleStart = () => {
    if (!formData.name || !formData.email) return;
    setShowKyc(false);
    setShowAgreement(true);
  };

  const handleAgree = () => {
    setAgreed(true);
  };

  const handleSubmit = () => {
    if (!agreed || !deal) return;

    // 创建推荐关系
    const referral = createReferral(
      shareId,
      formData.name,
      formData.email,
      deal.id
    );
    setReferralId(referral.id);
    setCompleted(true);
  };

  if (loading) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </BuyerLayout>
    );
  }

  if (notFound || !deal || !company) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Share Link Not Found</h1>
          <p className="text-slate-600 mb-6">This share link may have expired or is invalid.</p>
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
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border border-green-200 p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Thank You, {formData.name}!
              </h1>
              <p className="text-slate-600 mb-6">
                Your inquiry for <strong>{deal.name}</strong> at <strong>{company.name}</strong> has been submitted.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  📧 An email confirmation has been sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <p className="text-sm text-slate-600 mb-6">
                Our team will contact you within 24 hours to discuss the next steps.
              </p>

              <Link
                href="/opportunities"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Shared By Banner */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-800 text-center">
              🔗 You were invited by <strong>{shareRecord.sharerName}</strong> to explore this opportunity
            </p>
          </div>

          {/* Deal Info Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{company.logo}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{deal.name}</h1>
                <p className="text-slate-600">{company.name} · {deal.type}</p>
              </div>
            </div>

            <PriceChart height={180} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
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

            {deal.urgency && (
              <p className="text-sm text-blue-600 mt-2">{deal.urgency}</p>
            )}
            <p className="text-sm text-slate-600 mt-2">{deal.description}</p>
          </div>

          {/* Flow: KYC Form → Agreement → Submit */}
          {!showAgreement ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Express Your Interest</h2>
              <p className="text-slate-600 mb-6">
                Complete the form below to receive more information about this opportunity.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📋 By continuing, you'll need to review and sign our Fee Agreement before submitting your inquiry.
                  </p>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!formData.name || !formData.email}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Continue to Agreement →
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Fee Agreement (FA)</h2>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                <div className="text-sm text-slate-700 space-y-2">
                  <p><strong>1. Parties:</strong> This agreement is between the Buyer (you) and VentureFlow Platform.</p>
                  <p><strong>2. Fee Structure:</strong> Upon successful transaction completion, Buyer agrees to pay a facilitation fee of 1-3% of the total transaction value.</p>
                  <p><strong>3. Exclusivity:</strong> Buyer agrees not to circumvent the platform for this specific asset for 12 months.</p>
                  <p><strong>4. Confidentiality:</strong> All deal information shared is confidential and for Buyer's use only.</p>
                  <p><strong>5. Non-Binding:</strong> This inquiry is non-binding until definitive agreements are signed.</p>
                  <p><strong>6. Governing Law:</strong> This agreement is governed by Hong Kong law.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm text-blue-800 cursor-pointer">
                  I have read and agree to the Fee Agreement terms above
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAgreement(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!agreed}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    agreed
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
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
