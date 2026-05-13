'use client'
import dynamic from 'next/dynamic'

const SurveyScene = dynamic(() => import('./SurveyScene'), { ssr: false })

export default function SurveySceneWrapper(props: { className?: string }) {
  return <SurveyScene {...props} />
}
