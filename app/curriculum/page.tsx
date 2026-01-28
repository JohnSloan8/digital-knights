import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageHeader from '@/components/PageHeader'

export const metadata = genPageMetadata({ title: 'Curriculum' })

const levels = [
  {
    title: 'Page',
    description:
      'A gentle and fun introduction to computational thinking. Students start their journey by learning the fundamental concepts of logic and problem-solving without the need for complex code.',
    skills: [
      'Computational Thinking',
      'Pattern Recognition',
      'Basic Logic & Sequencing',
      'Digital Safety Awareness',
    ],
    imgSrc: '/static/images/levels-cartoons/page.png',
    cardBg: 'bg-yellow-950/30',
    cardBorder: 'border-yellow-500/50',
    borderColor: 'border-yellow-500',
    dotColor: 'bg-yellow-500',
  },
  {
    title: 'Squire',
    description:
      'Building up knowledge and confidence. As students progress, they begin to apply their computational thinking skills to more structured problems and basic programming concepts.',
    skills: [
      'Algorithm Design',
      'Block-based Programming',
      'Debugging Simple Programs',
      'Internet Etiquette',
    ],
    imgSrc: '/static/images/levels-cartoons/squire.png',
    cardBg: 'bg-emerald-950/30',
    cardBorder: 'border-emerald-500/50',
    borderColor: 'border-emerald-500',
    dotColor: 'bg-emerald-500',
  },
  {
    title: 'Knight 1',
    description:
      'Developing technical skills. Students transition into text-based programming and start exploring the inner workings of computer systems.',
    skills: [
      'Introduction to Python',
      'Variables & Data Types',
      'Control Structures (Loops & Conditionals)',
      'Basic Computer Architecture',
    ],
    imgSrc: '/static/images/levels-cartoons/knight-01.png',
    cardBg: 'bg-blue-950/30',
    cardBorder: 'border-blue-500/50',
    borderColor: 'border-blue-500',
    dotColor: 'bg-blue-500',
  },
  {
    title: 'Knight 2',
    description:
      'Advancing into cyber security concepts. The focus shifts towards understanding how systems can be vulnerable and how to protect them.',
    skills: [
      'Network Fundamentals',
      'Cryptography Basics',
      'Web Security Principles',
      'Ethical Hacking Concepts',
    ],
    imgSrc: '/static/images/levels-cartoons/knight-02.png',
    cardBg: 'bg-slate-300/10',
    cardBorder: 'border-slate-300/50',
    borderColor: 'border-slate-300',
    dotColor: 'bg-slate-300',
  },
  {
    title: 'Knight 3',
    description:
      'Mastering complex challenges. At the highest level, students tackle advanced security scenarios and develop robust defense strategies.',
    skills: [
      'Advanced Penetration Testing',
      'System Hardening',
      'Incident Response',
      'Security Policy & Ethics',
    ],
    imgSrc: '/static/images/levels-cartoons/knight-03.png',
    cardBg: 'bg-yellow-600/10',
    cardBorder: 'border-yellow-400/50',
    borderColor: 'border-yellow-400',
    dotColor: 'bg-yellow-400',
  },
]

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
                {/* Connecting Line */}
                {index < levels.length - 1 && (
                  <div className="absolute -bottom-0 left-1/2 z-0 -ml-1 flex h-24 w-2 flex-col items-center">
                    <div className={`w-full flex-1 ${level.dotColor}`}></div>
                    <div
                      className={`h-0 w-0 border-t-[16px] border-r-[8px] border-l-[8px] border-r-transparent border-l-transparent ${level.dotColor.replace(
                        'bg-',
                        'border-t-'
                      )}`}
                    ></div>
                  </div>
                )}

                {/* Content Card with Image overlapping */}
                <div
                  className={`relative z-10 rounded-xl border ${level.cardBorder} ${level.cardBg} p-6`}
                >
                  <div className="flex flex-col gap-6">
                    {/* Title Row */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-block h-3 w-3 rounded-full ${level.dotColor}`}
                      ></span>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight text-gray-100">
                        Level {index + 1}: {level.title}
                      </h2>
                    </div>

                    {/* Image and Skills Row */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      {/* Image Box */}
                      <div
                        className={`flex h-20 w-28 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-gray-900 ${level.borderColor} md:h-24 md:w-36`}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            alt={level.title}
                            src={level.imgSrc}
                            className="object-contain"
                            fill
                            sizes="(max-width: 768px) 112px, 144px"
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex-1">
                        <h3 className="mb-2 font-semibold text-gray-200">Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                          {level.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-md bg-gray-800/50 px-2 py-1 text-sm font-medium text-gray-300 ring-1 ring-gray-700/50 ring-inset"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
