import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import SectionContainer from '@/components/SectionContainer'
import PhoneVisual from './PhoneVisual'
import Link from '@/components/Link'
import curriculumData from './curriculum.json'

export const metadata = genPageMetadata({ title: 'Curriculum' })

const YearBlock = ({
  year,
  title,
  summary,
  terms,
  materials,
  safety,
}: {
  year: number
  title: string
  summary: string
  terms: { number: number; title: string; outcomes: string }[]
  materials: string[]
  safety: string
}) => (
  <div className="scroll-mt-24 rounded-xl border border-gray-700 bg-gray-800/20 p-6 shadow-xl backdrop-blur-sm">
    {/* Header */}
    <div className="mb-6 border-b border-gray-700/50 pb-6">
      <h2 className="text-3xl font-bold text-emerald-400">
        Year {year}: {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-gray-300">{summary}</p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Visual & Materials Column */}
      <div className="space-y-6">
        <div className="rounded-lg border border-gray-700/50 bg-gray-950/50 p-4 shadow-inner">
          <PhoneVisual step={year * 2} />
        </div>
        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Core Materials</h4>
          <ul className="grid grid-cols-1 gap-2 text-sm text-gray-400 sm:grid-cols-2">
            {materials.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Terms & Outcomes */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white">Learning Outcomes</h4>
        <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-0.5 before:bg-gray-700/50">
          {terms.map((term) => (
            <div key={term.number} className="relative pl-10">
              {/* Timeline Dot */}
              <div className="absolute top-1.5 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-gray-800 font-mono text-xs font-bold text-emerald-400 shadow-sm">
                {term.number}
              </div>
              <h5 className="mb-1 text-lg font-medium text-emerald-300">{term.title}</h5>
              <p className="text-sm leading-relaxed text-gray-400">{term.outcomes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Safety Footer */}
    <div className="mt-8 flex items-start gap-4 rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-4">
      <svg
        className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
        />
      </svg>
      <div>
        <h4 className="mb-1 text-sm font-bold tracking-wider text-emerald-400 uppercase">
          Safety Focus
        </h4>
        <p className="text-sm text-gray-400">{safety}</p>
      </div>
    </div>
  </div>
)

export default function Curriculum() {
  return (
    <SectionContainer>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Curriculum"
          description="Build a phone from the ground up: a structured learning journey for 8-13 year olds."
        />

        {/* Pedagogical Philosophy */}
        <div className="prose dark:prose-invert max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Pedagogical Approach</h2>
          <p className="mb-6 text-lg leading-relaxed">
            The 5-year, Digital Knights curriculum is centered on the goal of children building
            their own functioning mobile phone from basic components. The core pedagogical idea is
            that to understand a complex device, it is best to learn how each component works
            individually. By starting with a simple small computer (Raspberry PI), then gradually
            adding components (camera, GPS, wifi, touchscreen etc.), students develop a deeper
            understanding of how their devices work, what data they are generating, and how they
            interact with the wider internet.
          </p>
          <p className="text-lg leading-relaxed">
            This curriculum is a work in progress. To contribute to its development, please complete
            the <Link href="/survey">survey</Link> or get in <Link href="/contact">contact</Link>.
          </p>
        </div>
        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-white">Structure</h2>
          <p className="mb-6 text-lg leading-relaxed">
            The curriculum is split into 5 years, with 4 terms of 7/8 weeks. Each year focuses on a
            specific theme, with each term dedicated to a single component within that theme.
          </p>
          <div className="space-y-12">
            {curriculumData.map((year) => (
              <YearBlock key={year.year} {...year} />
            ))}
          </div>
        </div>
      </div>

      {/* Future Directions */}
      <div className="prose dark:prose-invert mt-12 max-w-none border-t border-gray-700 py-12 text-gray-300">
        <h2 className="mb-6 text-3xl font-bold text-white">Future Directions</h2>
        <p className="text-lg leading-relaxed">
          The journey doesn't end with a built phone. Future steps will involve building up a small{' '}
          <strong>homelab</strong>. Students will learn about server ownership, understanding cloud
          computing for backups, and syncing data privately.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="mb-2 text-xl font-bold text-emerald-400">Junior Cert Technology</h3>
            <p>
              The skills learned (electronics, soldering, materials, design process) directly map to
              the Junior Cycle Technology and Engineering curricula.
            </p>
          </div>
          <div className="rounded-lg bg-gray-800 p-6">
            <h3 className="mb-2 text-xl font-bold text-emerald-400">
              Leaving Cert Computer Science
            </h3>
            <p>
              The programming (Python), computational thinking, and understanding of computer
              architecture provide a significant head-start for Leaving Certificate Computer
              Science.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
