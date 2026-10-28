import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import Link from '@/components/Link'

export const metadata = genPageMetadata({
  title: 'Talks',
  description: 'Talks and workshops on technology and online safety for secondary school students.',
})

const topics = [
  {
    title: 'Your Personal Data',
    description:
      'Understanding the data you create and share, how it builds a digital footprint, and how it is used to profile you and target content.',
  },
  {
    title: 'Scams & Manipulation',
    description:
      'Recognising phishing, scams and the persuasive design techniques used to keep you scrolling and sharing.',
  },
  {
    title: 'Use & Abuse of AI',
    description:
      'How AI tools work, how to use them well, and how they can be misused, from deepfakes to misinformation.',
  },
]

const details = [
  { term: 'For', value: 'Transition Year students (other year groups on request)' },
  {
    term: 'Format',
    value: 'Interactive talk (40-60 minutes) or a longer hands-on workshop',
  },
  { term: 'Group Size', value: 'A single class group up to a full year group' },
  { term: 'Location', value: 'At your school (Dublin area)' },
  { term: 'Timing', value: 'Flexible around your timetable' },
  { term: 'Garda Vetting', value: 'Happy to arrange Garda vetting through the school' },
]

export default function TalksPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Talks & Workshops"
          description="For secondary school students, starting with Transition Year"
        />
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
                Now booking Transition Year talks for the 2026/27 school year, including around{' '}
                <strong className="text-blue-100">Safer Internet Day (February 2027)</strong>.
                Please{' '}
                <Link
                  href="/contact"
                  noStyle
                  className="font-semibold text-blue-300 hover:text-blue-200"
                >
                  get in touch
                </Link>{' '}
                to arrange a talk at your school.
              </p>
            </div>
          </div>

          <div className="prose prose-invert md:prose-lg mb-8 w-full max-w-none">
            <p>
              Teenagers are already living much of their lives online. Digital Knights talks and
              workshops give secondary school students a practical, interactive look at the
              technology behind their screens, helping them understand what they are sharing, who is
              using it, and how to stay safe and in control. Sessions are delivered by{' '}
              <Link
                href="/about#about-me"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                Dr. John Sloan
              </Link>
              , a Trinity College Research Fellow and CISSP certified cybersecurity professional.
            </p>
          </div>

          <h2 className="mb-6 text-3xl font-bold text-white">Topics</h2>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className="rounded-xl border border-gray-700/60 bg-gray-800/20 p-5 shadow-xl backdrop-blur-sm"
              >
                <h3 className="text-primary-400 mb-2 text-lg font-bold">{topic.title}</h3>
                <p className="text-base leading-relaxed text-gray-200">{topic.description}</p>
              </div>
            ))}
          </div>
          <p className="mb-12 text-base leading-relaxed">
            Content is flexible and can be tailored to complement SPHE, digital learning, or an
            existing TY module. If there are particular subjects you would like covered, just ask.
          </p>

          <h2 className="mb-6 text-3xl font-bold text-white">Details</h2>
          <div className="overflow-hidden rounded-xl border border-gray-700/60 bg-gray-800/20 shadow-xl backdrop-blur-sm">
            <dl className="divide-y divide-gray-700/60">
              {details.map((detail) => (
                <div
                  key={detail.term}
                  className="grid gap-2 px-5 py-4 md:grid-cols-[11rem_1fr] md:gap-6"
                >
                  <dt className="text-primary-400 text-sm font-semibold tracking-wide uppercase">
                    {detail.term}
                  </dt>
                  <dd className="text-base leading-relaxed text-gray-200">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="prose prose-invert md:prose-lg mb-8 w-full max-w-none">
            <h2 className="mb-6 pt-12 text-3xl font-bold text-white">Book a Talk</h2>
            <p>
              Teachers, TY coordinators and principals are welcome to get in touch to discuss a talk
              or workshop for your students via the{' '}
              <Link
                href="/contact"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                contact
              </Link>{' '}
              page.
            </p>
            <p>
              Looking for something for younger children? See the after-school{' '}
              <Link
                href="/classes"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                classes
              </Link>{' '}
              for 7-13 year olds.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
