'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

export default function KYCPage() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    country: '',
    companyType: '',
    contactName: '',
    email: '',
    phone: '',
    investorType: '',
    aum: '',
    documents: [] as string[],
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { num: 1, title: t('kyc.step1') },
    { num: 2, title: t('kyc.step2') },
    { num: 3, title: t('kyc.step3') },
    { num: 4, title: t('kyc.step4') },
    { num: 5, title: t('kyc.step5') },
  ];

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('kyc.title')}
          </h1>
          <p className="text-blue-100 text-lg">
            {t('kyc.subtitle')}
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
                {index < 4 && (
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
            {/* Step 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step1')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Registration Number *</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => updateField('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Business registration number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Country/Region *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select country</option>
                    <option value="HK">Hong Kong</option>
                    <option value="SG">Singapore</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CN">China</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleNext} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step2')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('kyc.contactName')} *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('kyc.email')} *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('kyc.phone')} *</label>
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

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step3')}</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Investor Type *</label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => updateField('investorType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="individual">{t('kyc.individual')}</option>
                    <option value="institutional">{t('kyc.institutional')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">AUM (Assets Under Management) *</label>
                  <select
                    value={formData.aum}
                    onChange={(e) => updateField('aum', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="<1M">&lt; $1M</option>
                    <option value="1M-10M">$1M - $10M</option>
                    <option value="10M-50M">$10M - $50M</option>
                    <option value=">50M">&gt; $50M</option>
                  </select>
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

            {/* Step 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step4')}</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4" />
                    <div>
                      <p className="font-medium text-slate-900">Proof of Accredited Investor Status</p>
                      <p className="text-sm text-slate-500">Bank statement or financial institution letter</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4" />
                    <div>
                      <p className="font-medium text-slate-900">Proof of Identity</p>
                      <p className="text-sm text-slate-500">Passport or national ID card</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="mt-1 w-4 h-4" />
                    <div>
                      <p className="font-medium text-slate-900">Proof of Address</p>
                      <p className="text-sm text-slate-500">Utility bill or bank statement (within 3 months)</p>
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

            {/* Step 5 */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step5')}</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Risk Warning:</strong> Investment in private equity involves significant risks including loss of principal. 
                    Past performance does not guarantee future results. Please ensure you understand all risks before investing.
                  </p>
                </div>
                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 w-4 h-4" />
                  <div>
                    <p className="font-medium text-slate-900">I have read and accept the Risk Disclosure Statement</p>
                    <p className="text-sm text-slate-500">I understand the risks involved in private equity investment</p>
                  </div>
                </label>
                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    ← Back
                  </button>
                  <button 
                    onClick={() => alert(t('kyc.successDesc'))}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    {t('kyc.submit')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-2">Need assistance with verification?</p>
            <Link href="/contact" className="text-blue-600 hover:underline font-medium">
              Contact our support team →
            </Link>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
