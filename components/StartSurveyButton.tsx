'use client'

import { useRouter } from 'next/navigation'

export default function StartSurveyButton() {
  const router = useRouter()

  const handleStart = () => {
    // Generate a simple random ID
    const randomId =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    router.push(`/survey/2026?id=${randomId}`)
  }

  return (
    <button
      onClick={handleStart}
      className="bg-primary-800 hover:bg-primary-900 focus:ring-primary-600 cursor-pointer rounded-md px-5 py-2.5 text-base font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
    >
      Start Survey
    </button>
  )
}
