'use client'
import dynamic from 'next/dynamic'

const WaitingScene = dynamic(() => import('./WaitingScene'), { ssr: false })

export default function WaitingSceneWrapper(props: { className?: string }) {
  return <WaitingScene {...props} />
}
