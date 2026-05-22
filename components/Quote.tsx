import { ReactNode } from 'react'

export default function Quote({ children }: { children: ReactNode }) {
  return (
    <div className="relative my-4 rounded-xl border-l-4 border-indigo-500 bg-gray-800/40 px-8 py-6 text-sm leading-relaxed font-medium text-gray-200 italic shadow-sm md:my-12 md:px-12 md:py-8 md:text-base md:text-lg">
      <span className="absolute top-2 left-2 font-serif text-4xl text-indigo-400/30 select-none md:top-3 md:left-4 md:text-5xl">
        &ldquo;
      </span>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
