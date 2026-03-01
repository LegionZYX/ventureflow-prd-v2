'use client';

import React, { useRef } from 'react';

interface ChartProps {
  height?: number;
}

export default function PriceChart({ height = 200 }: ChartProps) {
  const data = [
    167, 169, 168, 166, 167, 169, 171, 172, 173, 174,
    175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194,
  ];
  
  const minPrice = Math.min(...data);
  const maxPrice = Math.max(...data);
  const priceRange = maxPrice - minPrice;
  const width = 600;
  
  const points = data.map((price, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((price - minPrice) / priceRange) * (height - 40) - 20;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#chartGradient)" />
      <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2" />
      <text x="0" y="15" fontSize="10" fill="#64748b">Reference Price - For Display Only</text>
    </svg>
  );
}
