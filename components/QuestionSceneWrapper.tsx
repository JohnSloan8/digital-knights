'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const QuestionScene = dynamic(() => import('./QuestionScene'), { ssr: false })

export default function QuestionSceneWrapper(props: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 250)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return <QuestionScene {...props} />
}
