'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'

type SurveyValue = string | number | boolean | null

type SurveyContextType = {
  saveResponse: (key: string, value: SurveyValue) => void
  surveyData: Record<string, SurveyValue>
}

const SurveyContext = React.createContext<SurveyContextType | null>(null)

const useSurvey = () => {
  const context = React.useContext(SurveyContext)
  if (!context) return { saveResponse: () => {}, surveyData: {} }
  return context
}

const getAlphabetLabel = (index: number) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  let i = index
  let label = ''

  while (i >= 0) {
    label = letters[i % 26] + label
    i = Math.floor(i / 26) - 1
  }

  return label
}

const formatSubQuestion = (text: string, index: number): React.ReactNode => {
  const label = `${getAlphabetLabel(index)})`
  return (
    <>
      <span className="mr-2 font-normal text-gray-400">{label}</span>
      <span>{text}</span>
    </>
  )
}

const triggerRadioInput = (inputId: string) => {
  const input = document.getElementById(inputId) as HTMLInputElement | null
  if (input) {
    input.click()
  }
}

const handleRadioCellKeyDown = (
  event: React.KeyboardEvent<HTMLTableCellElement>,
  inputId: string
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    triggerRadioInput(inputId)
  }
}

interface ProgressBarProps {
  currentStep: number
  setStep: (step: number) => void
}

