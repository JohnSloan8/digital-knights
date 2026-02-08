import { genPageMetadata } from 'app/seo'
import CalligraphyArrow from '@/components/CalligraphyArrow'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageHeader from '@/components/PageHeader'
import TechLine from '@/components/TechLine'
import levels from '@/data/curriculum.json'
import CurriculumModal from '@/components/CurriculumModal'

// Safelist for dynamic gradient classes
// from-yellow-500 from-emerald-500 from-blue-500
// to-yellow-500 to-emerald-500 to-blue-500

export const metadata = genPageMetadata({ title: 'Curriculum' })

export default function Curriculum() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Curriculum"
          description="Preparing children for the digital world in 3 structured levels."
        />
        <div className="my-8 flex rounded-lg border-l-4 border-blue-500 bg-blue-500/10 p-4">
          <div className="mr-4 flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-blue-500"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h5 className="mb-2 font-bold text-blue-500">Under Development</h5>
            <div className="space-y-2 text-gray-300">
              <p>The Digital Knights curriculum is currently under development.</p>

              <p>
                Parental input is actively being sought through a survey{' '}
                <Link href={'/survey'}>here</Link> and follow-up discussions.
              </p>
            </div>
          </div>
        </div>
        <div className="relative space-y-8 py-12 pt-0">
          <div className="space-y-4 text-gray-300 md:text-lg md:leading-7">
            <p>
              The Digital Knights curriculum will structure a learning pathway for children,
              starting from 7-10 years old, to technologically proficient individuals at 15 who
              control their data, devices and digital footprint. The curriculum is designed to be
              taught in-person, once a week for 1 hour. Class sizes are limited to small groups
              (8-10), and will be taught by an experienced teacher and expert in computer science
              and cybersecurity.
            </p>
            <p>
              There are <strong>3 levels</strong> to the curriculum - Page, Squire and Knight. Each
              level builds upon the previous to develop the necessary skills with respect to the age
              and ability of the children. A secondary aim is to complement the National Council for
              Curriculum and Assessment's STEM{' '}
              <Link href="https://www.curriculumonline.ie/getmedia/70081350-c004-4773-8948-f70b0d4ef554/Primary-STE-and-MATHS-Spec-ENG.pdf">
                Education Specification
              </Link>{' '}
              to prepare solid foundations for Junior Cycle{' '}
              <Link href="https://curriculumonline.ie/getmedia/934299b8-d2d8-461e-8d80-cca9d96e656b/JCSEC27_technology_syllabus.pdf">
                Technology
              </Link>{' '}
              and Leaving Certificate{' '}
              <Link href="https://curriculumonline.ie/getmedia/cff6eb86-9ff8-4e68-abf9-e42ca637492d/LC-Computer-Science-specification-updated.pdf">
                Computer Science
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col pt-6">
            {levels.map((level, index) => (
              <div key={level.title} className="relative pb-24 last:pb-0">
                {/* Content Card with Image overlapping */}
                <div
                  className={`relative z-10 rounded-xl border ${level.borderColor} ${level.cardBg} p-6`}
                >
                  <div className="absolute top-6 left-6">
                    <div
                      className={`flex items-center justify-center rounded-lg px-3 py-1 text-sm font-bold tracking-wider text-white shadow-sm ${level.dotColor}`}
                    >
                      LEVEL {index + 1}
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    {/* Title Row - Centered Full Width */}
                    <div className="relative flex flex-col items-center justify-center gap-4 py-2 md:flex-row md:gap-0">
                      <div className="flex items-center gap-3">
                        <TechLine side="left" className="text-gray-400" />
                        <h2 className="font-medieval text-4xl leading-8 tracking-widest text-gray-100">
                          {level.title}
                        </h2>
                        <TechLine side="right" className="text-gray-400" />
                      </div>
                    </div>

                    {/* Content Row: Image + Data */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      {/* Image Box */}
                      <div
                        className={`flex h-24 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-gray-900 ${level.cardBorder} md:h-32 md:w-48`}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            alt={level.title}
                            src={level.imgSrc}
                            className="object-contain"
                            fill
                            sizes="(max-width: 768px) 128px, 192px"
                          />
                        </div>
                      </div>

                      {/* Right Data: Age/Duration/Tools/Skills */}
                      <div className="flex flex-1 flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-200">AGE:</span>
                            <span className="text-gray-300">{level.ages}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-200">DURATION:</span>
                            <span className="text-gray-300">{level.duration}</span>
                          </div>

                          {/* Equipment */}
                          {level.tools && level.tools.length > 0 && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-gray-200">EQUIPMENT:</span>
                              <span className="text-gray-300">
                                {level.tools.map((t) => t.name).join(', ')}
                              </span>
                            </div>
                          )}

                          {/* Skills */}
                          <div className="flex items-start gap-2">
                            <span className="font-semibold text-gray-200">SKILLS:</span>
                            <span className="text-gray-300">
                              {level.skills.map((skill) => skill.name).join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description and Link */}
                    <div>
                      <p className="mb-4 text-gray-300 md:text-lg">{level.description}</p>
                      <div className="mt-2">
                        <CurriculumModal
                          className={`cursor-pointer text-sm font-semibold tracking-wider uppercase ${level.dotColor.replace('bg-', 'text-')} hover:opacity-80`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow connecting to next level */}
                {index < levels.length - 1 && (
                  <div className="absolute -bottom-0 left-1/2 flex h-24 w-12 -translate-x-1/2 transform items-center justify-center pb-0">
                    <CalligraphyArrow
                      fromClass={level.dotColor}
                      toClass={levels[index + 1].dotColor}
                      className="h-full w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="py-12">
          <h2 className="mb-8 text-2xl leading-8 font-bold tracking-tight text-gray-100 sm:text-3xl md:text-4xl">
            Towards Junior and Leaving Cert
          </h2>
          <div className="text-gray-300 md:text-lg md:leading-7">
            <p>
              At the conclusion of Level 3, students will have the skills to enter the digital world
              with full control over their own devices, data and digital footprint. In addition,
              they will have acquired a strong foundation in digital skills and computational
              thinking which will feed into the Junior Cycle Technology, and Leaving Certificate
              Computer Science curricula.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
