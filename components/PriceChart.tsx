'use client';

import React, { useEffect, useRef } from 'react';

interface ChartProps {
  height?: number;
}

export default function PriceChart({ height = 200 }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Simple SVG chart instead of lightweight-charts
    const width = containerRef.current.clientWidth;
    const data = generateMockData();
    
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
        <g key={i}>
          <line x1={x} y1={highY} x2={x} y2={lowY} stroke={color} strokeWidth="1" />
          <rect x={x - 2} y={bodyTop} width="4" height={bodyHeight} fill={color} />
        </g>
      );
    });

    containerRef.current.innerHTML = `
      <svg width="${width}" height="${height}" class="w-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${candlesticks}
        <polyline points="${points}" fill="none" stroke="#3b82f6" strokeWidth="2" />
      </svg>
    `;
  }, [height]);

  return <div ref={containerRef} style={{ height }} className="w-full" />;
}

function generateMockData() {
  const data = [];
  let price = 165;
  for (let i = 90; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 5;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    data.push({ open, high, low, close });
    price = close;
  }
  return data;
}
