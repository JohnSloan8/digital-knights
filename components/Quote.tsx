import { ReactNode } from 'react'

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-8 px-6 text-base leading-relaxed font-medium text-gray-200 italic md:my-16 md:px-12 md:text-lg">
      <span className="absolute -top-2 left-0 font-serif text-3xl text-gray-500 opacity-60 select-none md:-top-3 md:text-4xl lg:text-6xl">
        &ldquo;
      </span>
      {children}
    </div>
  )
}
