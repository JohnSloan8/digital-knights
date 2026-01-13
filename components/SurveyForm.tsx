'use client'

import React, { useState } from 'react'

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
                window.scrollTo({ top: 0, behavior: 'smooth' })
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
  <div className="mt-8 flex justify-between border-t border-gray-700 pt-8">
    {prev ? (
      <button
        type="button"
        onClick={prev}
        className="rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-base font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-700 focus:outline-none"
      >
        {prevLabel}
      </button>
    ) : (
      <div />
    )}

    {next && (
      <button
        type="button"
        onClick={next}
        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 rounded-lg px-5 py-2.5 text-base font-medium text-white focus:ring-4 focus:outline-none"
      >
        {nextLabel}
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
}

const MatrixRadio = ({ questionLabel, questionText, options, rows, name }: MatrixRadioProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-white">{questionLabel}</h3>
      <p className="mb-4 text-base text-gray-400">{questionText}</p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-base text-gray-400">
          <colgroup>
            <col style={{ width: '40%' }} />
            {options.map((_, idx) => (
              <col key={idx} style={{ width: `${60 / options.length}%` }} />
            ))}
          </colgroup>
          <thead className="bg-gray-700 text-sm text-white uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">
                Statement
              </th>
              {options.map((option, idx) => (
                <th key={idx} scope="col" className="px-4 py-2 text-center font-normal">
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
                        className="cursor-pointer px-6 py-4 text-center"
                        onClick={() => triggerRadioInput(inputId)}
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
                    className="flex w-full flex-col items-center justify-between text-center text-sm text-white"
                  >
                    <span className="mb-2 flex min-h-[36px] items-center justify-center px-1 text-white uppercase">
                      {option}
                    </span>
                    <input
                      type="radio"
                      name={`${name}-${rowIdx}`}
                      value={option}
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
}

const MatrixSlider = ({
  questionLabel,
  questionText,
  rows,
  name,
  suffix = '%',
}: MatrixSliderProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-white">{questionLabel}</h3>
      <p className="mb-4 text-base text-gray-400">{questionText}</p>
      <div className="space-y-6">
        {rows.map((row, idx) => {
          const displayRow = formatSubQuestion(row, idx)
          return (
            <div key={idx} className="flex flex-col space-y-2">
              <label className="text-base text-white">{displayRow}</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  name={`${name}-${idx}`}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
                />
                <span className="w-12 text-base text-gray-400">50{suffix}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface CheckboxOption {
  label: string
  description?: string
}

interface CheckboxesProps {
  questionLabel: string
  questionText: string
  options: CheckboxOption[]
  name: string
}

const Checkboxes = ({ questionLabel, questionText, options, name }: CheckboxesProps) => {
  const [activeDescription, setActiveDescription] = useState<string | null>(null)

  const toggleDescription = (label: string) => {
    setActiveDescription((prev) => (prev === label ? null : label))
  }

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-white">{questionLabel}</h3>
      <p className="mb-4 text-base text-gray-400">{questionText}</p>
      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center">
              <input
                id={`${name}-${idx}`}
                type="checkbox"
                value={option.label}
                name={name}
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
                  className="focus:ring-primary-600 ml-3 flex h-7 w-7 items-center justify-center rounded-full border border-gray-600 text-sm text-white hover:bg-gray-700 focus:ring-2 focus:outline-none"
                  aria-label={`Learn more about ${option.label}`}
                >
                  ?
                </button>
              )}
            </div>
            {option.description && activeDescription === option.label && (
              <p className="ml-10 rounded-lg border border-gray-700 bg-gray-900/70 p-3 text-sm text-gray-300">
                {option.description}
              </p>
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
}

const MatrixRating = ({
  questionLabel,
  questionText,
  rows,
  name,
  scale = 10,
}: MatrixRatingProps) => {
  const scaleArr = Array.from({ length: scale }, (_, i) => i + 1)
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-white">{questionLabel}</h3>
      <p className="mb-4 text-base text-gray-400">{questionText}</p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-base text-gray-400">
          <colgroup>
            <col style={{ width: '40%' }} />
            {scaleArr.map((_, idx) => (
              <col key={idx} style={{ width: `${60 / scaleArr.length}%` }} />
            ))}
          </colgroup>
          <thead className="bg-gray-700 text-sm text-gray-400 uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Question \ Rating
              </th>
              {scaleArr.map((s) => (
                <th key={s} scope="col" className="px-2 py-3 text-center text-white">
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const displayRow = formatSubQuestion(row, rowIdx)
              return (
                <tr key={rowIdx} className="border-b border-gray-700 bg-gray-800 hover:bg-gray-600">
                  <td className="px-6 py-4 text-white">{displayRow}</td>
                  {scaleArr.map((s, optIdx) => {
                    const inputId = `${name}-${rowIdx}-${optIdx}`
                    return (
                      <td
                        key={s}
                        className="cursor-pointer px-2 py-4 text-center"
                        onClick={() => triggerRadioInput(inputId)}
                        onKeyDown={(event) => handleRadioCellKeyDown(event, inputId)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <input
                            id={inputId}
                            type="radio"
                            name={`${name}-${rowIdx}`}
                            value={s}
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
              <div className="grid grid-cols-5 gap-3">
                {scaleArr.map((s) => (
                  <label
                    key={s}
                    className="flex w-full flex-col items-center justify-between text-center text-base text-white"
                  >
                    <span className="mb-2 flex min-h-[20px] items-center justify-center text-white uppercase">
                      {s}
                    </span>
                    <input
                      type="radio"
                      name={`${name}-${rowIdx}`}
                      value={s}
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

const ChildrenTable = () => {
  const [rows, setRows] = useState([1, 2, 3, 4, 5])

  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="mb-4 text-lg font-semibold text-gray-400">
        Input the age of each child, gender, and whether they currently possess their own
        smartphone.
      </h3>
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
            <tr key={r} className="border-b border-gray-700 bg-gray-800">
              <td className="px-6 py-4">{r}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                />
              </td>
              <td className="px-6 py-4">
                <select className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400">
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
                  className="focus:ring-primary-600 text-primary-600 h-4 w-4 rounded border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep((prev) => Math.min(prev + 1, 5))
  }
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={currentStep} setStep={setCurrentStep} />

      <form className="space-y-12">
        {/* SECTION 1 */}
        <div className={currentStep === 1 ? 'block' : 'hidden'}>
          <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
            Section 1: Competency
          </h2>
          <p className="mb-4 text-gray-400">
            3 questions relating to your technical ability, attitude to cybersecurity, and
            cybersecurity practices.
          </p>
          <h3 className="mb-2 text-lg font-semibold text-white">
            Why are these questions being asked?
          </h3>
          <p className="mb-6 text-gray-400">
            A parent's competency in technology and cybersecurity may exert a strong influence on
            how their children interact online.
          </p>

          <div className="border-t border-gray-700 pt-8">
            <MatrixRadio
              name="tech_knowledge"
              questionLabel="Question 1"
              questionText="Your own technical knowledge. Select how strongly you agree or disagree with the following statements about your technical knowledge."
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

          <MatrixRadio
            name="privacy_attitude"
            questionLabel="Question 2"
            questionText="Attitude to cybersecurity. Select how strongly you agree or disagree with the following statements on privacy and cybersecurity."
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

          <Checkboxes
            name="tools_usage"
            questionLabel="Question 3"
            questionText="Cybersecurity Practices. Select all of the following privacy and cybersecurity tools that you currently use."
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
                description:
                  'Choose this option if you do not currently use any of the listed privacy or cybersecurity tools. It helps us understand baseline awareness levels in the survey.',
              },
            ]}
          />
          <NavButtons next={nextStep} nextLabel="Go to Section 2" />
        </div>

        {/* SECTION 2 */}
        <div className={currentStep === 2 ? 'block' : 'hidden'}>
          <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
            Section 2: Awareness
          </h2>

          <p className="mb-4 text-base text-gray-400">
            *Figures in Question 1 are based on data from the &apos;Cybersafekids Trends and Usage
            Report Academic Year 2024-2025&apos;. Actual figures from the survey will be shown on
            the following page. A link to the Cybersafekids website is provided later in this
            section.
          </p>

          <div className="border-t border-gray-700 pt-8">
            <MatrixSlider
              name="trends_8_12"
              questionLabel="Question 1"
              questionText="Current tech trends for 8-12 year olds. Estimate the percentage of 8-12 year olds in Ireland who..."
              rows={[
                'have their own smart device',
                'have accounts on 13+ social media/messaging apps',
                'have experienced cyberbullying',
                'have talked to a parent about online safety in the past year',
                'have engaged with people they have never met on apps/games',
                'have used AI chatbots',
                'have shared images or videos of themselves online',
              ]}
            />
          </div>

          <div className="mb-8 rounded-lg bg-blue-900/20 p-4">
            <h4 className="font-semibold text-blue-100">
              Answer 1/4: Current tech trends for 8-12 year olds
            </h4>
            <p className="text-base text-blue-200">
              Actual figures from the survey will be shown on the report page.
            </p>
          </div>

          <MatrixSlider
            name="trends_12_15"
            questionLabel="Question 2"
            questionText="Current tech trends for 12-15 year olds. Estimate the percentage of 12-15 year olds in Ireland who..."
            rows={[
              'have their own smart device',
              'have accounts on 13+ social media/messaging apps',
              'have experienced cyberbullying',
              'have talked to a parent about online safety in the past year',
              'have engaged with people they have never met on apps/games',
              'have used AI chatbots',
              'have shared images or videos of themselves online',
            ]}
          />

          <div className="mb-8 rounded-lg bg-blue-900/20 p-4">
            <h4 className="font-semibold text-blue-100">
              Answer 2/4: Current tech trends for 12-15 year olds
            </h4>
            <p className="text-base text-blue-200">
              Actual figures from the survey will be shown on the report page.
            </p>
          </div>

          <Checkboxes
            name="privacy_violations"
            questionLabel="Question 3"
            questionText="Privacy violations relating to children. Below is a list of fines imposed on tech firms for privacy violations specifically relating to children. Please check those that you are aware of."
            options={[
              {
                label:
                  "Epic Games/Fortnite (2022): Unauthorised collection of children's data - $520 million",
                description:
                  'The US Federal Trade Commission fined Epic for collecting personal data from children under 13 without parental consent and for using dark patterns that tricked players into paying. Epic also enabled live voice and text chat by default, exposing kids to adult strangers. The settlement forced Epic to adopt new privacy defaults.',
              },
              {
                label:
                  "Meta/Instagram (2022): Children's accounts default to public - €405 million",
                description:
                  'Ireland’s Data Protection Commission ruled that Instagram exposed minors’ email addresses and phone numbers by defaulting accounts to public business profiles. Investigators also found under-18 analytics dashboards showing follower data. Meta was ordered to rework teen privacy settings and pay €405m.',
              },
              {
                label: "TikTok (2023): Unauthorised access to children's accounts - €345 million",
                description:
                  'TikTok was fined after regulators discovered default public profiles for teens, weak age verification, and a “Family Pairing” feature that allowed adults to read private messages without proof of guardianship. The ruling emphasized TikTok’s failure to explain privacy risks to young users.',
              },
              {
                label:
                  "Google/YouTube (2019 & 2025): Repeated, unauthorised collection of children's data for targetted ads - $170 Million & $30 million",
                description:
                  'US regulators said YouTube knowingly tracked viewing habits on kid-focused channels to sell ads, violating COPPA. Google promised to treat all kid content as child-directed and limit personalization, yet faced another $30m penalty in 2025 for allowing similar tracking on the YouTube Kids app.',
              },
              {
                label:
                  "Amazon/Alexa (2023): - Recording and not deleting children's voices - $25 Million",
                description:
                  'Amazon retained voice recordings and location data from Alexa devices used by children even after parents tried to delete them. Regulators argued the company kept the data to refine its voice model, contradicting privacy promises. Amazon must now purge inactive child profiles.',
              },
              {
                label:
                  "Microsoft/Xbox (2023): - Unauthorised collection and retention of children's data - $20 Million",
                description:
                  'Microsoft collected children’s names, emails, and phone numbers during Xbox sign-up without timely parental consent and stored the data even when families abandoned the process. The FTC said this violated COPPA’s data minimization rules, resulting in a $20m fine.',
              },
              {
                label: 'None of the above',
                description:
                  'Select this option if you were not previously aware of any of the listed enforcement actions. This helps gauge the baseline awareness of high-profile penalties.',
              },
            ]}
          />

          <Checkboxes
            name="edu_resources"
            questionLabel="Question 4"
            questionText="Available Educational Resources. Below is a list of resources for educating children in Ireland on online safety and cybersecurity. Please check those that you are familiar with."
            options={[
              {
                label: 'CyberSafeKids',
                description:
                  'CyberSafeKids is an Irish non-profit that delivers classroom workshops, parent nights, and research on young peoples’ digital habits. Their guides cover cyberbullying, gaming, privacy settings, and include downloadable lesson plans. Examples: (Primary school workshops, Annual Trends & Usage Report).',
              },
              {
                label: 'TUSLA - Online Safety',
                description:
                  'TUSLA—the Child and Family Agency—publishes safeguarding guidance for carers, foster parents, and social workers on topics like inappropriate contact, grooming, and image-based abuse. Their online safety hub links to reporting pathways and age-appropriate conversation starters.',
              },
              {
                label: 'Webwise',
                description:
                  "Webwise is Ireland's Safer Internet Centre for schools, offering SPHE-aligned lesson packs, teenager peer-leader programs, and parent advice helplines. Their 'Connected' and 'MySelfie' resources combine videos with classroom activities.",
              },
              {
                label: 'National Parents Council - Internet Safety Training',
                description:
                  'The NPC runs free webinars and in-person sessions that teach parents how to configure devices, spot red flags, and support children after online incidents. Sessions typically include live demos of safety settings plus Q&A.',
              },
              {
                label: 'ISPCC - Digital Ready Hub',
                description:
                  'The ISPCC’s Digital Ready Hub combines articles, printable checklists, and youth stories that focus on resilience and coping strategies. It also signposts to the Childline listening service for kids who experience online harm.',
              },
              {
                label: 'Comisiún na Meán - Keeping Safe Online',
                description:
                  'Comisiún na Meán (Ireland’s media regulator) curates Keeping Safe Online guidance that explains video-sharing code rules, complaint routes, and media literacy tips. The material helps families understand how Irish and EU regulations protect young audiences.',
              },
              {
                label: 'None of the above',
                description:
                  'Choose this option if you are not familiar with any of the listed Irish educational resources so we can identify awareness gaps.',
              },
            ]}
          />
          <NavButtons prev={prevStep} next={nextStep} nextLabel="Go to Section 3" />
        </div>

        {/* SECTION 3 */}
        <div className={currentStep === 3 ? 'block' : 'hidden'}>
          <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
            Section 3: Concerns
          </h2>

          <div className="border-t border-gray-700 pt-8">
            <MatrixRating
              name="safety_concerns"
              questionLabel="Question 1"
              questionText="Online safety concerns for children. Rank the following concerns you have for your own child/children from 1 - Not concerned at all, to 10 - Extremely concerned."
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

          <MatrixRadio
            name="tech_attitude"
            questionLabel="Question 2"
            questionText="Attitude to child/children's use of technology. Select how strongly you agree or disagree with the following statements on children's use of phones/internet"
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

          <MatrixRadio
            name="controls"
            questionLabel="Question 3"
            questionText="Cybersecurity controls you use/intend to use for your child/children. Which of the following services/controls for aiding with child smartphone safety do you currently use, or intend to use."
            options={['Do not/Will not use', 'Unsure', 'Use/Will use', "Don't know"]}
            rows={[
              'Real time location tracking',
              "Remote lock (instantly lock the device from the parent's phone)",
              'Content Filters (restrict/allow certain sites/apps)',
              'Screen time scheduler',
              'Call and message monitoring (see call logs and read all messages)',
            ]}
          />
          <NavButtons prev={prevStep} next={nextStep} nextLabel="Go to Section 4" />
        </div>

        {/* SECTION 4 */}
        <div className={currentStep === 4 ? 'block' : 'hidden'}>
          <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
            Section 4: Education
          </h2>

          <div className="border-t border-gray-700 pt-8">
            <MatrixRadio
              name="expert_opinions"
              questionLabel="Question 1"
              questionText="Opinions of experts and children. Select how strongly you agree or disagree with the following statements."
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

          <MatrixRadio
            name="skills_importance"
            questionLabel="Question 2"
            questionText="Aspirations for your own child/children's education. How important are the following skills for your child to learn?"
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

          <MatrixRadio
            name="edu_opinion"
            questionLabel="Question 3"
            questionText="Your opinion on your child/children's tech & cybersecurity education. Select how strongly you agree or disagree with the following statements on online safety and tech education."
            options={['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}
            rows={[
              'I am confident I can personally teach my child/children how to stay safe online.',
              'I am confident that my child/children (will) receive sufficient education in school to keep them safe online.',
              'I am confident that the technical education my child/children (will) receive at school is sufficient for the world they will enter as adults.',
            ]}
          />
          <NavButtons prev={prevStep} next={nextStep} nextLabel="Go to Section 5" />
        </div>

        {/* SECTION 5 */}
        <div className={currentStep === 5 ? 'block' : 'hidden'}>
          <h2 className="mb-6 pb-2 text-center text-2xl font-bold text-white">
            Section 5: Basic Demographics
          </h2>

          <div className="border-t border-gray-700 pt-8">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="role" className="mb-2 block text-base font-medium text-white">
                  What is your role?
                </label>
                <select
                  id="role"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                >
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="children-count"
                  className="mb-2 block text-base font-medium text-white"
                >
                  How many children do you have?
                </label>
                <select
                  id="children-count"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
          </div>

          <ChildrenTable />
        </div>

        {/* FINAL */}
        <div className={`rounded-lg bg-gray-800 p-8 ${currentStep === 5 ? 'block' : 'hidden'}`}>
          <h3 className="mb-4 text-xl font-bold text-white">Finally</h3>
          <p className="mb-6 text-gray-400">
            Thank you for completing the survey! Your responses will be a great help in informing
            the development of a new tech and cybersecurity curriculum.
            <br className="mb-2" />
            If you are interested in a more comprehensive tech and cybersecurity education for your
            own child/children, or would like to further discuss the issues in this survey, please
            leave your email in the box below.
          </p>

          <div className="mb-6">
            <label htmlFor="email" className="mb-2 block text-base font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              type="email"
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
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded-lg border border-gray-600 bg-gray-700 px-5 py-2.5 text-center text-base font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-700 focus:outline-none sm:w-auto"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-base font-medium text-white focus:ring-4 focus:outline-none sm:w-auto"
            >
              Submit Survey
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
