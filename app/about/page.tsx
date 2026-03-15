'use client';

import React from 'react';
import BuyerLayout from '@/components/BuyerLayout';
import Link from 'next/link';

const team = [
  {
    name: 'Zhang Wei',
    role: 'CEO & Founder',
    bio: 'Former MD at Goldman Sachs, 15+ years in investment banking.',
    image: 'ZW',
  },
  {
    name: 'Li Xiaoming',
    role: 'Chief Investment Officer',
    bio: 'Ex-Blackstone, specialized in TMT sector investments.',
    image: 'LX',
  },
  {
    name: 'Sarah Wang',
    role: 'Head of Compliance',
    bio: 'Former HKMA regulator, ensuring full compliance with all regulations.',
    image: 'SW',
  },
  {
    name: 'Chen Jing',
    role: 'Head of Trading',
    bio: '10+ years in secondary market trading, executed $2B+ in transactions.',
    image: 'CJ',
  },
];

const stats = [
  { label: 'Founded', value: '2024' },
  { label: 'Team Size', value: '50+' },
  { label: 'Licensed In', value: 'Hong Kong' },
  { label: 'Transactions', value: '$2B+' },
];

export default function AboutPage() {
  return (
    <BuyerLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=")' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About VentureFlow
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            The world's first officially authorized ByteDance equity secondary market trading platform
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-4">
                To provide a transparent, compliant, and efficient platform for ByteDance equity trading, 
                connecting institutional investors with high-quality investment opportunities.
              </p>
              <p className="text-lg text-slate-600 mb-4">
                We bridge the gap between private company shareholders and qualified investors, 
                ensuring fair pricing, regulatory compliance, and seamless transaction execution.
              </p>
              <p className="text-lg text-slate-600">
                Our platform combines cutting-edge technology with deep industry expertise to deliver 
                the best secondary market experience.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">🎯</span>
                  </div>
                  <div>
                    <p className="font-semibold">2024 Q1</p>
                    <p className="text-sm text-blue-100">Company founded with official ByteDance authorization</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">📈</span>
                  </div>
                  <div>
                    <p className="font-semibold">2024 Q3</p>
                    <p className="text-sm text-blue-100">Platform launched with 100+ institutional investors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">🌏</span>
                  </div>
                  <div>
                    <p className="font-semibold">2025 Q1</p>
                    <p className="text-sm text-blue-100">Expanded to serve family offices across Asia-Pacific</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold">🏆</span>
                  </div>
                  <div>
                    <p className="font-semibold">2025 Q4</p>
                    <p className="text-sm text-blue-100">Surpassed $2B in cumulative transaction volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Compliance First',
                description: 'Full regulatory compliance with HKMA requirements and ByteDance authorization.',
              },
              {
                icon: '🤝',
                title: 'Transparency',
                description: 'Clear pricing, verified information, and open communication throughout the process.',
              },
              {
                icon: '⚡',
                title: 'Efficiency',
                description: 'Streamlined processes that reduce transaction time from weeks to days.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-slate-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <span className="text-5xl mb-4 block">{value.icon}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Industry veterans with decades of combined experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
                  {member.image}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted Partners</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Working with leading institutions to deliver excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Top Tier Banks', 'Law Firms', 'Audit Firms', 'Regulatory Bodies'].map((partner) => (
              <div key={partner} className="flex items-center justify-center p-6 bg-slate-50 rounded-lg">
                <p className="text-slate-600 font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Future of Equity Trading
          </h2>
          <p className="text-blue-100 mb-8">
            Start your investment journey with the most trusted ByteDance equity platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kyc" className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              Get Started Now
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </BuyerLayout>
  );
}
