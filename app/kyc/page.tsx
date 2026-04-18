'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BuyerLayout from '@/components/BuyerLayout';
import { useLang } from '@/contexts/LangContext';

const roleDocumentMap = {
  BUYER: [
    'Government ID or passport',
    'Proof of address within 3 months',
    'Accredited investor evidence',
    'Source of funds declaration',
    'Bank account for escrow or settlement',
  ],
  SELLER: [
    'Government ID or passport',
    'Proof of address within 3 months',
    'Stock certificate or equity platform proof',
    'Grant, exercise, or acquisition agreement',
    'Transfer restriction and ROFR disclosure',
    'Receiving bank account for settlement',
  ],
  INSTITUTION: [
    'Certificate of incorporation or registration',
    'Company registration number and jurisdiction',
    'Authorized signatory ID',
    'Board resolution or authorization letter',
    'UBO or control person details',
    'Institutional accreditation evidence',
  ],
  FA: [
    'FA license or qualification file',
    'Service agreement with platform',
    'Commission receiving bank account',
    'Compliance training completion',
  ],
} as const;

type RoleKey = keyof typeof roleDocumentMap;

export default function KYCPage() {
  const { t } = useLang();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<RoleKey>('BUYER');
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
  });

  const handleNext = () => setStep((current) => current + 1);
  const handleBack = () => setStep((current) => current - 1);
  const updateField = (field: string, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const steps = [
    { num: 1, title: t('kyc.step1') },
    { num: 2, title: t('kyc.step2') },
    { num: 3, title: t('kyc.step3') },
    { num: 4, title: t('kyc.step4') },
    { num: 5, title: t('kyc.step5') },
  ];

  const requiredDocs = roleDocumentMap[role];

  return (
    <BuyerLayout>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{t('kyc.title')}</h1>
          <p className="text-lg text-blue-100">{t('kyc.subtitle')}</p>
        </div>
      </section>

      <section className="border-b border-slate-200 py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((currentStep, index) => (
              <React.Fragment key={currentStep.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                      step >= currentStep.num
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step > currentStep.num ? 'Done' : currentStep.num}
                  </div>
                  <p
                    className={`mt-2 hidden text-xs sm:block ${
                      step >= currentStep.num ? 'font-medium text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    {currentStep.title}
                  </p>
                </div>
                {index < 4 ? (
                  <div
                    className={`mx-2 h-1 flex-1 rounded ${
                      step > currentStep.num ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step1')}</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Business Role *</label>
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value as RoleKey)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BUYER">Buyer / Investor</option>
                    <option value="SELLER">Seller / Shareholder / GP</option>
                    <option value="INSTITUTION">Institution / KYB</option>
                    <option value="FA">FA / Advisor</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(event) => updateField('companyName', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Registration Number *</label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(event) => updateField('registrationNumber', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Business registration number"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Country / Region *</label>
                  <select
                    value={formData.country}
                    onChange={(event) => updateField('country', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
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
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step2')}</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{t('kyc.contactName')} *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(event) => updateField('contactName', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{t('kyc.email')} *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">{t('kyc.phone')} *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="+852 1234 5678"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step3')}</h2>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Investor Type *</label>
                  <select
                    value={formData.investorType}
                    onChange={(event) => updateField('investorType', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="individual">{t('kyc.individual')}</option>
                    <option value="institutional">{t('kyc.institutional')}</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">AUM *</label>
                  <select
                    value={formData.aum}
                    onChange={(event) => updateField('aum', event.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="<1M">&lt; $1M</option>
                    <option value="1M-10M">$1M - $10M</option>
                    <option value="10M-50M">$10M - $50M</option>
                    <option value=">50M">&gt; $50M</option>
                  </select>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                  Forge-aligned note: buyers need accredited investor evidence, while sellers need ownership and transferability proof before listing can go live.
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step4')}</h2>
                <p className="text-sm text-slate-500">
                  Required files now reflect the Forge reference more closely and vary by role.
                </p>
                <div className="space-y-3">
                  {requiredDocs.map((document) => (
                    <label
                      key={document}
                      className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                    >
                      <input type="checkbox" className="mt-1 h-4 w-4" />
                      <div>
                        <p className="font-medium text-slate-900">{document}</p>
                        <p className="text-sm text-slate-500">
                          {role === 'BUYER'
                            ? 'Used for identity, AML, accredited-investor, and settlement readiness checks.'
                            : null}
                          {role === 'SELLER'
                            ? 'Used for identity, ownership, transfer restriction, and payout readiness checks.'
                            : null}
                          {role === 'INSTITUTION'
                            ? 'Used for KYB, authorization, UBO, and institutional qualification checks.'
                            : null}
                          {role === 'FA'
                            ? 'Used for FA onboarding, compliance training, and payout setup.'
                            : null}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">{t('kyc.step5')}</h2>
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Risk Warning:</strong> investment in private equity involves significant risks including loss of principal, transfer restrictions, and delayed liquidity.
                  </p>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                  <input type="checkbox" className="mt-1 h-4 w-4" />
                  <div>
                    <p className="font-medium text-slate-900">I accept the risk disclosure and data verification workflow</p>
                    <p className="text-sm text-slate-500">
                      This includes AML review, ownership review where relevant, and role-based document validation.
                    </p>
                  </div>
                </label>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBack}
                    className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => alert(t('kyc.successDesc'))}
                    className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                  >
                    {t('kyc.submit')}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Forge Reference Summary</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>Buyers must pass identity review and accredited investor validation before submitting bids.</li>
                <li>Sellers must pass identity review and ownership proof before an ask can become a listing.</li>
                <li>Institutions need KYB, authorized signatory proof, and UBO details.</li>
                <li>FA needs qualification, bank verification, and training before taking platform work.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Execution Rule</h3>
              <p className="mt-3 text-sm text-slate-600">
                Electronic signature can be used, but it is no longer mandatory. Paper signing is acceptable if the executed package includes lawyer witnessing or notarized legal certification.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-2 text-slate-600">Need assistance with verification?</p>
              <Link href="/contact" className="font-medium text-blue-600 hover:underline">
                Contact our support team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
