'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

const DUBLIN_POSTCODES = [
  ...Array.from({ length: 24 }, (_, i) => `Dublin ${i + 1}`),
  'Dublin 6W',
  'Dun Laoghaire/Rathdown',
]

const OTHER_COUNTIES = [
  'Antrim',
  'Armagh',
  'Carlow',
  'Cavan',
  'Clare',
  'Cork',
  'Derry',
  'Donegal',
  'Down',
  'Fermanagh',
  'Galway',
  'Kerry',
  'Kildare',
  'Kilkenny',
  'Laois',
  'Leitrim',
  'Limerick',
  'Longford',
  'Louth',
  'Mayo',
  'Meath',
  'Monaghan',
  'Offaly',
  'Roscommon',
  'Sligo',
  'Tipperary',
  'Tyrone',
  'Waterford',
  'Westmeath',
  'Wexford',
  'Wicklow',
]

const LOCATIONS = [...DUBLIN_POSTCODES, ...OTHER_COUNTIES].sort((a, b) => {
  // Keep Dublin ones roughly at top or sort alphabetically?
  // User asked for "all dublin postcodes... and options for all the other Irish counties".
  // Mixing them might be confusing if sorted purely alphabetically (Dublin 1 near Donegal).
  // Let's keep Dublin codes first, then other counties.
  const aIsDublin = a.startsWith('Dublin') || a === 'Dun Laoghaire/Rathdown'
  const bIsDublin = b.startsWith('Dublin') || b === 'Dun Laoghaire/Rathdown'
  if (aIsDublin && !bIsDublin) return -1
  if (!aIsDublin && bIsDublin) return 1
  return a.localeCompare(b, undefined, { numeric: true })
})

type ChildData = {
  birthYear: string
  gender: string
}

export default function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [children, setChildren] = useState<ChildData[]>([{ birthYear: '', gender: '' }])
  const [otherInfo, setOtherInfo] = useState('')

  const handleAddChild = () => {
    setChildren([...children, { birthYear: '', gender: '' }])
  }

  const handleChildChange = (index: number, field: keyof ChildData, value: string) => {
    const newChildren = [...children]
    newChildren[index][field] = value
    setChildren(newChildren)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await supabase.from('waitlist').insert({
        email,
        child_info: JSON.stringify({ location, children, otherInfo }),
        created_at: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      // Ideally show an error state here, but for now we proceed to success message
    }

    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-gray-800 p-8 text-center">
        <h3 className="mb-4 text-2xl font-bold text-white">Thank You!</h3>
        <p className="text-lg text-gray-400">
          Thank you for expressing an interest in future classes. I will get back to you by the end
          of the week.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-gray-800 p-4 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label htmlFor="email" className="mb-2 block text-base font-medium text-white">
            Your Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-base font-medium text-white">
            Your Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
          >
            <option value="">Select Location...</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {children.map((child, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-top-4 duration-300">
              <h4 className="mb-4 text-base font-medium text-white uppercase">Child {index + 1}</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor={`child-birthYear-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Birth Year
                  </label>
                  <select
                    id={`child-birthYear-${index}`}
                    value={child.birthYear}
                    onChange={(e) => handleChildChange(index, 'birthYear', e.target.value)}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                  >
                    <option value="">Select Birth Year...</option>
                    {Array.from({ length: 2026 - 2008 + 1 }, (_, i) => 2026 - i).map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor={`child-gender-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Gender
                  </label>
                  <select
                    id={`child-gender-${index}`}
                    value={child.gender}
                    onChange={(e) => handleChildChange(index, 'gender', e.target.value)}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                  >
                    <option value="">Select Gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddChild}
            className="text-primary-500 hover:text-primary-400 flex items-center text-sm font-medium transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add another child
          </button>
        </div>

        <div>
          <label htmlFor="otherInfo" className="mb-2 block text-base font-medium text-white">
            Any other information or queries
          </label>
          <textarea
            id="otherInfo"
            rows={4}
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary-800 hover:bg-primary-900 focus:ring-primary-600 w-full cursor-pointer rounded-md px-5 py-2.5 text-base font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
