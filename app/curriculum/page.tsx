import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Link from '@/components/Link'
import curriculumData from './curriculum.json'

export const metadata = genPageMetadata({ title: 'Curriculum' })

const YearBlock = ({
  year,
  title,
  summary,
  semesters,
}: {
  year: number
  title: string
  summary: string
  semesters: {
    number: number
    title: string
    description: string
    learningOutcomes: string[]
    materials: string[]
    image: string
  }[]
}) => (
  <div className="mb-8 scroll-mt-24 rounded-xl border border-gray-700 bg-gray-800/20 p-3 shadow-xl backdrop-blur-sm md:mb-16 md:p-6">
    {/* Header */}
    <div className="mb-4 border-b border-gray-700/50 pb-4 md:mb-6 md:pb-6">
      <h2 className="text-xl font-bold text-white md:text-2xl">
        Year {year}: {title}
      </h2>
      <p className="mt-3 leading-relaxed text-gray-300 md:mt-4">{summary}</p>
    </div>

    <div className="flex flex-col gap-6 md:gap-12">
      {semesters.map((semester, idx) => (
        <div key={semester.number} className="flex flex-col gap-4 md:gap-6">
          {/* Divider except for the first item */}
          {idx > 0 && <div className="border-t border-gray-700/50" />}

          {/* Title & Description- Full Width */}
          <div className="mb-1 md:mb-2">
            <h3 className="text-primary-500 text-lg font-bold md:text-xl">
              Semester {semester.number}
            </h3>
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
              {/* Left Column: Image & Materials - 1/3 width on md+ */}
              <div className="flex w-full shrink-0 flex-col gap-6 md:w-1/3">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-700/50 shadow-lg">
                  <Image
                    src={semester.image}
                    alt={semester.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="hidden text-gray-400 md:block">
                  <h4 className="text-primary-400 mb-2 text-lg font-semibold">Materials</h4>
                  <ul className="marker:text-primary-500 list-disc space-y-1 pl-4">
                    {semester.materials.map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Descriptions & Outcomes - 2/3 width */}
              <div className="flex-1 space-y-6">
                <p className="leading-relaxed text-gray-300">{semester.description}</p>

                {/* Materials - Visible only on small screens below description */}
                <div className="block text-gray-400 md:hidden">
                  <h4 className="text-primary-400 mb-2 text-lg font-semibold">Materials</h4>
                  <ul className="marker:text-primary-500 list-disc space-y-1 pl-4">
                    {semester.materials.map((item, i) => (
                      <li key={i}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-primary-400 text-lg font-semibold">Learning Outcomes</h4>
                  <ul className="marker:text-primary-500 list-disc space-y-2 pl-4 text-gray-400">
                    {semester.learningOutcomes.map((outcome, i) => (
                      <li key={i}>{outcome}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function Curriculum() {
  return (
    <SectionContainer>
      <div className="divide-y divide-gray-700">
        <PageHeader title="Curriculum" description="Want a phone? Build it yourself! :-)" />

        <div className="py-8">
          {/* OURS Project Images */}
          <div className="grid gap-6 pt-8 md:grid-cols-2">
            <figure className="space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-700/50 shadow-lg">
                <Image
                  src="/static/images/levels-pics/OURS-01.webp"
                  alt="OURS Project View 1"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400">OURS project</figcaption>
            </figure>
            <figure className="space-y-3">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-700/50 shadow-lg">
                <Image
                  src="/static/images/levels-pics/OURS-02.webp"
                  alt="OURS Project View 2"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-400">PiPhone project</figcaption>
            </figure>
          </div>
        </div>

        {/* Introduction */}
        <div className="prose dark:prose-invert md:prose-lg max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Introduction</h2>
          <p className="leading-relaxed">
            The Digital Knights curriculum is a five-year educational framework designed to equip
            children with an understanding of modern computing and communication technologies. It is
            intended to be taught before children receive their first smartphone (at approximately
            13 years old). The pedagogical approach is based on the idea that the best way to
            understand a complex system is to break it down into its component parts and understand
            each of them individually. The curriculum is therefore structured around the hands-on
            project of building a functional mobile phone from basic components. This approach was
            inspired by the <Link href="https://github.com/evanman83/OURS-project">OURS</Link> and{' '}
            <Link href="https://learn.adafruit.com/piphone-a-raspberry-pi-based-cellphone?embeds=allow">
              PiPhone
            </Link>{' '}
            projects.
          </p>
        </div>

        {/* Rationale */}
        <div className="prose dark:prose-invert md:prose-lg max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Rationale</h2>
          <p className="leading-relaxed">
            By building a phone from scratch, students will gain a deep understanding of the
            individual components that make up a modern smart device. They will see the data
            generated, the ways it is stored and used on the device, and how it is transmitted
            across a network. This knowledge will help them make informed decisions in the future
            about the types of data they capture and share with other people, apps, and websites. It
            will also give them a strong foundation in the basics of computing and communication
            technologies.
          </p>
        </div>

        {/* Aims */}
        <div className="prose dark:prose-invert md:prose-lg max-w-none py-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Aims</h2>
          <p className="leading-relaxed">
            The main aim is for each child to become a technologically self-sufficient digital
            citizen - one who is in control of their devices, data and digital footprint. They can
            use technology safely, wisely, and in creative ways to solve real-world problems.
            Additional aims include inspiring a passion for technology, laying foundations for
            Junior Cert Technology and Leaving Cert Computer Science subjects, and providing a
            valuable set of skills for future success.
          </p>
        </div>

        <div className="pt-8 text-gray-300">
          <h2 className="mb-6 text-3xl font-bold text-white">Structure</h2>
          <p className="leading-relaxed">
            The curriculum is designed to be taught over a five-year period, with each year split
            into 2 semesters of 15 weeks running parallel to the school year. Class sizes are
            intended to be small (max 8 students) to allow for a hands-on, project-based learning
            experience with sufficient individual attention.
          </p>
          <p className="pt-4 leading-relaxed">
            A semester-by-semester breakdown of the curriculum is provided below. Each semester
            includes a detailed description of the topics covered, the materials used, and the
            learning outcomes for students.
          </p>
          <div className="space-y-8 pt-8 md:space-y-12 md:pt-12">
            {curriculumData.map((year) => (
              <YearBlock key={year.year} {...year} />
            ))}
          </div>

          <p className="mt-8 text-lg md:mt-12">
            For more information on classes, or to add your child(ren) to the waitlist, see:{' '}
            <Link href="/classes" className="text-primary-500 hover:text-primary-400 !no-underline">
              Classes
            </Link>
          </p>
        </div>
      </div>
    </SectionContainer>
  )
}
