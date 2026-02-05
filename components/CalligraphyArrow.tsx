'use client'

import React, { useId } from 'react'

const colorMap: Record<string, string> = {
  'yellow-500': '#eab308',
  'emerald-500': '#10b981',
  'blue-500': '#3b82f6',
  'slate-300': '#cbd5e1',
  'yellow-400': '#facc15',
}

interface CalligraphyArrowProps {
  fromClass: string
  toClass: string
  className?: string
}

export default function CalligraphyArrow({ fromClass, toClass, className }: CalligraphyArrowProps) {
  const fromColorName = fromClass.replace('bg-', '')
  const toColorName = toClass.replace('bg-', '')

  const c1 = colorMap[fromColorName] || '#9ca3af' // default gray-400
  const c2 = colorMap[toColorName] || '#9ca3af'

  // Unique ID for the gradient to avoid conflicts
  const id = useId()

  return (
    <svg
      viewBox="0 0 50 120"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Main Shaft - straight */}
        <path d="M 25 0 L 25 115" strokeWidth="1.5" />

        {/* Arrowhead */}
        <path d="M 16 100 C 16 100, 25 115, 25 115 C 25 115, 34 100, 34 100" strokeWidth="1.5" />

        {/* Decorative flourishes - larger and curlier */}
        <path d="M 25 30 C 0 30, 0 60, 15 55 S 20 40, 18 38" strokeWidth="1" opacity="0.9" />
        <path d="M 25 80 C 50 80, 50 50, 35 55 S 30 70, 32 72" strokeWidth="1" opacity="0.9" />
      </g>
    </svg>
  )
}
