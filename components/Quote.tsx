import { ReactNode } from 'react'

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-16 px-12 text-lg leading-relaxed font-medium text-gray-200 italic">
      <span className="absolute -top-3 left-0 font-serif text-4xl text-gray-500 opacity-60 select-none md:-top-5 md:text-6xl">
        &ldquo;
      </span>
      {children}
    </div>
  )
}
