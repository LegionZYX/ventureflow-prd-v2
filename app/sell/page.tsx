'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import { useLang } from '@/contexts/LangContext';

export default function IntentRegistryPage() {
  const { t } = useLang();
  const [intentType, setIntentType] = useState<'select' | 'buy' | 'sell'>('select');

  if (intentType === 'select') {
    return (
      <BuyerLayout>
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              交易意向登记
            </h1>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              Trading Intent Registration - Register your interest to buy or sell shares
            </p>
          </div>
        </section>

        {/* Intent Type Selection */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Buy Intent */}
              <button
                onClick={() => setIntentType('buy')}
                className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8 hover:border-blue-500 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">买方意向登记</h2>
                    <p className="text-slate-500">Buy Intent Registration</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  如果您想购买字节跳动或其他独角兽公司的股权，请填写买方意向登记。
                  我们的 FA 团队将在 24 小时内与您联系，为您提供匹配的投资机会。
                </p>
                <ul className="space-y-2 text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>获取独家投资机会</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>专业 FA 一对一服务</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>优先参与大额交易</span>
                  </li>
                </ul>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  进入买方登记 <span className="ml-2">→</span>
                </div>
              </button>

              {/* Sell Intent */}
              <button
                onClick={() => setIntentType('sell')}
                className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-8 hover:border-green-500 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🏷️
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">卖方意向登记</h2>
                    <p className="text-slate-500">Sell Intent Registration</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  如果您想出售持有的字节跳动或其他公司股权，请填写卖方意向登记。
                  我们将为您提供市场估值，并匹配合格的买家。
                </p>
                <ul className="space-y-2 text-slate-600 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>免费市场估值评估</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>匹配合格买家</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>全程合规交易支持</span>
                  </li>
                </ul>
                <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                  进入卖方登记 <span className="ml-2">→</span>
                </div>
              </button>
            </div>

            {/* Info Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">为什么选择 VentureFlow？</h3>
                <p className="text-slate-600">字节跳动官方授权的股权交易平台</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="font-semibold text-slate-900 mb-2">合规保障</h4>
                  <p className="text-sm text-slate-600">官方授权，法律见证，全面合规</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="font-semibold text-slate-900 mb-2">高效撮合</h4>
                  <p className="text-sm text-slate-600">平均 45 天完成交易</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💼</div>
                  <h4 className="font-semibold text-slate-900 mb-2">专业服务</h4>
                  <p className="text-sm text-slate-600">来自顶级投行和 VC 的专业团队</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BuyerLayout>
    );
  }

  // Render Buy or Sell form based on selection
  if (intentType === 'buy') {
    return <BuyIntentForm onBack={() => setIntentType('select')} />;
  } else {
    return <SellIntentForm onBack={() => setIntentType('select')} />;
  }
}

// Buy Intent Form Component
function BuyIntentForm({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    targetCompany: '',
    investmentRange: '',
    shareTypePreference: '',
    contactName: '',
    email: '',
    phone: '',
    investorType: '',
    kycStatus: 'pending',
    investmentExperience: '',
    timeline: '',
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step > 1 ? step - 1 : 0);
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { num: 1, title: '投资偏好' },
    { num: 2, title: '联系信息' },
    { num: 3, title: '资质证明' },
    { num: 4, title: '补充信息' },
  ];

  const handleSubmit = () => {
    alert('买方意向已提交！我们的 FA 团队将在 24 小时内与您联系。');
    onBack();
  };

  return (
    <BuyerLayout>
      {/* Progress Steps */}
      <section className="py-8 border-b border-slate-200 bg-white">
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
            {/* Step 1: Investment Preferences */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[0].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">目标公司 *</label>
                  <select
                    value={formData.targetCompany}
                    onChange={(e) => updateField('targetCompany', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择公司</option>
                    <option value="bytedance">ByteDance (字节跳动)</option>
                    <option value="spacex">SpaceX</option>
                    <option value="stripe">Stripe</option>
                    <option value="other">其他独角兽</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">投资金额范围 *</label>
                  <select
                    value={formData.investmentRange}
                    onChange={(e) => updateField('investmentRange', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择范围</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m+">$1M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">股份类型偏好</label>
                  <select
                    value={formData.shareTypePreference}
                    onChange={(e) => updateField('shareTypePreference', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">无偏好</option>
                    <option value="common">普通股 (Common Stock)</option>
                    <option value="preferred">优先股 (Preferred Stock)</option>
                    <option value="options">期权 (Options)</option>
                  </select>
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[1].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">姓名/机构名称 *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="您的姓名或机构名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">邮箱 *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">电话 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+852 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">投资人类型 *</label>
                  <select
                    value={formData.investorType}
                    onChange={(e) => updateField('investorType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择类型</option>
                    <option value="individual">个人投资者</option>
                    <option value="institution">机构投资者</option>
                    <option value="family_office">家族办公室</option>
                  </select>
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {/* Step 3: Qualifications */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[2].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">KYC 状态</label>
                  <select
                    value={formData.kycStatus}
                    onChange={(e) => updateField('kycStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">尚未完成</option>
                    <option value="completed">已完成</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">投资经验</label>
                  <textarea
                    value={formData.investmentExperience}
                    onChange={(e) => updateField('investmentExperience', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="请描述您的投资经验，特别是二级市场投资经验..."
                  />
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {/* Step 4: Additional Info */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[3].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">投资时间规划</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => updateField('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">请选择</option>
                    <option value="immediate">立即 (1 个月内)</option>
                    <option value="short">短期 (1-3 个月)</option>
                    <option value="medium">中期 (3-6 个月)</option>
                    <option value="long">长期 (6 个月以上)</option>
                  </select>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>✓ 即将完成！</strong> 提交后，我们的 FA 团队将在 24 小时内与您联系，为您提供匹配的投资机会。
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    返回
                  </button>
                  <button onClick={handleSubmit} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    提交意向
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

// Sell Intent Form Component
function SellIntentForm({ onBack }: { onBack: () => void }) {
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
  const handleBack = () => setStep(step > 1 ? step - 1 : 0);
  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { num: 1, title: '资产信息' },
    { num: 2, title: '卖家信息' },
    { num: 3, title: '文件上传' },
    { num: 4, title: '补充信息' },
  ];

  const handleSubmit = () => {
    alert('卖方意向已提交！我们的 FA 团队将在 2 小时内与您联系，提供市场估值和交易建议。');
    onBack();
  };

  return (
    <BuyerLayout>
      {/* Progress Steps */}
      <section className="py-8 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.num 
                      ? 'bg-green-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <p className={`text-xs mt-2 hidden sm:block ${
                    step >= s.num ? 'text-green-600 font-medium' : 'text-slate-500'
                  }`}>
                    {s.title}
                  </p>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step > s.num ? 'bg-green-600' : 'bg-slate-200'
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
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[0].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">公司名称 *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="ByteDance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">股份类型 *</label>
                  <select
                    value={formData.shareType}
                    onChange={(e) => updateField('shareType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">请选择类型</option>
                    <option value="common">Common Stock</option>
                    <option value="preferred">Preferred Stock</option>
                    <option value="option">Employee Options</option>
                    <option value="rsu">RSU</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">股份数量 *</label>
                  <input
                    type="text"
                    value={formData.shareCount}
                    onChange={(e) => updateField('shareCount', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">预估价值</label>
                  <input
                    type="text"
                    value={formData.estimatedValue}
                    onChange={(e) => updateField('estimatedValue', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="$100,000"
                  />
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[1].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">卖家类型 *</label>
                  <select
                    value={formData.sellerType}
                    onChange={(e) => updateField('sellerType', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="individual">Individual</option>
                    <option value="institutional">Institutional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">联系人 *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="+852 1234 5678"
                  />
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[2].title}</h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input 
                      type="checkbox" 
                      checked={formData.proofOfOwnership}
                      onChange={(e) => updateField('proofOfOwnership', e.target.checked)}
                      className="mt-1 w-4 h-4" 
                    />
                    <div>
                      <p className="font-medium text-slate-900">持股证明</p>
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
                      <p className="font-medium text-slate-900">购买协议</p>
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
                      <p className="font-medium text-slate-900">身份证明</p>
                      <p className="text-sm text-slate-500">Passport or national ID card</p>
                    </div>
                  </label>
                </div>
                <button onClick={handleNext} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  下一步 →
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <button onClick={handleBack} className="text-slate-400 hover:text-slate-600">←</button>
                  <h2 className="text-xl font-bold text-slate-900">{steps[3].title}</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">出售原因</label>
                  <textarea
                    value={formData.reasonForSelling}
                    onChange={(e) => updateField('reasonForSelling', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Why are you selling these shares?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">最低价格</label>
                  <input
                    type="text"
                    value={formData.minimumPrice}
                    onChange={(e) => updateField('minimumPrice', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="$150 per share"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">紧急程度</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => updateField('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">请选择</option>
                    <option value="low">不紧急 (3-6 个月)</option>
                    <option value="medium">中等 (1-3 个月)</option>
                    <option value="high">紧急 (&lt; 1 个月)</option>
                  </select>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    <strong>✓ 即将完成！</strong> 我们的 FA 团队将在 2 小时内与您联系，提供市场估值和交易建议。
                  </p>
                </div>
                <div className="flex gap-4">
                  <button onClick={handleBack} className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
                    返回
                  </button>
                  <button onClick={handleSubmit} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    提交意向
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
