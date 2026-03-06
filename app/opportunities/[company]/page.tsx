'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import PriceChart from '@/components/PriceChart';
import ShareButton from '@/components/ShareButton';
import { Company, PublicDeal, mockCompanies, mockPublicDeals } from '@/lib/mockData';
import { loadCompanies } from '@/lib/storage';
import { getDealsByCompanyId, initializeDefaultData } from '@/lib/share';

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params.company as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [deals, setDeals] = useState<PublicDeal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<PublicDeal | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showFaAgreement, setShowFaAgreement] = useState(false);
  const [faAgreed, setFaAgreed] = useState(false);

  useEffect(() => {
    initializeDefaultData(mockCompanies, mockPublicDeals);

    // 加载公司数据
    const loadedCompanies = loadCompanies();
    const allCompanies = loadedCompanies.length > 0 ? loadedCompanies : mockCompanies;
    const foundCompany = allCompanies.find(c => c.id === companyId);

    if (foundCompany) {
      setCompany(foundCompany);
      // 加载该公司下的 deals
      const companyDeals = getDealsByCompanyId(companyId);
      setDeals(companyDeals);
    }
  }, [companyId]);

  const handleExpressInterest = (deal: PublicDeal) => {
    setSelectedDeal(deal);
    setShowInquiryModal(true);
    setShowFaAgreement(false);
    setFaAgreed(false);
  };

  const handleInquirySubmit = () => {
    if (!faAgreed || !selectedDeal) return;
    setShowInquiryModal(false);
    alert('Inquiry submitted! Our team will contact you within 24 hours to schedule a call.');
  };

  if (!company) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Company Not Found</h1>
          <Link href="/opportunities" className="text-blue-600 hover:text-blue-700">
            ← Back to Opportunities
          </Link>
        </div>
      </BuyerLayout>
    );
  }

  return (
    <BuyerLayout>
      {/* Company Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/opportunities" className="inline-flex items-center text-blue-200 hover:text-white mb-6">
            ← Back to Opportunities
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{company.logo}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{company.name}</h1>
              <p className="text-blue-200 text-lg">{company.industry}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {company.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 text-blue-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Company Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">Valuation</p>
                <p className="text-xl font-bold text-slate-900">{company.valuation}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Founded</p>
                <p className="text-xl font-bold text-slate-900">{company.foundedYear}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Headquarters</p>
                <p className="text-xl font-bold text-slate-900">{company.headquarters}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Status</p>
                <p className={`text-xl font-bold ${company.status === 'active' ? 'text-green-600' : 'text-slate-600'}`}>
                  {company.status === 'active' ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">About</p>
              <p className="text-slate-700 leading-relaxed">{company.description}</p>
            </div>
          </div>

          {/* Deals Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Available Deals ({deals.length})
            </h2>

            {deals.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-slate-500">No active deals available for this company.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{deal.name}</h3>
                        <p className="text-sm text-slate-500">{deal.type}</p>
                        {deal.urgency && (
                          <p className="text-xs text-blue-600 mt-1">{deal.urgency}</p>
                        )}
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        deal.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {deal.status === 'active' ? 'Active' : deal.status}
                      </span>
                    </div>

                    {/* Price Chart */}
                    <div className="mb-4">
                      <PriceChart height={150} />
                      <p className="text-xs text-slate-500 mt-2 text-center">
                        ⚠️ Prices shown are reference estimates
                      </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
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

                    <p className="text-sm text-slate-600 mb-4">{deal.description}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExpressInterest(deal)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Request Quote
                      </button>
                      <ShareButton dealId={deal.id} dealName={deal.name} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inquiry Modal with FA Agreement */}
      {showInquiryModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Request Price Quote</h3>
            <p className="text-slate-600 mb-6">{selectedDeal.name} - {company.name}</p>

            {!showFaAgreement ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Investment Amount Range</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                    <option>$100K - $500K</option>
                    <option>$500K - $1M</option>
                    <option>$1M - $5M</option>
                    <option>$5M - $10M</option>
                    <option>$10M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Investor Type</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                    <option>Family Office</option>
                    <option>VC/PE Fund</option>
                    <option>Hedge Fund</option>
                    <option>Corporation</option>
                    <option>High Net Worth Individual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                  <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                    <option>Immediate (within 1 week)</option>
                    <option>Short-term (1-4 weeks)</option>
                    <option>Flexible (1-3 months)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                  <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg" rows={3} placeholder="Any specific requirements or questions..." />
                </div>

                {/* FA Agreement Section */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📄</span>
                    <h4 className="font-medium text-purple-900">FA Agreement Required</h4>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Before requesting a quote, you must agree to our Fee Agreement.
                  </p>
                  <button
                    onClick={() => setShowFaAgreement(true)}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Review & Sign FA Agreement
                  </button>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowInquiryModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInquirySubmit}
                    disabled={!faAgreed}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      faAgreed
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <h4 className="font-bold text-slate-900 mb-3">Fee Agreement (FA)</h4>
                  <div className="text-sm text-slate-700 space-y-2">
                    <p><strong>1. Parties:</strong> This agreement is between the Buyer (you) and VentureFlow Platform.</p>
                    <p><strong>2. Fee Structure:</strong> Upon successful transaction completion, Buyer agrees to pay a facilitation fee of 1-3% of the total transaction value.</p>
                    <p><strong>3. Exclusivity:</strong> Buyer agrees not to circumvent the platform for this specific asset for 12 months.</p>
                    <p><strong>4. Confidentiality:</strong> All deal information shared is confidential and for Buyer's use only.</p>
                    <p><strong>5. Non-Binding:</strong> This inquiry is non-binding until definitive agreements are signed.</p>
                    <p><strong>6. Governing Law:</strong> This agreement is governed by Hong Kong law.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={faAgreed}
                    onChange={(e) => setFaAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-blue-800 cursor-pointer">
                    I have read and agree to the Fee Agreement terms above
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFaAgreement(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setShowFaAgreement(false)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {faAgreed ? '✓ Agreement Signed' : 'Sign Agreement'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </BuyerLayout>
  );
}
