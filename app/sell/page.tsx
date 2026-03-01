'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';

export default function SellSharesPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Asset Info
    companyName: '',
    shareType: '',
    shareCount: '',
    estimatedValue: '',
    // Seller Info
    sellerType: 'individual',
    contactName: '',
    email: '',
    phone: '',
    // Documents
    proofOfOwnership: false,
    purchaseAgreement: false,
    idVerification: false,
    // Additional Info
    reasonForSelling: '',
    minimumPrice: '',
    urgency: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sell Your Shares
          </h1>
          <p className="text-blue-100 text-lg">
            List your ByteDance equity or other pre-IPO shares on our platform
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, title: 'Asset Info' },
              { num: 2, title: 'Seller Details' },
              { num: 3, title: 'Documents' },
              { num: 4, title: 'Pricing' },
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
            {/* Step 1: Asset Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Asset Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name *
                  </label>
                  <select
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select company</option>
                    <option value="bytedance">ByteDance</option>
                    <option value="spacex">SpaceX</option>
                    <option value="stripe">Stripe</option>
                    <option value="other">Other Pre-IPO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Share Type *
                  </label>
                  <select
                    value={formData.shareType}
                    onChange={(e) => updateField('shareType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select share type</option>
                    <option value="common">Common Stock</option>
                    <option value="preferred">Preferred Stock</option>
                    <option value="options">Employee Options</option>
                    <option value="rsu">RSU</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Shares *
                    </label>
                    <input
                      type="number"
                      value={formData.shareCount}
                      onChange={(e) => updateField('shareCount', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estimated Value (USD) *
                    </label>
                    <input
                      type="text"
                      value={formData.estimatedValue}
                      onChange={(e) => updateField('estimatedValue', e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., $500,000"
                    />
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  disabled={!formData.companyName || !formData.shareType || !formData.shareCount}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              </div>
            )}

            {/* Step 2: Seller Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Seller Information</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Seller Type *
                  </label>
                  <select
                    value={formData.sellerType}
                    onChange={(e) => updateField('sellerType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="individual">Individual (Employee/Founder)</option>
                    <option value="broker">Broker/Agent</option>
                    <option value="institution">Institution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
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
                    disabled={!formData.sellerType || !formData.contactName || !formData.email}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Document Upload</h2>
                <p className="text-sm text-slate-500">
                  Please confirm you have the following documents ready for upload
                </p>
                
                <div className="space-y-4">
                  {[
                    { key: 'proofOfOwnership', name: 'Proof of Ownership (Stock Certificate/Cap Table)', required: true },
                    { key: 'purchaseAgreement', name: 'Original Purchase Agreement', required: true },
                    { key: 'idVerification', name: 'ID Verification (Passport/Government ID)', required: true },
                  ].map((doc) => (
                    <div key={doc.key} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData[doc.key as keyof typeof formData] as boolean}
                            onChange={(e) => updateField(doc.key, e.target.checked)}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="font-medium text-slate-900">{doc.name}</span>
                        </div>
                        {doc.required && <span className="text-xs text-red-500">*</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    📁 Actual file upload will happen after submission. Our team will contact you with secure upload links.
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
                    disabled={!formData.proofOfOwnership || !formData.purchaseAgreement || !formData.idVerification}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Pricing */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Pricing & Timeline</h2>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minimum Acceptable Price (USD) *
                  </label>
                  <input
                    type="text"
                    value={formData.minimumPrice}
                    onChange={(e) => updateField('minimumPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $450,000"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    This is your minimum acceptable price. Final price will be determined through buyer inquiries.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Reason for Selling
                  </label>
                  <select
                    value={formData.reasonForSelling}
                    onChange={(e) => updateField('reasonForSelling', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select reason (optional)</option>
                    <option value="liquidity">Personal Liquidity</option>
                    <option value="diversification">Portfolio Diversification</option>
                    <option value="estate">Estate Planning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Selling Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => updateField('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select urgency</option>
                    <option value="flexible">Flexible (3-6 months)</option>
                    <option value="moderate">Moderate (1-3 months)</option>
                    <option value="urgent">Urgent (within 1 month)</option>
                  </select>
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
                    disabled={!formData.minimumPrice}
                    className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
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
                    <h3 className="font-medium text-slate-900 mb-2">Asset Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Company:</span>
                      <span className="text-slate-900 capitalize">{formData.companyName || '-'}</span>
                      <span className="text-slate-500">Share Type:</span>
                      <span className="text-slate-900 capitalize">{formData.shareType || '-'}</span>
                      <span className="text-slate-500">Shares:</span>
                      <span className="text-slate-900">{formData.shareCount || '-'}</span>
                      <span className="text-slate-500">Est. Value:</span>
                      <span className="text-slate-900">{formData.estimatedValue || '-'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Seller Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-slate-900 capitalize">{formData.sellerType || '-'}</span>
                      <span className="text-slate-500">Name:</span>
                      <span className="text-slate-900">{formData.contactName || '-'}</span>
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-900">{formData.email || '-'}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-medium text-slate-900 mb-2">Pricing</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-slate-500">Min Price:</span>
                      <span className="text-slate-900">{formData.minimumPrice || '-'}</span>
                      <span className="text-slate-500">Urgency:</span>
                      <span className="text-slate-900 capitalize">{formData.urgency || '-'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <span className="text-lg">📋</span>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Next Steps:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Our team will review your submission within 24 hours</li>
                      <li>• You'll receive secure document upload links via email</li>
                      <li>• We'll prepare a preliminary valuation and marketing materials</li>
                      <li>• Qualified buyers will be matched and FA agreements prepared</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      alert('Submission received! Our team will contact you within 24 hours.');
                      setStep(1);
                      setFormData({
                        companyName: '', shareType: '', shareCount: '', estimatedValue: '',
                        sellerType: 'individual', contactName: '', email: '', phone: '',
                        proofOfOwnership: false, purchaseAgreement: false, idVerification: false,
                        reasonForSelling: '', minimumPrice: '', urgency: '',
                      });
                    }}
                    className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Listing
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
