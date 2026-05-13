'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default function ThreeSceneWrapper(props: { className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Delay rendering to allow the browser to paint the HTML/CSS first
    const timer = setTimeout(() => setMounted(true), 250)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return <ThreeScene {...props} />
}
