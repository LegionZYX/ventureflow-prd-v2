'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'zh';

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.opportunities': 'Opportunities',
    'nav.sell': 'Sell Shares',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Log in',
    'nav.getStarted': 'Get Started',
    'nav.investorLogin': 'Investor Login',
    'nav.faLogin': 'FA/Admin Login',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.badge': 'ByteDance Officially Authorized Platform',
    'hero.title1': 'ByteDance Equity',
    'hero.title2': 'Secondary Market',
    'hero.description': "The world's first officially authorized equity trading platform for ByteDance. Complete KYC, equity management, and escrow services for family offices and institutional investors.",
    'hero.startKYC': 'Start KYC Verification',
    'hero.browse': 'Browse Opportunities',
    
    // Stats
    'stat.valuation': 'Implied Valuation',
    'stat.volume': 'Monthly Volume',
    'stat.discount': 'Avg Discount',
    'stat.buyers': 'Active Buyers',
    
    // Features
    'features.title': 'Why Choose VentureFlow?',
    'features.description': 'One-stop ByteDance equity trading service, from KYC verification to closing, with professional support throughout.',
    'features.kyc.title': 'KYC Verification',
    'features.kyc.desc': 'HKMA-compliant institutional verification process ensuring regulatory compliance.',
    'features.equity.title': 'Equity Management',
    'features.equity.desc': 'Carta-inspired equity management tools to track your portfolio performance in real-time.',
    'features.deal.title': 'Deal Execution',
    'features.deal.desc': 'Exclusive deal rooms and HK bank escrow accounts ensuring transaction security.',
    'features.compliance.title': 'Compliance',
    'features.compliance.desc': 'ByteDance official authorization with legal witness and full legal protection.',
    
    // Opportunities
    'opp.title': 'Featured Opportunities',
    'opp.description': 'Curated ByteDance equity deals with verified valuations',
    'opp.viewAll': 'View All',
    'opp.page.title': 'Investment Opportunities',
    'opp.page.description': 'Browse verified companies and explore exclusive equity deals in ByteDance and other pre-IPO unicorns.',
    'opp.page.sellShares': '💼 Sell Your Shares',
    'opp.page.totalCompanies': 'Total Companies',
    'opp.page.activeListings': 'Active Listings',
    'opp.page.totalValuation': 'Total Valuation',
    'opp.page.companyDetail': 'Company Detail',
    'opp.page.inquireNow': '💰 Inquire Now',
    'opp.page.noDeals': 'No active deals available at the moment.',
    'opp.page.contactFA': 'Contact our FA team for more opportunities.',
    'opp.page.backToList': '← Back to Opportunities',
    'opp.page.shareOpportunity': '📤 Share Opportunity',
    'opp.page.learnMore': 'Learn More',
    
    // Testimonials
    'testimonials.title': 'Trusted by Investors',
    'testimonials.description': 'Over 500 institutions and family offices completed their ByteDance equity allocation through our platform',
    'testimonials.verified': 'Verified Investor',
    
    // CTA
    'cta.title': 'Start Your Equity Investment Journey',
    'cta.description': "Whether you're looking for early institutional blocks or employee option transfers, our professional team provides end-to-end support.",
    'cta.browse': 'Browse Opportunities',
    'cta.contact': 'Contact Advisor',
    
    // Footer
    'footer.platform': 'Platform',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 VentureFlow. All rights reserved.',
    
    // About Page
    'about.title': 'About VentureFlow',
    'about.subtitle': "The world's first officially authorized ByteDance equity secondary market trading platform",
    'about.mission': 'Our Mission',
    'about.missionText1': 'To provide a transparent, compliant, and efficient platform for ByteDance equity trading, connecting institutional investors with high-quality investment opportunities.',
    'about.missionText2': "We bridge the gap between private company shareholders and qualified investors, ensuring fair pricing, regulatory compliance, and seamless transaction execution.",
    'about.missionText3': 'Our platform combines cutting-edge technology with deep industry expertise to deliver the best secondary market experience.',
    'about.milestones': 'Key Milestones',
    'about.stats.founded': 'Founded',
    'about.stats.team': 'Team Size',
    'about.stats.licensed': 'Licensed In',
    'about.stats.transactions': 'Transactions',
    'about.values.title': 'Our Values',
    'about.values.desc': 'The principles that guide everything we do',
    'about.values.compliance': 'Compliance First',
    'about.values.transparency': 'Transparency',
    'about.values.efficiency': 'Efficiency',
    'about.team.title': 'Leadership Team',
    'about.team.desc': 'Industry veterans with decades of combined experience',
    'about.partners.title': 'Trusted Partners',
    'about.partners.desc': 'Working with leading institutions to deliver excellence',
    'about.cta.title': 'Join the Future of Equity Trading',
    'about.cta.desc': 'Start your investment journey with the most trusted ByteDance equity platform',
    'about.cta.start': 'Get Started Now',
    
    // Contact Page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team of experts',
    'contact.email': 'Email',
    'contact.hq': 'Headquarters',
    'contact.phone': 'Phone',
    'contact.wechat': 'WeChat',
    'contact.messageTitle': 'Send us a Message',
    'contact.sent': 'Message Sent!',
    'contact.sentDesc': 'Thank you for contacting us. Our team will respond within 24 hours.',
    'contact.sendAnother': 'Send another message',
    'contact.name': 'Full Name',
    'contact.emailLabel': 'Email Address',
    'contact.company': 'Company',
    'contact.subject': 'Subject',
    'contact.selectSubject': 'Select a subject',
    'contact.subject.investment': 'Investment Inquiry',
    'contact.subject.selling': 'Selling Shares',
    'contact.subject.partnership': 'Partnership Opportunity',
    'contact.subject.support': 'Technical Support',
    'contact.subject.other': 'Other',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.officeHours': 'Office Hours',
    'contact.weekdays': 'Monday - Friday',
    'contact.saturday': 'Saturday',
    'contact.sunday': 'Sunday',
    'contact.hours': '9:00 AM - 6:00 PM HKT',
    'contact.appointment': 'By Appointment',
    'contact.closed': 'Closed',
    'contact.departments': 'Departments',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.desc': 'Quick answers to common questions',
    
    // KYC Page
    'kyc.title': 'KYC Verification',
    'kyc.subtitle': 'Complete investor verification to unlock investment opportunities',
    'kyc.step1': 'Account Type',
    'kyc.step2': 'Basic Information',
    'kyc.step3': 'Identity Information',
    'kyc.step4': 'Investor Qualification',
    'kyc.step5': 'Risk Disclosure',
    'kyc.individual': 'Individual Investor',
    'kyc.institutional': 'Institutional Investor',
    'kyc.fullName': 'Full Name',
    'kyc.email': 'Email',
    'kyc.phone': 'Phone',
    'kyc.passport': 'Passport/ID Number',
    'kyc.investorCert': 'Accredited Investor Certificate',
    'kyc.riskDisclosure': 'Risk Disclosure',
    'kyc.submit': 'Submit Verification',
    'kyc.success': 'Verification Submitted!',
    'kyc.successDesc': 'Your KYC application has been submitted. We will review within 24 hours.',
    
    // Sell Page
    'sell.title': 'Sell Shares',
    'sell.subtitle': 'List your shares for sale. Our professional team will provide the best pricing.',
    'sell.step1': 'Asset Information',
    'sell.step2': 'Seller Information',
    'sell.step3': 'Documents',
    'sell.step4': 'Additional Info',
    'sell.companyName': 'Company Name',
    'sell.shareType': 'Share Type',
    'sell.shareCount': 'Number of Shares',
    'sell.estimatedValue': 'Estimated Value',
    'sell.sellerType': 'Seller Type',
    'sell.contactName': 'Contact Name',
    'sell.documents': 'Documents',
    'sell.proofOfOwnership': 'Proof of Ownership',
    'sell.purchaseAgreement': 'Purchase Agreement',
    'sell.idVerification': 'ID Verification',
    'sell.reasonForSelling': 'Reason for Selling',
    'sell.minimumPrice': 'Minimum Price',
    'sell.urgency': 'Urgency',
    'sell.submit': 'Submit Listing',
    'sell.success': 'Listing Submitted!',
    'sell.successDesc': 'Our FA team will contact you within 2 hours with market valuation and trading advice.',
    
    // Company Detail Page
    'company.detail': 'Company Detail',
    'company.inquireNow': '💰 Inquire Now',
    'company.noDeals': 'No active deals available at the moment.',
    'company.contactFA': 'Contact our FA team for more opportunities.',
    'company.backToList': '← Back to Opportunities',
    'company.shareOpportunity': '📤 Share Opportunity',
    'company.learnMore': 'Learn More',
    'company.valuation': 'Valuation',
    'company.pricePerShare': 'Price/Share',
    'company.volume': 'Volume',
    'company.discount': 'Discount',
    'company.founded': 'Founded',
    'company.headquarters': 'Headquarters',
    'company.industry': 'Industry',
    'company.description': 'Description',
    'company.activeDeals': 'Active Deals',
    'company.expressInterest': 'Express Interest',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.opportunities': '投资机会',
    'nav.sell': '出售股份',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.login': '登录',
    'nav.getStarted': '开始使用',
    'nav.investorLogin': '投资者登录',
    'nav.faLogin': 'FA/管理员登录',
    'nav.dashboard': '仪表板',
    'nav.logout': '退出',
    
    // Hero
    'hero.badge': '字节跳动官方授权平台',
    'hero.title1': '字节跳动股权',
    'hero.title2': '二级市场',
    'hero.description': '全球首个字节跳动官方授权股权交易平台。为家族办公室和机构投资者提供完整的 KYC、股权管理和托管服务。',
    'hero.startKYC': '开始 KYC 认证',
    'hero.browse': '浏览投资机会',
    
    // Stats
    'stat.valuation': '隐含估值',
    'stat.volume': '月交易量',
    'stat.discount': '平均折扣',
    'stat.buyers': '活跃买家',
    
    // Features
    'features.title': '为什么选择 VentureFlow？',
    'features.description': '一站式字节跳动股权交易服务，从 KYC 认证到交易完成，全程专业支持。',
    'features.kyc.title': 'KYC 认证',
    'features.kyc.desc': '符合香港金融管理局要求的机构级验证流程，确保合规。',
    'features.equity.title': '股权管理',
    'features.equity.desc': '灵感来自 Carta 的股权管理工具，实时追踪投资组合表现。',
    'features.deal.title': '交易执行',
    'features.deal.desc': '专属交易室和香港银行托管账户，确保交易安全。',
    'features.compliance.title': '合规保障',
    'features.compliance.desc': '字节跳动官方授权，法律见证，全面法律保护。',
    
    // Opportunities
    'opp.title': '精选投资机会',
    'opp.description': '经过估值验证的字节跳动股权交易',
    'opp.viewAll': '查看全部',
    'opp.page.title': '投资机会',
    'opp.page.description': '浏览验证公司，探索字节跳动及其他独角兽的独家股权交易机会。',
    'opp.page.sellShares': '💼 出售股份',
    'opp.page.totalCompanies': '公司总数',
    'opp.page.activeListings': '活跃挂牌',
    'opp.page.totalValuation': '总估值',
    'opp.page.companyDetail': '公司详情',
    'opp.page.inquireNow': '💰 立即询价',
    'opp.page.noDeals': '暂无可用的交易机会。',
    'opp.page.contactFA': '联系我们的 FA 团队了解更多机会。',
    'opp.page.backToList': '← 返回机会列表',
    'opp.page.shareOpportunity': '📤 分享机会',
    'opp.page.learnMore': '了解更多',
    
    // Testimonials
    'testimonials.title': '投资者信赖',
    'testimonials.description': '超过 500 家机构和家族办公室通过我们的平台完成字节跳动股权配置',
    'testimonials.verified': '已验证投资者',
    
    // CTA
    'cta.title': '开启您的股权投资之旅',
    'cta.description': '无论您在寻找机构大额交易还是员工期权转让，我们的专业团队提供全程支持。',
    'cta.browse': '浏览投资机会',
    'cta.contact': '联系顾问',
    
    // Footer
    'footer.platform': '平台',
    'footer.legal': '法律',
    'footer.contact': '联系',
    'footer.rights': '© 2026 VentureFlow. 版权所有.',
    
    // About Page
    'about.title': '关于 VentureFlow',
    'about.subtitle': '全球首个字节跳动官方授权股权二级市场交易平台',
    'about.mission': '我们的使命',
    'about.missionText1': '为字节跳动股权交易提供透明、合规、高效的平台，连接机构投资者与优质投资机会。',
    'about.missionText2': '我们架起私人公司股东与合格投资者之间的桥梁，确保公平定价、合规监管和无缝交易执行。',
    'about.missionText3': '我们的平台将尖端技术与深厚的行业专业知识相结合，提供最佳的二级市场体验。',
    'about.milestones': '重要里程碑',
    'about.stats.founded': '成立时间',
    'about.stats.team': '团队规模',
    'about.stats.licensed': '持牌地区',
    'about.stats.transactions': '交易额',
    'about.values.title': '我们的价值观',
    'about.values.desc': '指导我们一切行为的原则',
    'about.values.compliance': '合规至上',
    'about.values.transparency': '透明公开',
    'about.values.efficiency': '高效便捷',
    'about.team.title': '领导团队',
    'about.team.desc': '拥有数十年综合经验的行业资深人士',
    'about.partners.title': '可信赖的合作伙伴',
    'about.partners.desc': '与领先机构合作，提供卓越服务',
    'about.cta.title': '加入股权交易的未来',
    'about.cta.desc': '在最受信赖的字节跳动股权平台开始您的投资之旅',
    'about.cta.start': '立即开始',
    
    // Contact Page
    'contact.title': '联系我们',
    'contact.subtitle': '与我们的专家团队取得联系',
    'contact.email': '电子邮箱',
    'contact.hq': '总部',
    'contact.phone': '电话',
    'contact.wechat': '微信',
    'contact.messageTitle': '发送消息',
    'contact.sent': '消息已发送！',
    'contact.sentDesc': '感谢您的联系。我们的团队将在 24 小时内回复。',
    'contact.sendAnother': '再发一条消息',
    'contact.name': '姓名',
    'contact.emailLabel': '邮箱地址',
    'contact.company': '公司',
    'contact.subject': '主题',
    'contact.selectSubject': '请选择主题',
    'contact.subject.investment': '投资咨询',
    'contact.subject.selling': '出售股份',
    'contact.subject.partnership': '合作机会',
    'contact.subject.support': '技术支持',
    'contact.subject.other': '其他',
    'contact.message': '消息内容',
    'contact.send': '发送消息',
    'contact.sending': '发送中...',
    'contact.officeHours': '办公时间',
    'contact.weekdays': '周一至周五',
    'contact.saturday': '周六',
    'contact.sunday': '周日',
    'contact.hours': '上午 9:00 - 下午 6:00 (香港时间)',
    'contact.appointment': '预约',
    'contact.closed': '休息',
    'contact.departments': '部门',
    'contact.faq.title': '常见问题',
    'contact.faq.desc': '常见问题的快速解答',
    
    // KYC Page
    'kyc.title': 'KYC Verification',
    'kyc.subtitle': 'Complete investor verification to unlock investment opportunities',
    'kyc.step1': 'Account Type',
    'kyc.step2': 'Basic Information',
    'kyc.step3': 'Identity Information',
    'kyc.step4': 'Investor Qualification',
    'kyc.step5': 'Risk Disclosure',
    'kyc.individual': 'Individual Investor',
    'kyc.institutional': 'Institutional Investor',
    'kyc.fullName': 'Full Name',
    'kyc.email': 'Email',
    'kyc.phone': 'Phone',
    'kyc.passport': 'Passport/ID Number',
    'kyc.investorCert': 'Accredited Investor Certificate',
    'kyc.riskDisclosure': 'Risk Disclosure',
    'kyc.submit': 'Submit Verification',
    'kyc.success': 'Verification Submitted!',
    'kyc.successDesc': 'Your KYC application has been submitted. We will review within 24 hours.',
    
    // Sell Page
    'sell.title': 'Sell Shares',
    'sell.subtitle': 'List your shares for sale. Our professional team will provide the best pricing.',
    'sell.step1': 'Asset Information',
    'sell.step2': 'Seller Information',
    'sell.step3': 'Documents',
    'sell.step4': 'Additional Info',
    'sell.companyName': 'Company Name',
    'sell.shareType': 'Share Type',
    'sell.shareCount': 'Number of Shares',
    'sell.estimatedValue': 'Estimated Value',
    'sell.sellerType': 'Seller Type',
    'sell.contactName': 'Contact Name',
    'sell.documents': 'Documents',
    'sell.proofOfOwnership': 'Proof of Ownership',
    'sell.purchaseAgreement': 'Purchase Agreement',
    'sell.idVerification': 'ID Verification',
    'sell.reasonForSelling': 'Reason for Selling',
    'sell.minimumPrice': 'Minimum Price',
    'sell.urgency': 'Urgency',
    'sell.submit': 'Submit Listing',
    'sell.success': 'Listing Submitted!',
    'sell.successDesc': 'Our FA team will contact you within 2 hours with market valuation and trading advice.',
    
    // Company Detail Page
    'company.detail': 'Company Detail',
    'company.inquireNow': '💰 Inquire Now',
    'company.noDeals': 'No active deals available at the moment.',
    'company.contactFA': 'Contact our FA team for more opportunities.',
    'company.backToList': '← Back to Opportunities',
    'company.shareOpportunity': '📤 Share Opportunity',
    'company.learnMore': 'Learn More',
    'company.valuation': 'Valuation',
    'company.pricePerShare': 'Price/Share',
    'company.volume': 'Volume',
    'company.discount': 'Discount',
    'company.founded': 'Founded',
    'company.headquarters': 'Headquarters',
    'company.industry': 'Industry',
    'company.description': 'Description',
    'company.activeDeals': 'Active Deals',
    'company.expressInterest': 'Express Interest',
  },
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations.en] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
