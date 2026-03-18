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
  semesters,
  materials,
  safety,
}: {
  year: number
  title: string
  summary: string
  semesters: { number: number; title: string; outcomes: string }[]
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

      {/* Semesters & Outcomes */}
      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-white">Learning Outcomes</h4>
        <div className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-0.5 before:bg-gray-700/50">
          {semesters.map((semester) => (
            <div key={semester.number} className="relative pl-10">
              {/* Timeline Dot */}
              <div className="absolute top-1.5 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700 bg-gray-800 font-mono text-xs font-bold text-emerald-400 shadow-sm">
                {semester.number}
              </div>
              <h5 className="mb-1 text-lg font-medium text-emerald-300">{semester.title}</h5>
              <p className="text-sm leading-relaxed text-gray-400">{semester.outcomes}</p>
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
          description="Building a smart phone from scratch: a structured learning journey for 8-13 year olds."
        />

        {/* Introduction */}
        <div className="prose dark:prose-invert max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Introduction</h2>
          <p className="text-lg leading-relaxed">
            The Digital Knights curriculum presents a five-year educational framework designed to
            equip children with an understanding of modern computing and communication technologies.
            It is intended to be taught before children receive their first internet-enabled device,
            typically around the age of 13. The curriculum is structured around the hands-on project
            of building a functional mobile phone from basic components.
          </p>
        </div>

        {/* Rationale */}
        <div className="prose dark:prose-invert max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Rationale</h2>
          <p className="text-lg leading-relaxed">
            An understanding of how computers and the internet work can help young people to make
            informed decisions about how to engage with technology and the online world safely and
            responsibly. By building a smartphone from scratch, students will gain a deeper
            understanding of the individual components that make up a modern smart device, the data
            they generate, and how that data is transmitted and stored across the internet.
          </p>
        </div>

        {/* Aims */}
        <div className="prose dark:prose-invert max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Aims</h2>
          <p className="text-lg leading-relaxed">
            The primary aim of this curriculum is to provide children with an understanding of
            computing and communication technologies before they receive their first smartphone.
            Secondary aims include inspiring a passion for technology, laying foundations for Junior
            Cert Technology and Leaving Cert Computer Science subjects, and providing a useful set
            of skills which can be used in a wide range of fields.
          </p>
        </div>

        <div className="py-8">
          <h2 className="mb-6 text-3xl font-bold text-white">Structure</h2>
          <div className="space-y-12">
            {curriculumData.map((year) => (
              <YearBlock key={year.year} {...year} />
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="prose dark:prose-invert max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Learning Outcomes</h2>
          <p className="text-lg leading-relaxed">
            Upon completion of the curriculum, students will have demonstrated a comprehensive
            understanding of computer architecture, having successfully integrated disparate
            hardware modules into a cohesive, functional system. Learners will exhibit proficiency
            in procedural programming and algorithmic logic, applying these skills to control
            physical inputs and outputs with precision. Beyond technical execution, students will
            possess the analytical tools to evaluate digital safety risks and the ethical dimensions
            of technology use. This holistic skill set ensures they are prepared not only to build
            technology but to use it responsibly and innovatively.
          </p>
        </div>
      </div>

      {/* Future Directions */}
      <div className="prose dark:prose-invert mt-12 max-w-none border-t border-gray-700 py-12 text-gray-300">
        <h2 className="mb-6 text-3xl font-bold text-white">Future Directions</h2>
        <p className="text-lg leading-relaxed">
          The educational journey extends beyond the construction of the handset, seamlessly
          bridging the gap between primary exploration and secondary specification. The competencies
          acquired—ranging from circuit design to Python programming—provide a distinct advantage
          for students progressing to Junior Cycle Technology and Leaving Certificate Computer
          Science. Looking ahead, the curriculum envisions a broadening of scope to include personal
          server management and private cloud infrastructure, further empowering students to assert
          sovereignty over their digital data. This forward-looking perspective ensures that
          learning remains relevant and adaptable to the evolving landscape of personal computing.
        </p>
      </div>
    </SectionContainer>
  )
}
