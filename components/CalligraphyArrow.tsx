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
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      {/* 
        Stylized medieval calligraphy arrow path.
        Wider at base, tapering to a narrow neck before the arrowhead.
      */}
      <path
        d="M 10 0 
           Q 18 40 23 75 
           L 5 80 
           Q 25 120 25 120 
           Q 25 120 45 80 
           L 27 75 
           Q 32 40 40 0 
           Z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}
