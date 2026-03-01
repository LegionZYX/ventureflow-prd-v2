'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function AIToolsPage() {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!aiEnabled) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(`AI Analysis Complete:

✅ Document Type: Proof of Funds (POF)
✅ Bank: HSBC Hong Kong
✅ Account Holder: BlueChip Capital Ltd
✅ Available Balance: $158,000,000 USD
✅ Document Date: 2026-02-25
✅ Verification Status: VALID

Gaps Detected:
⚠️ Bank stamp missing on page 2
⚠️ Signatory authorization letter not attached

Recommendation: Request additional documentation before proceeding.`);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Tools Center</h1>
            <p className="text-slate-500 mt-1">Document parsing and gap analysis powered by AI</p>
          </div>
        </div>

        {/* AI Toggle */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">AI Processing Engine</h2>
              <p className="text-purple-100 mt-1">Enable AI features for document analysis and validation</p>
            </div>
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`relative w-16 h-8 rounded-full transition-colors ${aiEnabled ? 'bg-green-400' : 'bg-white/30'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${aiEnabled ? 'left-9' : 'left-1'}`} />
            </button>
          </div>
          {!aiEnabled && (
            <div className="mt-4 p-3 bg-white/20 rounded-lg text-sm">
              ⚠️ AI features are disabled. Enable to use document parsing and gap analysis.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Parser */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">📄 Document Parser</h3>
            <p className="text-sm text-slate-500 mb-4">Upload POF, financial statements, or KYC documents for AI analysis</p>
            
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => setDocumentUploaded(true)}
            >
              {documentUploaded ? (
                <div>
                  <p className="text-green-600 font-medium">✓ Document uploaded</p>
                  <p className="text-sm text-slate-500 mt-1">pof_bluechip_capital.pdf (2.4 MB)</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-400">📁 Drop file here or click to upload</p>
                  <p className="text-xs text-slate-400 mt-2">PDF, PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!aiEnabled || !documentUploaded || analyzing}
              className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
                aiEnabled && documentUploaded && !analyzing
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {analyzing ? '🔄 Analyzing...' : '🤖 Run AI Analysis'}
            </button>

            {result && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">{result}</pre>
              </div>
            )}
          </div>

          {/* Gap Checker */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">🔍 Gap Checker</h3>
            <p className="text-sm text-slate-500 mb-4">Identify missing information in buyer applications</p>

            <div className="space-y-3">
              {['李明', 'Pacific Wealth FO', 'Zhang Broker Ltd'].map((buyer) => (
                <div key={buyer} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">{buyer}</p>
                    <p className="text-xs text-slate-500">Application submitted 2 days ago</p>
                  </div>
                  <button
                    disabled={!aiEnabled}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      aiEnabled
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Check Gaps
                  </button>
                </div>
              ))}
            </div>

            {!aiEnabled && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                ⚠️ Enable AI to use gap checker feature
              </div>
            )}
          </div>
        </div>

        {/* AI Processing History */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Processing History</h3>
          <div className="space-y-2">
            {[
              { doc: 'POF - BlueChip Capital', date: '2026-02-26 14:30', status: 'Completed', result: 'Valid' },
              { doc: 'Financial Statements - VideoAI', date: '2026-02-25 09:15', status: 'Completed', result: 'Gaps Found' },
              { doc: 'KYC - Sarah Chen', date: '2026-02-24 16:45', status: 'Completed', result: 'Valid' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-slate-900">{item.doc}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.result === 'Valid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
