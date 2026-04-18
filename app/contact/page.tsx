'use client';

import React, { useState } from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';
import { useLang } from '@/contexts/LangContext';

export default function ContactPage() {
  const { t } = useLang();
  void Link;
  void t;
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const contactCards = [
    {
      icon: '📞',
      title: '咨询热线',
      value: '+65 6688 8888',
      desc: '专业投资顾问实时在线解答',
    },
    {
      icon: '📧',
      title: '电子邮箱',
      value: 'contact@ventureflow.sg',
      desc: '24 小时内极速响应您的请求',
    },
    {
      icon: '📍',
      title: '办公地址',
      value: 'Marina Bay Sands, Tower 3, Level 55',
      desc: '10 Bayfront Avenue, Singapore 018956',
    },
    {
      icon: '🕐',
      title: '服务时间',
      value: '周一至周五 09:00 - 18:00 (SGT)',
      desc: '新加坡标准时间',
    },
  ];

  const features = [
    {
      icon: '⚖️',
      title: '合规交易',
      description: '严格遵循二级市场监管要求，确保每一笔交易合法合规。',
    },
    {
      icon: '⚡',
      title: '高效撮合',
      description: '依托强大的机构投资者网络，实现快速资产匹配与退出。',
    },
  ];

  return (
    <BuyerLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            全球顶级独角兽股权服务
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            联系我们的股权交易专家，专注于为字节跳动（ByteDance）持股员工及机构提供专业的老股转让、估值咨询及流动性解决方案。
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-white -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-500 transition-all"
              >
                <span className="text-4xl mb-4 block">{card.icon}</span>
                <p className="text-sm text-slate-500 mb-1">{card.title}</p>
                <p className="text-lg font-semibold text-slate-900">{card.value}</p>
                <p className="text-xs text-slate-500 mt-2">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{feature.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Beijing Office */}
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  ByteDance Secondary Market Service Center
                </h2>
                <p className="text-slate-600 mb-8">总部办公室</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">🏢</span>
                    <div>
                      <p className="font-semibold text-slate-900">北京 · 中关村科技中心</p>
                      <p className="text-slate-600">北京市朝阳区融科资讯中心 B 座</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <p className="text-5xl font-bold mb-2">1,200+</p>
                  <p className="text-blue-100">已有 1,200+ 位持有者通过本平台成功完成股权转让</p>
                </div>
                <div className="mt-8 flex justify-center gap-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span className="text-2xl">👨‍💼</span>
                    <span className="text-sm">Advisor</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span className="text-2xl">👨‍💼</span>
                    <span className="text-sm">Advisor</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span className="text-2xl">👨‍💼</span>
                    <span className="text-sm">Advisor</span>
                  </div>
                </div>
              </div>

              {/* Compliance Notice */}
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <p className="text-sm text-amber-800">
                  <span className="font-semibold">⚠️ 重要提示：</span>
                  我们仅为合格投资者提供服务。所有股权转让均需遵守字节跳动公司章程及相关法律法规的要求。
                </p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  提交您的交易意向
                </h2>
                <p className="text-slate-600 mb-6">
                  请在下方填写您的基本需求，我们的合伙人级别顾问将在 2 小时内（工作日）为您提供初步的市场估值参考与交易建议。
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">✅</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">消息已发送！</h3>
                    <p className="text-slate-600 mb-6">
                      感谢您的联系。我们的专业顾问将在 2 小时内与您联系。
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', company: '', email: '', subject: '', message: '' });
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      再发一条消息
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        姓名 *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="您的姓名"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                        公司
                      </label>
                      <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="所属机构名称"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        邮箱地址 *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        咨询主题 *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="如：关于 2026 年员工期权回购政策咨询"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        详细内容 *
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="请描述您的需求或疑问..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 rounded-lg font-semibold transition-all ${
                        isSubmitting
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                      } text-white`}
                    >
                      {isSubmitting ? '发送中...' : '发送消息'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Contact Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">联系专家</h2>
          <p className="text-slate-600 mb-8">
            对字节跳动 (ByteDance) 的二级市场交易有任何疑问？我们的专家团队随时为您提供专业解答。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-4xl mb-4 block">📧</span>
              <p className="font-semibold text-slate-900 mb-2">邮箱联系</p>
              <a href="mailto:desk@bytedance-secondary.com" className="text-blue-600 hover:underline">
                desk@bytedance-secondary.com
              </a>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <span className="text-4xl mb-4 block">📍</span>
              <p className="font-semibold text-slate-900 mb-2">办公地址</p>
              <p className="text-slate-600">北京市朝阳区融科资讯中心 B 座</p>
            </div>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
