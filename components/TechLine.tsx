import React from 'react'

interface TechLineProps extends React.SVGProps<SVGSVGElement> {
  side?: 'left' | 'right'
}

export default function TechLine({ side = 'left', className, ...props }: TechLineProps) {
  // Paths derived from ThreeScene.tsx usage
  // Left side of text uses: M0 6 H15 M15 1 V11 M15 6 H60
  // Right side of text uses: M0 6 H45 M45 1 V11 M45 6 H60

  const d = side === 'left' ? 'M0 6 H15 M15 1 V11 M15 6 H60' : 'M0 6 H45 M45 1 V11 M45 6 H60'

  // ThreeScene uses rotate-180 for both.
  const baseClasses = 'rotate-180'
  const defaultColor = 'text-gray-400'

  // Create final className string
  // If className provided includes a text color, it will override defaultColor (due to CSS specificity or order if Tailwind)
  // But safer to conditionally add defaultColor.

  // Note: className prop overrides or appends.
  const classes = [baseClasses, className || defaultColor].join(' ')

  return (
    <svg width="60" height="12" viewBox="0 0 60 12" className={classes} {...props}>
      <path d={d} stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
