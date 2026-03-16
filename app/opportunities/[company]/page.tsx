'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';
import PriceChart from '@/components/PriceChart';
import ShareButton from '@/components/ShareButton';
import { Company, PublicDeal, mockCompanies, mockPublicDeals } from '@/lib/mockData';
import { loadCompanies } from '@/lib/storage';
import { getDealsByCompanyId, initializeDefaultData } from '@/lib/share';

export default function CompanyDetailPage() {
  const { t } = useLang();
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
    const loadedCompanies = loadCompanies();
    const allCompanies = loadedCompanies.length > 0 ? loadedCompanies : mockCompanies;
    const foundCompany = allCompanies.find(c => c.id === companyId);

    if (foundCompany) {
      setCompany(foundCompany);
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
    alert('Inquiry submitted! Our team will contact you within 24 hours.');
  };

  if (!company) {
    return (
      <BuyerLayout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Company Not Found</h1>
          <Link href="/opportunities" className="text-blue-600 hover:text-blue-700">
            {t('company.backToList')}
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
            {t('company.backToList')}
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('company.description')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">{t('company.valuation')}</p>
                <p className="text-xl font-bold text-slate-900">{company.valuation}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">{t('company.founded')}</p>
                <p className="text-xl font-bold text-slate-900">{company.foundedYear}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">{t('company.headquarters')}</p>
                <p className="text-xl font-bold text-slate-900">{company.headquarters}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">{t('company.industry')}</p>
                <p className="text-xl font-bold text-slate-900">{company.industry}</p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">{company.description}</p>
          </div>

          {/* Active Deals */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('company.activeDeals')}</h2>
            {deals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 mb-4">{t('company.noDeals')}</p>
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  {t('company.contactFA')}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div key={deal.id} className="border border-slate-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{deal.type}</h3>
                        <p className="text-sm text-slate-500">Volume: {deal.volume}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                        {deal.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{t('company.pricePerShare')}</p>
                        <p className="font-semibold text-blue-600">{deal.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{t('company.volume')}</p>
                        <p className="font-semibold text-slate-900">{deal.volume}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{t('company.discount')}</p>
                        <p className="font-semibold text-green-600">{deal.discount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Min Investment</p>
                        <p className="font-semibold text-slate-900">$50K</p>
                      </div>
                    </div>
                    <div className="mb-4 h-32">
                      <PriceChart height={128} />
                    </div>
                    <button
                      onClick={() => handleExpressInterest(deal)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      {t('company.expressInterest')}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share */}
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Share this opportunity</h3>
              <p className="text-sm text-slate-500">Invite other qualified investors</p>
            </div>
            <ShareButton dealId={companyId} dealName={company.name} />
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">{t('company.inquireNow')}</h3>
              <p className="text-sm text-slate-500 mt-1">{selectedDeal.type} - {selectedDeal.volume}</p>
            </div>
            <div className="p-6 space-y-4">
              {!faAgreed ? (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>FA Agreement Required:</strong> Before submitting an inquiry, please read and agree to our FA agreement terms.
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• This inquiry is non-binding</li>
                      <li>• Our team will contact you within 24 hours</li>
                      <li>• You will need to complete KYC verification</li>
                      <li>• Minimum investment requirements apply</li>
                    </ul>
                  </div>
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox"
                      checked={faAgreed}
                      onChange={(e) => setFaAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4"
                    />
                    <span className="text-sm text-slate-700">I have read and agree to the FA Agreement terms</span>
                  </label>
                  <button
                    onClick={() => faAgreed && setShowFaAgreement(true)}
                    disabled={!faAgreed}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      faAgreed
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Investment Range *</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>Select range</option>
                      <option>$50K - $100K</option>
                      <option>$100K - $500K</option>
                      <option>$500K - $1M</option>
                      <option>$1M+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Additional Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => {
                        setShowFaAgreement(false);
                        setFaAgreed(false);
                      }}
                      className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleInquirySubmit}
                      className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                    >
                      {t('kyc.submit')}
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
              <Link href="/contact" className="text-sm text-blue-600 hover:underline">
                Questions? Contact us
              </Link>
              <button
                onClick={() => {
                  setShowInquiryModal(false);
                  setFaAgreed(false);
                  setShowFaAgreement(false);
                }}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </BuyerLayout>
  );
}
