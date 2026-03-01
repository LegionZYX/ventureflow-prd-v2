'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Info
    companyName: '',
    registrationNumber: '',
    country: '',
    companyType: '',
    // Contact Info
    contactName: '',
    email: '',
    phone: '',
    // Investor Type
    investorType: '',
    aum: '',
    // Documents
    documents: [] as string[],
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Investor Verification
          </h1>
          <p className="text-blue-100 text-lg">
            Complete KYC verification to access exclusive ByteDance equity opportunities
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, title: 'Company Info' },
              { num: 2, title: 'Contact Details' },
              { num: 3, title: 'Investor Type' },
              { num: 4, title: 'Documents' },
              { num: 5, title: 'Review' },
            ].map((s, index) => (
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
            {/* Step 1: Company Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Company Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => updateField('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter registration number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country of Incorporation *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    <option value="HK">Hong Kong</option>
                    <option value="SG">Singapore</option>
                    <option value="US">United States</option>
                    <option value="CN">China</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Type *
                  </label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => updateField('companyType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="Family Office">Family Office</option>
                    <option value="VC/PE">VC/PE Fund</option>
                    <option value="Hedge Fund">Hedge Fund</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Trust">Trust</option>
                  </select>
                </div>
                <button
                  onClick={handleNext}
                  disabled={!formData.companyName || !formData.registrationNumber}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            )}

            {/* Step 2: Contact Info */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter work email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.contactName || !formData.email}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Investor Type */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Investor Profile</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Investor Type *
                  </label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => updateField('investorType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select investor type</option>
                    <option value="Accredited">Accredited Investor</option>
                    <option value="Institutional">Institutional Investor</option>
                    <option value="Qualified">Qualified Purchaser</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Assets Under Management (AUM) *
                  </label>
                  <select
                    value={formData.aum}
                    onChange={(e) => updateField('aum', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select AUM range</option>
                    <option value="<10M">Less than $10M</option>
                    <option value="10M-50M">$10M - $50M</option>
                    <option value="50M-100M">$50M - $100M</option>
                    <option value="100M-500M">$100M - $500M</option>
                    <option value=">500M">More than $500M</option>
                  </select>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📋 You'll need to provide proof of AUM in the next step.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.investorType || !formData.aum}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Document Upload</h2>
                <p className="text-sm text-slate-500">
                  Please upload the following documents for verification
                </p>
                
                <div className="space-y-4">
                  {[
                    { name: 'Certificate of Incorporation', required: true },
                    { name: 'Proof of Funds (POF)', required: true },
                    { name: 'Passport / ID of Authorized Signatory', required: true },
                    { name: 'Proof of Address (Utility Bill)', required: false },
                  ].map((doc) => (
                    <div key={doc.name} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">{doc.name}</span>
                        {doc.required && <span className="text-xs text-red-500">Required *</span>}
                      </div>
                      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <p className="text-sm text-slate-500">📁 Drop file here or click to upload</p>
                        <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Review & Submit
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Company Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Company:</span>
                      <span className="text-slate-900">{formData.companyName || '-'}</span>
                      <span className="text-slate-500">Registration:</span>
                      <span className="text-slate-900">{formData.registrationNumber || '-'}</span>
                      <span className="text-slate-500">Country:</span>
                      <span className="text-slate-900">{formData.country || '-'}</span>
                      <span className="text-slate-500">Type:</span>
                      <span className="text-slate-900">{formData.companyType || '-'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Name:</span>
                      <span className="text-slate-900">{formData.contactName || '-'}</span>
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-900">{formData.email || '-'}</span>
                      <span className="text-slate-500">Phone:</span>
                      <span className="text-slate-900">{formData.phone || '-'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Investor Profile</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-slate-900">{formData.investorType || '-'}</span>
                      <span className="text-slate-500">AUM:</span>
                      <span className="text-slate-900">{formData.aum || '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm text-yellow-800">
                    By submitting this application, you confirm that all information provided is accurate and complete.
                    Our compliance team will review your application within 2-3 business days.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => alert('Application submitted! We will contact you within 2-3 business days.')}
                    className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
