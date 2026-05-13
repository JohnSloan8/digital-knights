'use client'
import dynamic from 'next/dynamic'

const QuestionScene = dynamic(() => import('./QuestionScene'), { ssr: false })

export default function QuestionSceneWrapper(props: { className?: string }) {
  return <QuestionScene {...props} />
}
