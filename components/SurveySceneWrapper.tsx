'use client'
import { useState, useEffect } from 'react'

export default function SurveySceneWrapper(props: { className?: string }) {
  const [SceneComponent, setSceneComponent] = useState<React.ComponentType<{
    className?: string
  }> | null>(null)

  useEffect(() => {
    let isMounted = true
    const timer = setTimeout(() => {
      import('./SurveyScene').then((mod) => {
        if (isMounted) {
          setSceneComponent(() => mod.default)
        }
      })
    }, 250)
    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [])

  if (!SceneComponent)
    return (
      <div className={props.className}>
        <div className="flex h-full w-full items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    )

  return <SceneComponent {...props} />
}
