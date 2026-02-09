'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function MainContentWrapper({ children }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <section
      className={`mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 sm:px-6 xl:px-0 ${
        isHome ? 'xl:max-w-5xl' : 'xl:max-w-4xl'
      }`}
    >
      {children}
    </section>
  )
}