const ProgressBar = ({ currentStep, setStep }: ProgressBarProps) => {
  const steps = [1, 2, 3, 4, 5]
  return (
    <div className="mb-12 flex justify-center">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Connector Line */}
            {index > 0 && (
              <div
                className={`h-1 w-8 sm:w-16 ${
                  step <= currentStep ? 'bg-primary-500' : 'bg-gray-700'
                }`}
              />
            )}
            {/* Circle */}
            <button
              type="button"
              onClick={() => {
                setStep(step)
              }}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-base font-bold transition-all duration-200 ${
                step === currentStep
                  ? 'bg-primary-500 ring-primary-500/30 text-white ring-4'
                  : step < currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {step}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

interface NavButtonsProps {
  next?: () => void
  prev?: () => void
  nextLabel?: string
  prevLabel?: string
}

const NavButtons = ({
  next,
  prev,
  nextLabel = 'Next Section',
  prevLabel = 'Previous',
}: NavButtonsProps) => (
  <div className="mt-8 flex justify-between pt-4">
    {prev ? (
      <button
        type="button"
        onClick={prev}
        className="group text-primary-500 hover:text-primary-400 flex cursor-pointer items-center text-base font-medium transition-colors duration-200"
      >
        <svg
          className="mr-2 h-5 w-5 transform transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {prevLabel}
      </button>
    ) : (
      <div />
    )}

    {next && (
      <button
        type="button"
        onClick={next}
        className="group text-primary-500 hover:text-primary-400 flex cursor-pointer items-center text-base font-medium transition-colors duration-200"
      >
        {nextLabel}
        <svg
          className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}
  </div>
)

interface MatrixRadioProps {
  questionLabel: string
  questionText: string
  options: string[]
  rows: string[]
  name: string
  error?: boolean
}

const MatrixRadio = ({
  questionLabel,
  questionText,
  options,
  rows,
  name,
  error,
}: MatrixRadioProps) => {
  const { saveResponse, surveyData } = useSurvey()
  const [localState, setLocalState] = useState<Record<string, string>>({})

  // Initialize/Sync local state from surveyData
  useEffect(() => {
    setLocalState((prev) => {
      const next = { ...prev }
      let hasChanges = false
      rows.forEach((_, idx) => {
        const key = `${name}-${idx}`
        const serverValue = surveyData[key]
        // Only update if server value exists and differs from local (or local is missing)
        // We prioritize local state if we just clicked, but initial load needs to populate
        if (serverValue !== undefined && serverValue !== prev[key]) {
          next[key] = serverValue as string
          hasChanges = true
        }
      })
      return hasChanges ? next : prev
    })
  }, [surveyData, name, rows])

  const handleChange = (key: string, value: string) => {
    // 1. Immediate local update (Fast)
    setLocalState((prev) => ({ ...prev, [key]: value }))
    // 2. Defer global update (Slow)
    setTimeout(() => {
      saveResponse(key, value)
    }, 0)
  }

  return (
    <div
      id={name}
      className={`mb-10 border-b pb-6 ${error ? 'rounded-lg border-2 border-red-500 p-4' : 'border-gray-700'}`}
    >
      <h3 className={`mb-2 text-lg font-semibold ${error ? 'text-red-500' : 'text-white'}`}>
        {questionLabel}
      </h3>
      <p className="mb-8 text-base text-gray-400">{questionText}</p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full table-fixed text-left text-base text-gray-400">
          <colgroup>
            <col style={{ width: '50%' }} />
            {options.map((_, idx) => (
              <col key={idx} style={{ width: `${50 / options.length}%` }} />
            ))}
          </colgroup>
          <thead className="bg-gray-700 text-sm text-white uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">
                Statement
              </th>
              {options.map((option, idx) => (
                <th key={idx} scope="col" className="px-1 py-2 text-center font-normal">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const displayRow = formatSubQuestion(row, rowIdx)
              return (
                <tr key={rowIdx} className="border-b border-gray-700 bg-gray-800">
                  <td className="px-6 py-4 text-white">{displayRow}</td>
                  {options.map((option, optIdx) => {
                    const inputId = `${name}-${rowIdx}-${optIdx}`
                    return (
                      <td
                        key={optIdx}
                        className="cursor-pointer px-1 py-4 text-center"
                        onClick={(e) => {
                          if ((e.target as HTMLElement).tagName !== 'INPUT') {
                            triggerRadioInput(inputId)
                          }
                        }}
                        onKeyDown={(event) => handleRadioCellKeyDown(event, inputId)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <input
                            id={inputId}
                            type="radio"
                            name={`${name}-${rowIdx}`}
                            value={option}
                            checked={localState[`${name}-${rowIdx}`] === option}
                            onChange={(e) => {
                              handleChange(`${name}-${rowIdx}`, e.target.value)
                            }}
                            className="focus:ring-primary-600 text-primary-600 h-4 w-4 cursor-pointer border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-2"
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked layout */}
      <div className="space-y-4 md:hidden">
        {rows.map((row, rowIdx) => {
          const displayRow = formatSubQuestion(row, rowIdx)
          return (
            <div key={rowIdx} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <p className="mb-3 text-base text-white">{displayRow}</p>
              <div className="grid grid-cols-5 gap-2">
                {options.map((option, optIdx) => (
                  <label
                    key={optIdx}
                    className="flex w-full flex-col items-center justify-end text-center text-xs text-white"
                  >
                    <span className="mb-2 flex min-h-[36px] items-end justify-center px-1 text-white uppercase">
                      {option}
                    </span>
                    <input
                      type="radio"
                      name={`${name}-${rowIdx}-mobile`}
                      value={option}
                      checked={localState[`${name}-${rowIdx}`] === option}
                      onChange={(e) => handleChange(`${name}-${rowIdx}`, e.target.value)}
                      className="focus:ring-primary-600 text-primary-600 h-4 w-4 cursor-pointer border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-2"
                    />
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface MatrixSliderProps {
  questionLabel: string
  questionText: string
  rows: string[]
  name: string
  suffix?: string
  actualValues?: number[]
  note?: string
  error?: boolean
}

const MatrixSlider = ({
  questionLabel,
  questionText,
  rows,
  name,
  suffix = '%',
  actualValues,
  note,
  error,
}: MatrixSliderProps) => {
  const { saveResponse, surveyData } = useSurvey()
  const [values, setValues] = useState<Record<number, number>>(() =>
    rows.reduce((acc, _, idx) => {
      const saved = surveyData[`${name}-${idx}`]
      return { ...acc, [idx]: saved !== undefined ? Number(saved) : 0 }
    }, {})
  )
  const [touched, setTouched] = useState<Record<number, boolean>>(() =>
    rows.reduce((acc, _, idx) => {
      return { ...acc, [idx]: surveyData[`${name}-${idx}`] !== undefined }
    }, {})
  )
  const [showActuals, setShowActuals] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleInteraction = (index: number) => {
    if (!touched[index]) {
      setTouched((prev) => ({ ...prev, [index]: true }))
    }
    if (showError) setShowError(false)
  }

  const handleChange = (index: number, newValue: string) => {
    handleInteraction(index)
    setValues((prev) => ({
      ...prev,
      [index]: parseInt(newValue, 10),
    }))
  }

  const handleShowActuals = () => {
    const allTouched = rows.every((_, idx) => touched[idx])
    if (!allTouched) {
      setShowError(true)
      return
    }
    setShowActuals(true)
  }

  const allTouched = rows.every((_, idx) => touched[idx])

  return (
    <div
      id={name}
      className={`mb-10 border-b pb-6 ${error ? 'rounded-lg border-2 border-red-500 p-4' : 'border-gray-700'}`}
    >
      <h3 className={`mb-2 text-lg font-semibold ${error ? 'text-red-500' : 'text-white'}`}>
        {questionLabel}
      </h3>
      <p className="mb-8 text-base text-gray-400">{questionText}</p>
      <div className="space-y-6">
        {rows.map((row, idx) => {
          const displayRow = formatSubQuestion(row, idx)
          const val = values[idx] ?? 0
          const isTouched = touched[idx]
          const thumbClasses = isTouched
            ? '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-white'
            : '[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:bg-gray-400 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:bg-gray-400'

          const actualVal = actualValues?.[idx]

          return (
            <div
              key={idx}
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 md:border-0 md:bg-transparent md:p-0"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-base text-white">{displayRow}</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onMouseDown={() => handleInteraction(idx)}
                    onMouseUp={(e) =>
                      saveResponse(`${name}-${idx}`, (e.target as HTMLInputElement).value)
                    }
                    onTouchStart={() => handleInteraction(idx)}
                    onTouchEnd={(e) =>
                      saveResponse(`${name}-${idx}`, (e.target as HTMLInputElement).value)
                    }
                    disabled={showActuals}
                    name={`${name}-${idx}`}
                    style={{
                      background: `linear-gradient(to right, white ${val}%, #374151 ${val}%)`,
                    }}
                    className={`h-2 w-full cursor-pointer appearance-none rounded-lg [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full ${thumbClasses} ${showActuals ? 'cursor-not-allowed opacity-60' : ''}`}
                  />
                  <span className="w-12 text-base text-white">
                    {val}
                    {suffix}
                  </span>
                </div>
              </div>

              {/* Drawer for Actual Value */}
              {actualValues && actualVal !== undefined && (
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    showActuals && isTouched
                      ? 'mt-1 max-h-24 opacity-100'
                      : 'mt-0 max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={actualVal}
                      disabled
                      style={{
                        background: `linear-gradient(to right, #4ade80 ${actualVal}%, #374151 ${actualVal}%)`,
                      }}
                      className="h-2 w-full appearance-none rounded-lg [&::-moz-range-thumb]:hidden [&::-webkit-slider-thumb]:hidden"
                    />
                    <span className="w-12 text-base font-bold text-green-400">
                      {actualVal}
                      {suffix}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {actualValues && !showActuals && (
        <div className="mt-8 flex flex-col items-center justify-center space-y-3">
          {showError && (
            <p className="text-sm text-red-400">
              Please make a guess for each question before revealing actual figures
            </p>
          )}
          <button
            type="button"
            onClick={handleShowActuals}
            className={`cursor-pointer rounded-lg border border-green-600 bg-green-900/30 px-6 py-2.5 text-sm font-semibold text-green-400 transition-colors hover:bg-green-900/50 focus:ring-4 focus:ring-green-900/50 focus:outline-none ${!allTouched ? 'opacity-50' : ''}`}
          >
            Show Actual Figures*
          </button>

          {note && <p className="mt-4 max-w-3xl text-center text-sm text-green-400">{note}</p>}
        </div>
      )}
    </div>
  )
}

interface CheckboxOption {
  label: string
  description?: string
  links?: { url: string; label?: string }[]
}

interface CheckboxesProps {
  questionLabel: string
  questionText: string
  options: CheckboxOption[]
  name: string
  error?: boolean
}

const Checkboxes = ({ questionLabel, questionText, options, name, error }: CheckboxesProps) => {
  const { saveResponse, surveyData } = useSurvey()
  const [activeDescription, setActiveDescription] = useState<string | null>(null)

  const toggleDescription = (label: string) => {
    setActiveDescription((prev) => (prev === label ? null : label))
  }

  return (
    <div
      id={name}
      className={`mb-10 border-b pb-6 ${error ? 'rounded-lg border-2 border-red-500 p-4' : 'border-gray-700'}`}
    >
      <h3 className={`mb-2 text-lg font-semibold ${error ? 'text-red-500' : 'text-white'}`}>
        {questionLabel}
      </h3>
      <p className="mb-8 text-base text-gray-400">{questionText}</p>
      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center">
              <input
                id={`${name}-${idx}`}
                type="checkbox"
                value={option.label}
                name={name}
                checked={surveyData[`${name}-${idx}`] === true}
                onChange={(e) => saveResponse(`${name}-${idx}`, e.target.checked)}
                className="focus:ring-primary-600 text-primary-600 mx-4 h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-700 px-2 py-2 ring-offset-gray-800 focus:ring-2"
              />
              <label
                htmlFor={`${name}-${idx}`}
                className="ml-2 cursor-pointer text-base text-white"
              >
                {option.label}
              </label>
              {option.description && (
                <button
                  type="button"
                  onClick={() => toggleDescription(option.label)}
                  className="focus:ring-primary-600 ml-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-600 text-sm text-white hover:bg-gray-700 focus:ring-2 focus:outline-none"
                  aria-label={`Learn more about ${option.label}`}
                >
                  ?
                </button>
              )}
            </div>
            {option.description && activeDescription === option.label && (
              <div className="ml-10 rounded-lg border border-gray-700 bg-gray-900/70 p-3 text-sm text-gray-300">
                <p>{option.description}</p>
                {option.links &&
                  option.links.map((linkItem, linkIdx) => (
                    <a
                      key={linkIdx}
                      href={linkItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-400 mt-2 block break-all hover:underline"
                    >
                      {(linkItem.label || linkItem.url).replace(/https?:\/\//g, '')}
                    </a>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface MatrixRatingProps {
  questionLabel: string
  questionText: string
  rows: string[]
  name: string
  scale?: number
  error?: boolean
}

const MatrixRating = ({
  questionLabel,
  questionText,
  rows,
  name,
  scale = 10,
  error,
}: MatrixRatingProps) => {
  const { saveResponse, surveyData } = useSurvey()
  const [localState, setLocalState] = useState<Record<string, string>>({})
  const scaleArr = Array.from({ length: scale }, (_, i) => i + 1)

  // Initialize/Sync local state from surveyData
  useEffect(() => {
    setLocalState((prev) => {
      const next = { ...prev }
      let hasChanges = false
      rows.forEach((_, idx) => {
        const key = `${name}-${idx}`
        const serverValue = surveyData[key]
        if (serverValue !== undefined && serverValue !== prev[key]) {
          next[key] = serverValue as string
          hasChanges = true
        }
      })
      return hasChanges ? next : prev
    })
  }, [surveyData, name, rows])

  const handleChange = (key: string, value: string) => {
    setLocalState((prev) => ({ ...prev, [key]: value }))
    // Defer global update
    setTimeout(() => {
      saveResponse(key, value)
    }, 0)
  }

  // Calculate distinct color for each step in the gradient (Red for concerns)
  const getStepColor = (step: number) => {
    // Gradient from light red to dark red
    // Hue 0 (Red), Saturation 85%
    // Lightness drops from 75% (at 1) to 35% (at 10)
    const lightness = 75 - ((step - 1) / (scale - 1)) * 40
    return `hsl(0, 85%, ${lightness}%)`
  }

  return (
    <div
      id={name}
      className={`mb-10 border-b pb-6 ${error ? 'rounded-lg border-2 border-red-500 p-4' : 'border-gray-700'}`}
    >
      <h3 className={`mb-2 text-lg font-semibold ${error ? 'text-red-500' : 'text-white'}`}>
        {questionLabel}
      </h3>
      <p className="mb-8 text-base text-gray-400">{questionText}</p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-separate border-spacing-y-2 text-left text-base text-gray-400">
          <colgroup>
            <col style={{ width: '30%' }} />
            {scaleArr.map((_, idx) => (
              <col key={idx} style={{ width: `${70 / scaleArr.length}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 font-normal">
                {/* Empty header for question column */}
              </th>
              {scaleArr.map((s) => (
                <th
                  key={s}
                  scope="col"
                  className="px-0 py-3 text-center text-sm font-medium text-gray-500"
                >
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const displayRow = formatSubQuestion(row, rowIdx)
              const currentVal = parseInt(localState[`${name}-${rowIdx}`] || '0', 10)

              return (
                <tr key={rowIdx} className="group">
                  <td className="px-6 py-4 align-middle text-white">{displayRow}</td>
                  {scaleArr.map((s) => {
                    const inputId = `${name}-${rowIdx}-${s - 1}`
                    const isActive = s <= currentVal

                    return (
                      <td
                        key={s}
                        className="p-0 align-middle"
                        onClick={(e) => {
                          handleChange(`${name}-${rowIdx}`, s.toString())
                        }}
                      >
                        <div
                          className={`relative flex h-12 w-full cursor-pointer items-center justify-center transition-all duration-200 ease-out ${isActive ? '' : 'bg-gray-800 hover:bg-gray-700'} `}
                          style={{
                            backgroundColor: isActive ? getStepColor(s) : undefined,
                          }}
                        >
                          <input
                            id={inputId}
                            type="radio"
                            name={`${name}-${rowIdx}`}
                            value={s}
                            checked={localState[`${name}-${rowIdx}`] === s.toString()}
                            onChange={() => {}}
                            className="sr-only"
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked layout */}
      <div className="space-y-6 md:hidden">
        {rows.map((row, rowIdx) => {
          const displayRow = formatSubQuestion(row, rowIdx)
          const currentVal = parseInt(localState[`${name}-${rowIdx}`] || '0', 10)

          return (
            <div key={rowIdx} className="rounded-lg border border-gray-700 bg-gray-800 p-4">
              <p className="mb-4 text-base font-medium text-white">{displayRow}</p>

              <div className="flex w-full">
                {scaleArr.map((s) => {
                  const isActive = s <= currentVal
                  return (
                    <label
                      key={s}
                      className={`flex h-10 flex-1 cursor-pointer flex-col items-center justify-center text-xs font-bold transition-colors ${isActive ? 'text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'} `}
                      style={{
                        backgroundColor: isActive ? getStepColor(s) : undefined,
                      }}
                    >
                      <span>{s}</span>
                      <input
                        type="radio"
                        name={`${name}-${rowIdx}-mobile`}
                        value={s}
                        checked={localState[`${name}-${rowIdx}`] === s.toString()}
                        onChange={(e) => handleChange(`${name}-${rowIdx}`, e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  )
                })}
              </div>
              <div className="mt-2 flex justify-between px-1 text-xs text-gray-500">
                <span>Not concerned</span>
                <span>Extremely concerned</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChildrenTable = ({ validationErrors }: { validationErrors: Set<string> }) => {
  const { saveResponse, surveyData } = useSurvey()
  const [rows, setRows] = useState<number[]>([1])

  // Sync rows with children-count from surveyData
  useEffect(() => {
    const rawVal = surveyData['children-count'] as string
    const count = rawVal ? parseInt(rawVal, 10) : 0

    setRows((prev) => {
      // If no valid count is selected, default to 1 row
      if (!count || isNaN(count)) {
        return prev.length === 1 ? prev : [1]
      }
      if (prev.length === count) return prev
      return Array.from({ length: count }, (_, i) => i + 1)
    })
  }, [surveyData['children-count']])

  return (
    <div className="mb-8 overflow-hidden">
      <h3 className="mb-2 text-lg font-semibold text-white">
        Q.16 For each of your child, gender, and whether they currently possess their own
        smartphone.
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-base text-gray-400">
          <thead className="bg-gray-700 text-sm text-gray-400 uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Gender</th>
              <th className="px-6 py-3">Has Own Smartphone?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r}
                className="animate-in fade-in slide-in-from-top-4 border-b border-gray-700 bg-gray-800 duration-500 ease-out"
              >
                <td className="px-6 py-4">{r}</td>
                <td className="px-6 py-4">
                  <select
                    id={`child-${r}-age`}
                    name={`child-${r}-age`}
                    defaultValue={(surveyData[`child-${r}-age`] as string) || ''}
                    onChange={(e) => saveResponse(`child-${r}-age`, e.target.value)}
                    className={`focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border bg-gray-700 p-2.5 text-base text-white placeholder-gray-400 ${validationErrors.has(`child-${r}-age`) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                  >
                    <option value="">Select...</option>
                    {Array.from({ length: 19 }, (_, i) => i).map((age) => (
                      <option key={age} value={age === 18 ? '18+' : age.toString()}>
                        {age === 18 ? '18+' : age}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <select
                    id={`child-${r}-gender`}
                    name={`child-${r}-gender`}
                    defaultValue={(surveyData[`child-${r}-gender`] as string) || ''}
                    onChange={(e) => saveResponse(`child-${r}-gender`, e.target.value)}
                    className={`focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border bg-gray-700 p-2.5 text-base text-white placeholder-gray-400 ${validationErrors.has(`child-${r}-gender`) ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    id={`child-${r}-smartphone`}
                    name={`child-${r}-smartphone`}
                    checked={surveyData[`child-${r}-smartphone`] === true}
                    onChange={(e) => saveResponse(`child-${r}-smartphone`, e.target.checked)}
                    className="focus:ring-primary-600 text-primary-600 h-4 w-4 rounded border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function SurveyForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const [surveyData, setSurveyData] = useState<Record<string, SurveyValue>>({})
  const surveyDataRef = React.useRef<Record<string, SurveyValue>>({})
  const [isLoading, setIsLoading] = useState(!!userId)
  const [validationErrors, setValidationErrors] = useState<Set<string>>(new Set())
  const [showErrorSummary, setShowErrorSummary] = useState(false)

  const getValidationErrors = (step: number, data: Record<string, SurveyValue>) => {
    const errors = new Set<string>()

    if (step === 1) {
      for (let i = 0; i < 5; i++)
        if (data[`tech_knowledge-${i}`] === undefined) errors.add('tech_knowledge')
      for (let i = 0; i < 7; i++)
        if (data[`privacy_attitude-${i}`] === undefined) errors.add('privacy_attitude')

      let hasChecked = false
      for (let i = 0; i < 10; i++) if (data[`tools_usage-${i}`] === true) hasChecked = true
      if (!hasChecked) errors.add('tools_usage')
    }

    if (step === 2) {
      for (let i = 0; i < 7; i++)
        if (data[`trends_8_12-${i}`] === undefined) errors.add('trends_8_12')
      for (let i = 0; i < 7; i++)
        if (data[`trends_12_15-${i}`] === undefined) errors.add('trends_12_15')

      let hasPv = false
      for (let i = 0; i < 7; i++) if (data[`privacy_violations-${i}`] === true) hasPv = true
      if (!hasPv) errors.add('privacy_violations')

      let hasEr = false
      for (let i = 0; i < 7; i++) if (data[`edu_resources-${i}`] === true) hasEr = true
      if (!hasEr) errors.add('edu_resources')
    }

    if (step === 3) {
      for (let i = 0; i < 11; i++)
        if (data[`safety_concerns-${i}`] === undefined) errors.add('safety_concerns')
      for (let i = 0; i < 7; i++)
        if (data[`tech_attitude-${i}`] === undefined) errors.add('tech_attitude')
      for (let i = 0; i < 5; i++) if (data[`controls-${i}`] === undefined) errors.add('controls')
    }

    if (step === 4) {
      for (let i = 0; i < 5; i++)
        if (data[`expert_opinions-${i}`] === undefined) errors.add('expert_opinions')
      for (let i = 0; i < 6; i++)
        if (data[`skills_importance-${i}`] === undefined) errors.add('skills_importance')
      for (let i = 0; i < 3; i++)
        if (data[`edu_opinion-${i}`] === undefined) errors.add('edu_opinion')
    }

    if (step === 5) {
      if (!data['role']) errors.add('role')
      if (!data['children-count']) errors.add('children-count')

      const count = parseInt((data['children-count'] as string) || '0', 10)
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          if (!data[`child-${i}-age`]) errors.add(`child-${i}-age`)
          if (!data[`child-${i}-gender`]) errors.add(`child-${i}-gender`)
        }
      }
    }
    return errors
  }

  const validateStep = (step: number) => {
    const errors = getValidationErrors(step, surveyData)
    setValidationErrors(errors)
    setShowErrorSummary(errors.size > 0)
    return errors.size === 0
  }

  const getFieldOrder = (step: number) => {
    let fieldOrder: string[] = []

    if (step === 1) fieldOrder = ['tech_knowledge', 'privacy_attitude', 'tools_usage']
    if (step === 2)
      fieldOrder = ['trends_8_12', 'trends_12_15', 'privacy_violations', 'edu_resources']
    if (step === 3) fieldOrder = ['safety_concerns', 'tech_attitude', 'controls']
    if (step === 4) fieldOrder = ['expert_opinions', 'skills_importance', 'edu_opinion']
    if (step === 5) {
      fieldOrder = ['role', 'children-count']
      // We check up to 5 children as that's the max rows in ChildrenTable
      for (let i = 1; i <= 5; i++) {
        fieldOrder.push(`child-${i}-age`)
        fieldOrder.push(`child-${i}-gender`)
      }
    }
    return fieldOrder
  }

  const validatedFieldOrder = React.useMemo(() => getFieldOrder(currentStep), [currentStep])

  const firstError = React.useMemo(() => {
    if (!showErrorSummary) return null
    return validatedFieldOrder.find((field) => validationErrors.has(field))
  }, [showErrorSummary, validationErrors, validatedFieldOrder])

  const scrollToFirstError = (step: number, errors: Set<string>) => {
    const order = getFieldOrder(step)
    const first = order.find((field) => errors.has(field))
    if (first) {
      const element = document.getElementById(first)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const ErrorBanner = () => (
    <div className="mb-6 rounded-lg border border-red-500 bg-red-900/20 p-4 text-center text-red-400">
      Please complete all questions in this section before proceeding.
    </div>
  )

  const handleNextStep = () => {
    const errors = getValidationErrors(currentStep, surveyData)
    setValidationErrors(errors)
    setShowErrorSummary(errors.size > 0)

    if (errors.size === 0) {
      nextStep()
    } else {
      scrollToFirstError(currentStep, errors)
    }
  }

  const handleSetStep = (step: number) => {
    if (step > currentStep) {
      const errors = getValidationErrors(currentStep, surveyData)
      setValidationErrors(errors)
      setShowErrorSummary(errors.size > 0)
      if (errors.size > 0) {
        scrollToFirstError(currentStep, errors)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCurrentStep(step)
  }

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const { data } = await supabase
            .from('survey_responses')
            .select('responses')
            .eq('user_id', userId)
            .maybeSingle()

          if (data?.responses) {
            setSurveyData(data.responses)
            surveyDataRef.current = data.responses

            // Determine the last completed step to resume progress
            let resumeStep = 1
            for (let i = 1; i <= 4; i++) {
              // Check if step 'i' is complete
              const errors = getValidationErrors(i, data.responses)
              if (errors.size === 0) {
                // If step is complete, we can at least be on the next step
                resumeStep = i + 1
              } else {
                // If step is incomplete, we must stop here
                resumeStep = i
                break
              }
            }
            setCurrentStep(Math.min(resumeStep, 5))
          }
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [userId])

  // Debugging logs
  useEffect(() => {
    console.log('Survey Data:', surveyData)
  }, [surveyData])

  const saveResponse = async (key: string, value: SurveyValue) => {
    // 1. Calculate new state immediately using the Ref (source of truth for latest edits)
    const newResponses = { ...surveyDataRef.current, [key]: value }

    // 2. Synchronously update Ref and State to reflect changes in UI instantly
    surveyDataRef.current = newResponses
    setSurveyData(newResponses)

    if (validationErrors.size > 0) {
      const currentErrors = getValidationErrors(currentStep, newResponses)
      setValidationErrors(currentErrors)
    }

    if (showErrorSummary) setShowErrorSummary(false)

    if (!userId) return

    // 3. Update Database in background (Fire and forget, or log error)
    // We use the computed 'newResponses' so we don't need to fetch from DB first.
    try {
      await supabase.from('survey_responses').upsert(
        {
          user_id: userId,
          responses: newResponses,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
    } catch (err) {
      console.error('Error saving response:', err)
      // Optional: Revert state if DB write fails?
      // For now, keeping it simple as per request for speed.
    }
  }

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-xl text-white">Loading your survey...</div>
      </div>
    )
  }

  return (
    <SurveyContext.Provider value={{ saveResponse, surveyData }}>
      <div className="space-y-8">
        <ProgressBar currentStep={currentStep} setStep={handleSetStep} />

        <form
          className="space-y-12"
          onSubmit={async (e) => {
            e.preventDefault()
            const errors = getValidationErrors(5, surveyData)
            setValidationErrors(errors)
            setShowErrorSummary(errors.size > 0)

            if (errors.size > 0) {
              scrollToFirstError(5, errors)
            } else {
              // Mark as complete in DB
              if (userId) {
                await supabase
                  .from('survey_responses')
                  .update({
                    survey_complete: true,
                    updated_at: new Date().toISOString(),
                  })
                  .eq('user_id', userId)
              }
              // Proceed with submission
              router.push('/survey/complete')
            }
          }}
        >
          {/* SECTION 1 */}
          <div className={currentStep === 1 ? 'block' : 'hidden'}>
            <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
              Section 1: Competency
            </h2>
            <p className="mb-4 text-gray-400">
              Questions relating to your technical ability, attitude to cybersecurity, and
              cybersecurity practices.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Why are these questions being asked?
            </h3>
            <p className="mb-6 text-gray-400">
              A parent's competency in technology and cybersecurity may exert a strong influence on
              how their children interact online.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              How many questions in this section?
            </h3>
            <p className="mb-6 text-gray-400">3</p>
            <div className="border-t border-gray-700 pt-8">
              {firstError === 'tech_knowledge' && <ErrorBanner />}
              <MatrixRadio
                name="tech_knowledge"
                error={validationErrors.has('tech_knowledge')}
                questionLabel="Q.1 Your own technical knowledge"
                questionText="Select how strongly you agree or disagree with the following statements about your technical knowledge."
                options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
                rows={[
                  'I am confident when using a computer.',
                  'I am confident that I can manage settings and permissions for apps on my smartphone.',
                  "I can usually fix technical issues by myself, e.g. wifi stops working, headphones won't connect etc.",
                  'I enjoy troubleshooting technical problems.',
                  'I can easily manage settings on my home router, e.g. log in to the admin panel, change the wifi password, set up a guest network etc.',
                ]}
              />
            </div>

            {firstError === 'privacy_attitude' && <ErrorBanner />}
            <MatrixRadio
              name="privacy_attitude"
              error={validationErrors.has('privacy_attitude')}
              questionLabel="Q.2 Attitude to cybersecurity"
              questionText="Select how strongly you agree or disagree with the following statements on privacy and cybersecurity."
              options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              rows={[
                'I feel confident in my ability to identify and avoid common cybersecurity threats, such as phishing emails or malicious websites',
                'I make a conscious effort to protect my privacy online.',
                'I share photos/videos of myself online',
                'I actively change the default privacy settings on my devices and social media accounts to limit what information is shared.',
                'I believe the convenience of personalized features (like location tracking or tailored recommendations) is worth the loss of some personal privacy.',
                'I trust that tech companies are genuine in their efforts to protect my personal data.',
                'I trust that current laws and government regulations are sufficient to protect my personal data from being misused by companies.',
              ]}
            />

            {firstError === 'tools_usage' && <ErrorBanner />}
            <Checkboxes
              name="tools_usage"
              error={validationErrors.has('tools_usage')}
              questionLabel="Q.3 Cybersecurity practices"
              questionText="Select all of the following privacy and cybersecurity tools that you currently use."
              options={[
                {
                  label: 'VPN',
                  description:
                    'A virtual private network encrypts your internet traffic and routes it through a remote server so your ISP or a public Wi-Fi operator cannot see which sites you visit. It also masks your IP address to make tracking more difficult. Examples: (NordVPN, Mullvad).',
                },
                {
                  label: 'Private Email',
                  description:
                    'Private email providers focus on end-to-end encryption, minimal data retention, and strong spam protections instead of advertising. They help keep subject lines, contacts, and attachments away from large ad networks. Examples: (Proton Mail, Tutanota).',
                },
                {
                  label: 'Ad and Tracker Blocker',
                  description:
                    'Ad and tracker blockers are browser tools that strip out advertising scripts, pop-ups, and invisible tracking pixels before pages load. They reduce bandwidth usage and make cross-site profiling harder. Examples: (uBlock Origin, Ghostery).',
                },
                {
                  label: 'Password Manager',
                  description:
                    'Password managers store long, unique passwords in an encrypted vault and autofill them only on the correct site. Many also scan for breached credentials and support secure note storage. Examples: (1Password, Bitwarden).',
                },
                {
                  label: 'Email Aliases',
                  description:
                    'Alias services let you create throwaway addresses that forward to your main inbox, so you can disable them if spam starts. They help compartmentalize logins without revealing your real email. Examples: (SimpleLogin, Firefox Relay).',
                },
                {
                  label: 'Private DNS',
                  description:
                    'A privacy-focused DNS resolver hides your website lookups from your ISP and can filter trackers or malware domains. Many offer encrypted DNS-over-HTTPS connections and custom blocklists. Examples: (NextDNS, Control D).',
                },
                {
                  label: 'Encrypted Messaging',
                  description:
                    'Encrypted messaging apps apply end-to-end encryption so only you and the recipient can read the conversation. They often include disappearing messages and safety numbers to verify contacts. Examples: (Signal, Threema).',
                },
                {
                  label: 'Private Search Engine',
                  description:
                    'Private search engines avoid storing your queries or linking them to advertising profiles, and they strip out many trackers from search results. Some proxy image or map requests through their own servers. Examples: (DuckDuckGo, Startpage).',
                },
                {
                  label: 'Privacy Enhanced Browser',
                  description:
                    'Privacy browsers block third-party cookies, fingerprinting scripts, and autoplay media by default, while routing lookups through privacy-friendly services. Many ship with built-in Tor or VPN-style relays. Examples: (Brave, Mullvad Browser).',
                },
                {
                  label: 'None of the Above',
                },
              ]}
            />
            <NavButtons next={handleNextStep} nextLabel="Go to Section 2" />
          </div>

          {/* SECTION 2 */}
          <div className={currentStep === 2 ? 'block' : 'hidden'}>
            <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
              Section 2: Awareness
            </h2>
            {/* Same content ... */}
            <p className="mb-4 text-gray-400">
              Questions on your awareness of trends in children's use of technology, risks with
              using currently popular devices/websites/apps, and currently available educational
              resources.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Why are these questions being asked?
            </h3>
            <p className="mb-6 text-gray-400">
              Awareness of current trends of technology use, the risks involved, and the tools
              available to combat these risks, are important factors in a parent's approach to their
              child/children's online safety.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              How many questions in this section?
            </h3>
            <p className="mb-6 text-gray-400">4</p>

            <div className="border-t border-gray-700 pt-8">
              {firstError === 'trends_8_12' && <ErrorBanner />}
              <MatrixSlider
                name="trends_8_12"
                error={validationErrors.has('trends_8_12')}
                questionLabel="Q.4 Current tech trends for 8-12 year olds"
                questionText="Estimate the percentage of 8-12 year olds in Ireland who..."
                rows={[
                  'have their own smart device',
                  'have accounts on 13+ social media/messaging apps',
                  'have experienced cyberbullying',
                  'have talked to a parent about online safety in the past year',
                  'have engaged with people they have never met on apps/games',
                  'have used AI chatbots',
                  'have shared images or videos of themselves online',
                ]}
                actualValues={[93, 71, 22, 66, 41, 26, 16]}
                note="*Figures based on data from the 'Cybersafekids Trends and Usage Report Academic Year 2024-2025'."
              />
            </div>

            {firstError === 'trends_12_15' && <ErrorBanner />}
            <MatrixSlider
              name="trends_12_15"
              error={validationErrors.has('trends_12_15')}
              questionLabel="Q.5 Current tech trends for 12-15 year olds"
              questionText="Estimate the percentage of 12-15 year olds in Ireland who..."
              rows={[
                'have their own smart device',
                'have accounts on 13+ social media/messaging apps',
                'have experienced cyberbullying',
                'have talked to a parent about online safety in the past year',
                'have engaged with people they have never met on apps/games',
                'have used AI chatbots',
                'have shared images or videos of themselves online',
              ]}
              actualValues={[99, 99, 34, 52, 41, 36, 34]}
            />

            {firstError === 'privacy_violations' && <ErrorBanner />}
            <Checkboxes
              name="privacy_violations"
              error={validationErrors.has('privacy_violations')}
              questionLabel="Q.6 Privacy violations relating to children"
              questionText="Below is a list of fines imposed on tech firms for privacy violations specifically relating to children. Please check those that you are aware of."
              options={[
                {
                  label:
                    "Epic Games/Fortnite (2022): Unauthorised collection of children's data - 20 million",
                  description:
                    'The US Federal Trade Commission fined Epic for collecting personal data from children under 13 without parental consent and for using dark patterns that tricked players into paying. Epic also enabled live voice and text chat by default, exposing kids to adult strangers. The settlement forced Epic to adopt new privacy defaults.',
                  links: [
                    {
                      url: 'https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations',
                    },
                  ],
                },
                {
                  label:
                    "Meta/Instagram (2022): Children's accounts default to public - €405 million",
                  description:
                    'Ireland’s Data Protection Commission ruled that Instagram exposed minors’ email addresses and phone numbers by defaulting accounts to public business profiles. Investigators also found under-18 analytics dashboards showing follower data. Meta was ordered to rework teen privacy settings and pay €405m.',
                  links: [
                    {
                      url: 'https://www.dataprotection.ie/en/news-media/press-releases/data-protection-commission-announces-decision-instagram-inquiry',
                    },
                  ],
                },
                {
                  label: "TikTok (2023): Unauthorised access to children's accounts - €345 million",
                  description:
                    'TikTok was fined after regulators discovered default public profiles for teens, weak age verification, and a “Family Pairing” feature that allowed adults to read private messages without proof of guardianship. The ruling emphasized TikTok’s failure to explain privacy risks to young users.',
                  links: [
                    {
                      url: 'https://www.dataprotection.ie/en/news-media/press-releases/DPC-announces-345-million-euro-fine-of-TikTok',
                    },
                  ],
                },
                {
                  label:
                    "Google/YouTube (2019 & 2025): Repeated, unauthorised collection of children's data for targetted ads - 70 Million & 0 million",
                  description:
                    'US regulators said YouTube knowingly tracked viewing habits on kid-focused channels to sell ads, violating COPPA. Google promised to treat all kid content as child-directed and limit personalization, yet faced another 0m penalty in 2025 for allowing similar tracking on the YouTube Kids app.',
                  links: [
                    {
                      url: 'https://www.bbc.com/news/technology-49578971',
                      label: '2019: https://www.bbc.com/news/technology-49578971',
                    },
                    {
                      url: 'https://cybernews.com/privacy/google-settles-youtube-childrens-privacy-lawsuit-30m/',
                      label:
                        '2025: https://cybernews.com/privacy/google-settles-youtube-childrens-privacy-lawsuit-30m/',
                    },
                  ],
                },
                {
                  label:
                    "Amazon/Alexa (2023): - Recording and not deleting children's voices - 5 Million",
                  description:
                    'Amazon retained voice recordings and location data from Alexa devices used by children even after parents tried to delete them. Regulators argued the company kept the data to refine its voice model, contradicting privacy promises. Amazon must now purge inactive child profiles.',
                  links: [
                    {
                      url: 'https://www.justice.gov/archives/opa/pr/amazon-agrees-injunctive-relief-and-25-million-civil-penalty-alleged-violations-childrens',
                    },
                  ],
                },
                {
                  label:
                    "Microsoft/Xbox (2023): - Unauthorised collection and retention of children's data - 0 Million",
                  description:
                    'Microsoft collected children’s names, emails, and phone numbers during Xbox sign-up without timely parental consent and stored the data even when families abandoned the process. The FTC said this violated COPPA’s data minimization rules, resulting in a 0m fine.',
                  links: [
                    {
                      url: 'https://www.ftc.gov/news-events/news/press-releases/2023/06/ftc-will-require-microsoft-pay-20-million-over-charges-it-illegally-collected-personal-information',
                    },
                  ],
                },
                {
                  label: 'None of the above',
                },
              ]}
            />

            {firstError === 'edu_resources' && <ErrorBanner />}
            <Checkboxes
              name="edu_resources"
              error={validationErrors.has('edu_resources')}
              questionLabel="Q.7 Available educational resources"
              questionText="Below is a list of resources for educating children in Ireland on online safety and cybersecurity. Please check those that you are familiar with."
              options={[
                {
                  label: 'CyberSafeKids',
                  description:
                    'CyberSafeKids is an Irish non-profit that delivers classroom workshops, parent nights, and research on young peoples’ digital habits. Their guides cover cyberbullying, gaming, privacy settings, and include downloadable lesson plans. Examples: (Primary school workshops, Annual Trends & Usage Report).',
                  links: [{ url: 'https://www.cybersafekids.ie' }],
                },
                {
                  label: 'TUSLA - Online Safety',
                  description:
                    'TUSLA—the Child and Family Agency—publishes safeguarding guidance for carers, foster parents, and social workers on topics like inappropriate contact, grooming, and image-based abuse. Their online safety hub links to reporting pathways and age-appropriate conversation starters.',
                  links: [{ url: 'https://www.tusla.ie/children-first/online-safety/' }],
                },
                {
                  label: 'Webwise',
                  description:
                    "Webwise is Ireland's Safer Internet Centre for schools, offering SPHE-aligned lesson packs, teenager peer-leader programs, and parent advice helplines. Their 'Connected' and 'MySelfie' resources combine videos with classroom activities.",
                  links: [{ url: 'https://www.webwise.ie/' }],
                },
                {
                  label: 'National Parents Council - Internet Safety Training',
                  description:
                    'The NPC runs free webinars and in-person sessions that teach parents how to configure devices, spot red flags, and support children after online incidents. Sessions typically include live demos of safety settings plus Q&A.',
                  links: [
                    {
                      url: 'https://www.npc.ie/training-and-resources/training-we-offer/internet-safety-in-your-school',
                    },
                  ],
                },
                {
                  label: 'ISPCC - Digital Ready Hub',
                  description:
                    'The ISPCC’s Digital Ready Hub combines articles, printable checklists, and youth stories that focus on resilience and coping strategies. It also signposts to the Childline listening service for kids who experience online harm.',
                  links: [{ url: 'https://www.ispcc.ie/ispcc-digital-ready-hub/' }],
                },
                {
                  label: 'Comisiún na Meán - Keeping Safe Online',
                  description:
                    'Comisiún na Meán (Ireland’s media regulator) curates Keeping Safe Online guidance that explains video-sharing code rules, complaint routes, and media literacy tips. The material helps families understand how Irish and EU regulations protect young audiences.',
                  links: [
                    {
                      url: 'https://www.cnam.ie/general-public/children-young-people/keeping-safe-online/',
                    },
                  ],
                },
                {
                  label: 'None of the above',
                },
              ]}
            />
            <NavButtons
              prev={prevStep}
              prevLabel="Go to Section 1"
              next={handleNextStep}
              nextLabel="Go to Section 3"
            />
          </div>

          {/* SECTION 3 */}
          <div className={currentStep === 3 ? 'block' : 'hidden'}>
            <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
              Section 3: Concerns
            </h2>
            <p className="mb-4 text-gray-400">
              The questions focus on your own concerns for your child/children regarding use of
              technology and online safety.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Why are these questions being asked?
            </h3>
            <p className="mb-6 text-gray-400">
              There may be significant differences in the issues of concern from parent to parent.
              It is important to understand the nature of these concerns when designing educational
              resources for their children.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              How many questions in this section?
            </h3>
            <p className="mb-6 text-gray-400">3</p>
            <div className="border-t border-gray-700 pt-8">
              {firstError === 'safety_concerns' && <ErrorBanner />}
              <MatrixRating
                name="safety_concerns"
                error={validationErrors.has('safety_concerns')}
                questionLabel="Q.8 Online safety concerns for children"
                questionText="Rank the following concerns you have for your own child/children from 1 - Not concerned at all, to 10 - Extremely concerned."
                rows={[
                  'Cyberbullying',
                  'Phone/Internet/Gaming addiction',
                  'Organisations tracking activity (browsing behaviour, location etc.)',
                  'Access to unsuitable/harmful content',
                  'Negative mental health impact, e.g. body image, masculinity',
                  'Online predators and grooming',
                  'Digital Footprint, e.g. all online actions stored permanently.',
                  'Recommender algorithms pushing extreme/polarising content.',
                  'Financial risks, e.g. in-app purchases.',
                  'Sexting or Image based abuse',
                  'Relationships with AI chatbots.',
                ]}
              />
            </div>

            {firstError === 'tech_attitude' && <ErrorBanner />}
            <MatrixRadio
              name="tech_attitude"
              error={validationErrors.has('tech_attitude')}
              questionLabel="Q.9 Attitude to child/children's use of technology"
              questionText="Select how strongly you agree or disagree with the following statements on children's use of phones/internet."
              options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              rows={[
                'Social media should be banned for users under a certain age',
                'Mobile phones should be banned for users under a certain age',
                'Age verification should be introduced to all social media platforms',
                "I am happy for my child/children's browsing data to be tracked and used to provide them with a 'personalised' experience.",
                'A Google/Apple account is necessary for using an ordinary Android/Apple device - I am happy for my child to sign up to either service when they get their own phone.',
                "I am happy for my child/children's to share their photos/videos online",
                'I am happy for the photos/videos my child/children take to be stored in the cloud.',
              ]}
            />

            {firstError === 'controls' && <ErrorBanner />}
            <MatrixRadio
              name="controls"
              error={validationErrors.has('controls')}
              questionLabel="Q.10 Cybersecurity controls you use or intend to use for your child/children"
              questionText="Which of the following services/controls for aiding with child smartphone safety do you currently use, or intend to use?"
              options={['Do not/Will not use', 'Unsure', 'Use/Will use', "Don't know"]}
              rows={[
                'Real time location tracking',
                "Remote lock (instantly lock the device from the parent's phone)",
                'Content Filters (restrict/allow certain sites/apps)',
                'Screen time scheduler',
                'Call and message monitoring (see call logs and read all messages)',
              ]}
            />
            <NavButtons
              prev={prevStep}
              prevLabel="Go to Section 2"
              next={handleNextStep}
              nextLabel="Go to Section 4"
            />
          </div>

          {/* SECTION 4 */}
          <div className={currentStep === 4 ? 'block' : 'hidden'}>
            <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
              Section 4: Education
            </h2>
            <p className="mb-4 text-gray-400">
              These questions focus on your opinion of the current state of technical and online
              safety education for children in Ireland, and wishes for your own child/children's
              education.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Why are these questions being asked?
            </h3>
            <p className="mb-6 text-gray-400">
              There have been numerous recent calls by experts for more and earlier tech and
              cybersecurity education in Ireland. It is important to understand if this sentiment is
              echoed by current parents.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              How many questions in this section?
            </h3>
            <p className="mb-6 text-gray-400">3</p>
            <div className="border-t border-gray-700 pt-8">
              {firstError === 'expert_opinions' && <ErrorBanner />}
              <MatrixRadio
                name="expert_opinions"
                error={validationErrors.has('expert_opinions')}
                questionLabel="Q.11 Opinions of experts and children"
                questionText="Select how strongly you agree or disagree with the following statements."
                options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
                rows={[
                  'Mobile phones should be banned at schools - Minister for Education Norma Foley (2024) [1]',
                  "Blanket bans for phones in schools is not in the best interest of children - Ombudsman for Children's Office (OCO) (2025) [2]",
                  'Starting digital media and literacy education at secondary level is simply too late - CyberSafeKids Trends and Usage Report (2025) [3]',
                  'We need to Invest more in resources for digital education - OCO Youth Advisory Panel (2025) [4]',
                  "Parents should be the ones to introduce their children to the internet - Webwise A Parent's Guide to a Better Internet [5]",
                ]}
              />
            </div>

            <div className="mb-8 text-base text-gray-400">
              <p className="mb-1 font-semibold">References:</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>
                  <a
                    href="https://www.rte.ie/news/education/2024/0821/1466075-schools-mobile-phones/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    RTE: Schools mobile phones (2024)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.rte.ie/news/ireland/2025/0910/1532761-phone-bans-ireland/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    RTE: Phone bans Ireland (2025)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cybersafekids.ie/report2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    CyberSafeKids Report (2025)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.oco.ie/app/uploads/2025/09/OCO-Smartphone-Ban-Child-Friendly-Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    OCO Smartphone Ban Child Friendly Report (2025)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.webwise.ie/parents/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:underline"
                  >
                    Webwise: Parents Guide
                  </a>
                </li>
              </ol>
            </div>

            {firstError === 'skills_importance' && <ErrorBanner />}
            <MatrixRadio
              name="skills_importance"
              error={validationErrors.has('skills_importance')}
              questionLabel="Q.12 Aspirations for your own child/children's education"
              questionText="How important are the following skills for your child to learn?"
              options={[
                'Not at all important',
                'Not important',
                'Neutral',
                'Important',
                'Very important',
              ]}
              rows={[
                'Scam & phishing recognition',
                'Computational thinking & creativity, e.g. how to solve problems using technology',
                'Coding e.g. learning a programming language like Python, Javascript',
                'How to minimise their online digital footprint, e.g. browse the internet/use apps without being tracked',
                'How to store and backup personal photos/videos/documents independently, i.e. not with large tech companies',
                'Cryptography, e.g. logic behind passwords & encryption',
              ]}
            />

            {firstError === 'edu_opinion' && <ErrorBanner />}
            <MatrixRadio
              name="edu_opinion"
              error={validationErrors.has('edu_opinion')}
              questionLabel="Q.13 Your opinion on your child/children's tech & cybersecurity education"
              questionText="Select how strongly you agree or disagree with the following statements on online safety and tech education."
              options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
              rows={[
                'I am confident I can personally teach my child/children how to stay safe online.',
                'I am confident that my child/children (will) receive sufficient education in school to keep them safe online.',
                'I am confident that the technical education my child/children (will) receive at school is sufficient for the world they will enter as adults.',
              ]}
            />
            <NavButtons
              prev={prevStep}
              prevLabel="Go to Section 3"
              next={handleNextStep}
              nextLabel="Go to Section 5"
            />
          </div>

          {/* SECTION 5 */}
          <div className={currentStep === 5 ? 'block' : 'hidden'}>
            <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
              Section 5: Basic Demographics
            </h2>
            <p className="mb-4 text-gray-400">
              Questions on your awareness of trends in children's use of technology, risks with
              using currently popular devices/websites/apps, and currently available educational
              resources.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Why are these questions being asked?
            </h3>
            <p className="mb-6 text-gray-400">
              Awareness of current trends of technology use, the risks involved, and the tools
              available to combat these risks, are important factors in a parent's approach to their
              child/children's online safety.
            </p>
            <h3 className="mb-2 text-lg font-semibold text-white">
              How many questions in this section?
            </h3>
            <p className="mb-6 text-gray-400">3</p>
            <div className="border-t border-gray-700 pt-8">
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  {firstError === 'role' && <ErrorBanner />}
                  <label htmlFor="role" className="mb-2 block text-lg font-semibold text-white">
                    Q.14 What is your role?
                  </label>
                  <select
                    id="role"
                    defaultValue={surveyData['role'] as string}
                    onChange={(e) => saveResponse('role', e.target.value)}
                    className={`focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border bg-gray-700 p-2.5 text-base text-white placeholder-gray-400 ${validationErrors.has('role') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                  >
                    <option value="">Select...</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Guardian</option>
                  </select>
                </div>
                <div>
                  {firstError === 'children-count' && <ErrorBanner />}
                  <label
                    htmlFor="children-count"
                    className="mb-2 block text-lg font-semibold text-white"
                  >
                    Q.15 How many children do you have?
                  </label>
                  <select
                    id="children-count"
                    defaultValue={surveyData['children-count'] as string}
                    onChange={(e) => saveResponse('children-count', e.target.value)}
                    className={`focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border bg-gray-700 p-2.5 text-base text-white placeholder-gray-400 ${validationErrors.has('children-count') ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-600'}`}
                  >
                    <option value="">Select...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>

            {firstError && firstError.startsWith('child-') && <ErrorBanner />}
            <ChildrenTable validationErrors={validationErrors} />
          </div>

          {/* FINAL */}
          <div className={`rounded-lg bg-gray-800 p-8 ${currentStep === 5 ? 'block' : 'hidden'}`}>
            <h3 className="mb-4 text-xl font-bold text-white">Finally</h3>
            <p className="mb-6 text-gray-400">
              Thank you for completing the survey! Your responses will be a great help in informing
              the development of a new tech and cybersecurity curriculum.
              <br className="mb-2" />
              If you are interested in a more comprehensive tech and cybersecurity education for
              your own child/children, or would like to further discuss the issues in this survey,
              please leave your email in the box below.
            </p>

            <div className="mb-6">
              <label htmlFor="email" className="mb-2 block text-base font-medium text-white">
                Email address
              </label>
              <input
                id="email"
                type="email"
                defaultValue={surveyData['email'] as string}
                onBlur={(e) => saveResponse('email', e.target.value)}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="comments" className="mb-2 block text-base font-medium text-white">
                Any further comments or questions:
              </label>
              <textarea
                id="comments"
                rows={4}
                defaultValue={surveyData['comments'] as string}
                onBlur={(e) => saveResponse('comments', e.target.value)}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <button
                type="button"
                onClick={prevStep}
                className="group text-primary-500 hover:text-primary-400 flex cursor-pointer items-center text-base font-medium transition-colors duration-200"
              >
                <svg
                  className="mr-2 h-5 w-5 transform transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go to Section 4
              </button>
              <button
                type="submit"
                className="bg-primary-800 hover:bg-primary-900 focus:ring-primary-600 w-full cursor-pointer rounded-md px-5 py-2.5 text-base font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
              >
                Submit Survey
              </button>
            </div>
          </div>
        </form>
      </div>
    </SurveyContext.Provider>
  )
}
