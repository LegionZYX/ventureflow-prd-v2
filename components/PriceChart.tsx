'use client';

import React, { useEffect, useRef } from 'react';

interface ChartProps {
  height?: number;
}

// Static chart data - generated once, reused forever
const STATIC_CHART_DATA = [
  { time: '2025-12-01' as unknown as number, open: 165, high: 168, low: 163, close: 167 },
  { time: '2025-12-02' as unknown as number, open: 167, high: 170, low: 166, close: 169 },
  { time: '2025-12-03' as unknown as number, open: 169, high: 171, low: 167, close: 168 },
  { time: '2025-12-04' as unknown as number, open: 168, high: 169, low: 165, close: 166 },
  { time: '2025-12-05' as unknown as number, open: 166, high: 168, low: 164, close: 167 },
  { time: '2025-12-06' as unknown as number, open: 167, high: 170, low: 166, close: 169 },
  { time: '2025-12-07' as unknown as number, open: 169, high: 172, low: 168, close: 171 },
  { time: '2025-12-08' as unknown as number, open: 171, high: 173, low: 170, close: 172 },
  { time: '2025-12-09' as unknown as number, open: 172, high: 174, low: 171, close: 173 },
  { time: '2025-12-10' as unknown as number, open: 173, high: 175, low: 172, close: 174 },
  { time: '2025-12-11' as unknown as number, open: 174, high: 176, low: 173, close: 175 },
  { time: '2025-12-12' as unknown as number, open: 175, high: 177, low: 174, close: 176 },
  { time: '2025-12-13' as unknown as number, open: 176, high: 178, low: 175, close: 177 },
  { time: '2025-12-14' as unknown as number, open: 177, high: 179, low: 176, close: 178 },
  { time: '2025-12-15' as unknown as number, open: 178, high: 180, low: 177, close: 179 },
  { time: '2025-12-16' as unknown as number, open: 179, high: 181, low: 178, close: 180 },
  { time: '2025-12-17' as unknown as number, open: 180, high: 182, low: 179, close: 181 },
  { time: '2025-12-18' as unknown as number, open: 181, high: 183, low: 180, close: 182 },
  { time: '2025-12-19' as unknown as number, open: 182, high: 184, low: 181, close: 183 },
  { time: '2025-12-20' as unknown as number, open: 183, high: 185, low: 182, close: 184 },
  { time: '2025-12-21' as unknown as number, open: 184, high: 186, low: 183, close: 185 },
  { time: '2025-12-22' as unknown as number, open: 185, high: 187, low: 184, close: 186 },
  { time: '2025-12-23' as unknown as number, open: 186, high: 188, low: 185, close: 187 },
  { time: '2025-12-24' as unknown as number, open: 187, high: 189, low: 186, close: 188 },
  { time: '2025-12-25' as unknown as number, open: 188, high: 190, low: 187, close: 189 },
  { time: '2025-12-26' as unknown as number, open: 189, high: 191, low: 188, close: 190 },
  { time: '2025-12-27' as unknown as number, open: 190, high: 192, low: 189, close: 191 },
  { time: '2025-12-28' as unknown as number, open: 191, high: 193, low: 190, close: 192 },
  { time: '2025-12-29' as unknown as number, open: 192, high: 194, low: 191, close: 193 },
  { time: '2025-12-30' as unknown as number, open: 193, high: 195, low: 192, close: 194 },
];

export default function PriceChart({ height = 200 }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const data = STATIC_CHART_DATA;
    
    const minPrice = Math.min(...data.map(d => d.low));
    const maxPrice = Math.max(...data.map(d => d.high));
    const priceRange = maxPrice - minPrice;
    
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.close - minPrice) / priceRange) * (height - 40) - 20;
      return `${x},${y}`;
    }).join(' ');

    const candlesticks = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const openY = height - ((d.open - minPrice) / priceRange) * (height - 40) - 20;
      const closeY = height - ((d.close - minPrice) / priceRange) * (height - 40) - 20;
      const highY = height - ((d.high - minPrice) / priceRange) * (height - 40) - 20;
      const lowY = height - ((d.low - minPrice) / priceRange) * (height - 40) - 20;
      const isUp = d.close > d.open;
      const color = isUp ? '#22c55e' : '#ef4444';
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(Math.abs(openY - closeY), 1);
      
      return (
        `<g key="${i}">
          <line x1="${x}" y1="${highY}" x2="${x}" y2="${lowY}" stroke="${color}" stroke-width="1" />
          <rect x="${x - 2}" y="${bodyTop}" width="4" height="${bodyHeight}" fill="${color}" />
        </g>`
      );
    }).join('');

    containerRef.current.innerHTML = `
      <svg width="${width}" height="${height}" class="w-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${candlesticks}
        <polyline points="${points}" fill="none" stroke="#3b82f6" stroke-width="2" />
        <text x="10" y="20" font-size="10" fill="#64748b">Reference Price - For Display Only</text>
      </svg>
    `;
  }, [height]);

  return <div ref={containerRef} style={{ height }} className="w-full" />;
}
