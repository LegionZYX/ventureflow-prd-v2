'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import PriceChart from '@/components/PriceChart';

const opportunities = [
  { id: 1, name: 'ByteDance Series H Common Stock', company: 'ByteDance', type: 'ByteDance', valuation: '$225B', price: '$165.5', volume: '$50M', discount: '-15.2%', status: 'Active', description: 'Large institutional block, 50M shares available' },
  { id: 2, name: 'ByteDance Employee Options', company: 'ByteDance', type: 'ByteDance', valuation: '$210B', price: '$142', volume: '$5M', discount: '-22.5%', status: 'Active', description: 'High discount, retail-friendly minimum' },
  { id: 3, name: 'AI Video Company Series A', company: 'VideoAI Inc', type: 'AI', valuation: '$500M', price: '$9.0', volume: '$2M', discount: 'N/A', status: 'Active', description: 'ByteDance overseas video licensing partner' },
  { id: 4, name: 'Space Computing SPV', company: 'SpaceCompute LP', type: 'SPV', valuation: '$10B', price: '$100', volume: '$100M', discount: 'N/A', status: 'Active', description: 'Oracle $10B order backed, NVIDIA partner' },
  { id: 5, name: 'ByteDance RSU', company: 'ByteDance', type: 'ByteDance', valuation: '$230B', price: '$172.8', volume: '$12M', discount: '-8.5%', status: 'Reviewing', description: 'Restricted Stock Unit transfer' },
  { id: 6, name: 'ByteDance Series E-2 Preferred', company: 'ByteDance', type: 'ByteDance', valuation: '$245B', price: '$188', volume: '$100M', discount: '-5%', status: 'Active', description: 'Top tier, long-term hold with liquidation preference' },
];

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState<typeof opportunities[0] | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showFaAgreement, setShowFaAgreement] = useState(false);
  const [faAgreed, setFaAgreed] = useState(false);

  const filteredOpportunities = filter === 'All' ? opportunities : opportunities.filter(o => o.type === filter);

  const handleExpressInterest = (opp: typeof opportunities[0]) => {
    setSelectedAsset(opp);
    setShowInquiryModal(true);
    setShowFaAgreement(false);
    setFaAgreed(false);
  };

  const handleInquirySubmit = () => {
    if (!faAgreed) return;
    setShowInquiryModal(false);
    alert('Inquiry submitted! Our team will contact you within 24 hours to schedule a call.');
  };

  return (
    <BuyerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Investment Opportunities</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Carefully curated ByteDance equity deals with verified valuations and complete transparency.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
            <div className="flex flex-wrap gap-2">
              {['All', 'ByteDance', 'AI', 'SPV'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <Link 
              href="/sell" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              💼 Sell Your Shares
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">Total Opportunities</p>
              <p className="text-2xl font-bold text-slate-900">{opportunities.length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">Active Listings</p>
              <p className="text-2xl font-bold text-green-600">{opportunities.filter(o => o.status === 'Active').length}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-sm text-slate-500">Total Volume</p>
              <p className="text-2xl font-bold text-slate-900">$271M</p>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOpportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{opp.name}</h3>
                    <p className="text-sm text-slate-500">{opp.company} • {opp.type}</p>
                    <p className="text-sm text-slate-600 mt-2">{opp.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    opp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {opp.status}
                  </span>
                </div>

                {/* Price Chart */}
                <div className="mb-4">
                  <PriceChart height={200} />
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    ⚠️ Prices shown are reference estimates based on recent transactions
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500">Valuation</p>
                    <p className="font-semibold text-slate-900">{opp.valuation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Reference Price</p>
                    <p className="font-semibold text-blue-600">{opp.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Volume</p>
                    <p className="font-semibold text-slate-900">{opp.volume}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Discount</p>
                    <p className="font-semibold text-green-600">{opp.discount}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleExpressInterest(opp)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Request Quote
                  </button>
                  <button 
                    onClick={() => setSelectedAsset(opp)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal with FA Agreement */}
      {showInquiryModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Request Price Quote</h3>
            <p className="text-slate-600 mb-6">{selectedAsset.name}</p>
            
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
                    Before requesting a quote, you must agree to our Fee Agreement. This ensures both parties are committed to the transaction process.
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
