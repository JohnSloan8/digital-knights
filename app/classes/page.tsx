import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from './WaitlistForm'
import Link from '@/components/Link'
import WaitingScene from '@/components/WaitingScene'

export const metadata = genPageMetadata({ title: 'Classes' })

export default function ClassesPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title="Classes" description="Information about Digital Knights classes" />
        {/* Details on Classes */}
        <div className="max-w-none py-8 text-gray-300">
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
          <div className="prose prose-invert mb-8 w-full max-w-none md:text-lg">
            <h2 className="mb-6 pt-12 text-3xl font-bold text-white">Waitlist</h2>

            <p>
              If you would like to express an interest in your child/children joining a Digital
              Knights class in the future, please complete the form below to be added to the
              waitlist. Places will be assigned on a first-come-first-served basis
            </p>
          </div>

          <WaitingScene className="relative z-[-1] -mt-[80px] mb-0 h-[300px] w-full md:h-[500px]" />

          <WaitlistForm />
        </div>
      </div>
    </>
  )
}
