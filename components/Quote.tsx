import { ReactNode } from 'react'

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-8 pr-4 pl-12 leading-relaxed text-gray-300 italic">
      <span className="absolute -top-4 left-0 font-serif text-6xl text-gray-300 opacity-50 select-none md:-top-10 md:text-8xl">
        &ldquo;
      </span>
      {children}
    </div>
  )
}
