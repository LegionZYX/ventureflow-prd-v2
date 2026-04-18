'use client';

import React, { useState } from 'react';
import { createShareRecord, getShareUrl } from '@/lib/share';

interface ShareButtonProps {
  dealId: string;
  dealName: string;
}

export default function ShareButton({ dealId, dealName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const shareRecord = createShareRecord(dealId, 'Demo Sharer');
    const shareUrl = getShareUrl(shareRecord.id);

    // 复制到剪贴板
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      title={`Share ${dealName}`}
      aria-label={`Share ${dealName}`}
      className="px-3 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg hover:bg-slate-50 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
    >
      {copied ? '✓ Copied!' : '🔗 Share Deal'}
    </button>
  );
}
