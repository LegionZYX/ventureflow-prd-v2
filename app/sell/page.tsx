'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

export default function SellSharesPage() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    shareType: '',
    shareCount: '',
    estimatedValue: '',
    sellerType: 'individual',
    contactName: '',
    email: '',
    phone: '',
    proofOfOwnership: false,
    purchaseAgreement: false,
    idVerification: false,
    reasonForSelling: '',
    minimumPrice: '',
    urgency: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { num: 1, title: t('sell.step1') },
    { num: 2, title: t('sell.step2') },
    { num: 3, title: t('sell.step3') },
    { num: 4, title: t('sell.step4') },
  ];

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sell.title')}
          </h1>
          <p className="text-blue-100 text-lg">
            {t('sell.subtitle')}
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <p className={`text-xs mt-2 hidden sm:block ${
                    step >= s.num ? 'text-blue-600 font-medium' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step > s.num ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            {/* Step 1: Asset Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('sell.step1')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.companyName')} *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ByteDance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.shareType')} *</label>
                  <select
                    value={formData.shareType}
                    onChange={(e) => updateField('shareType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="common">Common Stock</option>
                    <option value="preferred">Preferred Stock</option>
                    <option value="option">Employee Options</option>
                    <option value="rsu">RSU</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.shareCount')} *</label>
                  <input
                    type="text"
                    value={formData.shareCount}
                    onChange={(e) => updateField('shareCount', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.estimatedValue')}</label>
                  <input
                    type="text"
                    value={formData.estimatedValue}
                    onChange={(e) => updateField('estimatedValue', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="$100,000"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Seller Info */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('sell.step2')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.sellerType')} *</label>
                  <select
                    value={formData.sellerType}
                    onChange={(e) => updateField('sellerType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="individual">Individual</option>
                    <option value="institutional">Institutional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.contactName')} *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+852 1234 5678"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    ← Back
                  </button>
                  <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('sell.documents')}</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={formData.proofOfOwnership}
                      onChange={(e) => updateField('proofOfOwnership', e.target.checked)}
                      className="mt-1 w-4 h-4" 
                    />
                    <div>
                      <p className="font-medium text-slate-900">{t('sell.proofOfOwnership')}</p>
                      <p className="text-sm text-slate-500">Share certificate or equity statement</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={formData.purchaseAgreement}
                      onChange={(e) => updateField('purchaseAgreement', e.target.checked)}
                      className="mt-1 w-4 h-4" 
                    />
                    <div>
                      <p className="font-medium text-slate-900">{t('sell.purchaseAgreement')}</p>
                      <p className="text-sm text-slate-500">Original purchase agreement</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={formData.idVerification}
                      onChange={(e) => updateField('idVerification', e.target.checked)}
                      className="mt-1 w-4 h-4" 
                    />
                    <div>
                      <p className="font-medium text-slate-900">{t('sell.idVerification')}</p>
                      <p className="text-sm text-slate-500">Passport or national ID card</p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    ← Back
                  </button>
                  <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Additional Info */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('sell.step4')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.reasonForSelling')}</label>
                  <textarea
                    value={formData.reasonForSelling}
                    onChange={(e) => updateField('reasonForSelling', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Why are you selling these shares?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.minimumPrice')}</label>
                  <input
                    type="text"
                    value={formData.minimumPrice}
                    onChange={(e) => updateField('minimumPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="$150 per share"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('sell.urgency')}</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => updateField('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Not urgent (3-6 months)</option>
                    <option value="medium">Moderate (1-3 months)</option>
                    <option value="high">Urgent (&lt; 1 month)</option>
                  </select>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800">
                    <strong>✓ Almost done!</strong> Our FA team will contact you within 2 hours with market valuation and trading advice.
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    ← Back
                  </button>
                  <button 
                    onClick={() => alert(t('sell.successDesc'))}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    {t('sell.submit')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-2">Have questions about selling shares?</p>
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Contact our FA team →
            </Link>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
