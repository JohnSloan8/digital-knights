'use client'
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false })

export default function ThreeSceneWrapper(props: { className?: string }) {
  return <ThreeScene {...props} />
}
