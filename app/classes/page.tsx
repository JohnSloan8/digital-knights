import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from './WaitlistForm'
import Link from '@/components/Link'
import WaitingSceneWrapper from '@/components/WaitingSceneWrapper'

export const metadata = genPageMetadata({ title: 'Classes' })

export default function ClassesPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title="Classes" description="Information about Digital Knights classes" />
        {/* Details on Classes */}
        <div className="max-w-none py-8 text-gray-300">
          {/* Admonition */}
          <div className="mb-8 overflow-hidden rounded-lg border border-blue-500/40 bg-blue-900/30 text-blue-200">
            <div className="flex items-center gap-2 border-b border-blue-500/40 bg-blue-800/40 px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 flex-shrink-0 text-blue-300"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold tracking-wide text-blue-300 uppercase">
                Notice
              </span>
            </div>
            <div className="px-5 py-4">
              <p className="text-base leading-relaxed">
                Classes are currently scheduled to begin in{' '}
                <strong className="text-blue-100">Autumn 2026</strong>. Parents can help shape the
                curriculum by completing the{' '}
                <Link
                  href="/survey"
                  noStyle
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  survey
                </Link>
                , and express an interest in a place by joining the{' '}
                <a href="#waitlist" className="font-semibold text-blue-300 hover:text-blue-200">
                  waitlist below
                </a>
                .
              </p>
            </div>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-white">Details</h2>
          <div className="overflow-hidden rounded-xl border border-gray-700/60 bg-gray-800/20 shadow-xl backdrop-blur-sm">
            <dl className="divide-y divide-gray-700/60">
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Class Size
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">4-8 students</dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  For Ages
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">7-13</dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Course Content
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  See{' '}
                  <Link
                    href="/curriculum"
                    noStyle
                    className="text-primary-500 hover:text-primary-400"
                  >
                    curriculum
                  </Link>{' '}
                  page for details.
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Time
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  One 50-minute class each week to take place after school (2-7pm) during term time.
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Start Date
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  Autumn 2026 or Spring 2027 (depending on demand).
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Teacher
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  <Link href="/about" noStyle className="text-primary-500 hover:text-primary-400">
                    myself
                  </Link>
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Price
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  €275 per 15-week semester.
                </dd>
              </div>
              <div className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6">
                <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                  Location
                </dt>
                <dd className="text-base leading-relaxed text-gray-200">
                  TBD (Rathfarnham, Ballinteer, Dundrum areas)
                </dd>
              </div>
            </dl>
          </div>
          <div className="prose prose-invert md:prose-lg mb-8 w-full max-w-none">
            <h2 id="waitlist" className="mb-6 pt-12 text-3xl font-bold text-white">
              Waitlist
            </h2>

            <p>
              If you would like to express an interest in your child/children joining a Digital
              Knights class in the future, please complete the form below to be added to the
              waitlist. Places will be assigned on a first-come-first-served basis
            </p>
          </div>

          <WaitingSceneWrapper className="relative z-[-1] -mt-[80px] mb-0 h-[300px] w-full md:h-[500px]" />

          <WaitlistForm />
        </div>
      </div>
    </>
  )
}
