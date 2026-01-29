import { genPageMetadata } from 'app/seo'
import CalligraphyArrow from '@/components/CalligraphyArrow'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageHeader from '@/components/PageHeader'
import TechLine from '@/components/TechLine'
import levels from '@/data/curriculum.json'

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
          description="Our curriculum is designed to take students on a journey from beginners to digital guardians. Students will be taught in 5 levels, beginning with a gentle and fun introduction to computational thinking, building up knowledge, technical and cyber security skills."
        />
        <div className="relative py-12">
          <div className="flex flex-col">
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
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-200">PREREQUISITES:</span>
                            <span className="text-gray-300">
                              {index === 0 ? 'None' : `Completed Level ${index}`}
                            </span>
                          </div>

                          {/* Tools */}
                          {level.tools && level.tools.length > 0 && (
                            <div className="flex items-start gap-2">
                              <span className="font-semibold text-gray-200">TOOLS:</span>
                              <span className="text-gray-300">
                                {level.tools.map((t) => t.name).join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Skills Div - Full Width */}
                    <div>
                      <h3 className="mb-2 font-semibold text-gray-200">SKILLS:</h3>
                      <div className="flex flex-wrap gap-2">
                        {level.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="inline-flex items-center rounded-md bg-gray-800/50 px-2 py-1 text-sm font-medium text-gray-300 ring-1 ring-gray-700/50 ring-inset"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description and Link */}
                    <div>
                      <p className="mb-4 text-lg text-gray-300">{level.description}</p>
                      <div className="mt-2">
                        <Link
                          href={`/curriculum/${level.title.toLowerCase().replace(' ', '-')}`}
                          className={`text-sm font-semibold tracking-wider uppercase ${level.dotColor.replace('bg-', 'text-')} hover:opacity-80`}
                          aria-label={`Learn more about ${level.title}`}
                        >
                          More Details &rarr;
                        </Link>
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
          <div className="text-lg leading-7 text-gray-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
