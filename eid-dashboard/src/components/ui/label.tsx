"use client";

import React from 'react';

interface Props {
  name: string;
  color: string; // Color class like 'bg-red-500'
  dotSize?: number | string;
  gap?: number | string;
  className?: string;
}

export default function Label({ name, color, dotSize = 8, gap = 8, className = '' }: Props) {
  const size = typeof dotSize === 'number' ? `${dotSize}px` : dotSize;
  const gapVal = typeof gap === 'number' ? `${gap}px` : gap;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: gapVal }}>
      <span
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'inline-block'
        }}
        className={color}
      />
      {name}
    </div>
  );
}
