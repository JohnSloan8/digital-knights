import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Syllabus' })

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
  },
]

export default function Syllabus() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Syllabus
          </h1>
          <p className="text-lg leading-7 text-gray-400">
            Our curriculum is designed to take students on a journey from beginners to digital
            guardians. Students will be taught in 5 levels, beginning with a gentle and fun
            introduction to computational thinking, building up knowledge, technical and cyber
            security skills.
          </p>
        </div>
        <div className="container py-12">
          {levels.map((level, index) => (
            <div
              key={level.title}
              className={`flex flex-col gap-8 py-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center`}
            >
              <div
                className={`flex w-full justify-center md:w-auto ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                <div className="relative h-60 w-80 overflow-hidden rounded-xl border-4 border-gray-500 bg-gray-900/50 shadow-[0_0_15px_rgba(0,240,255,0.5)] md:h-72 md:w-96">
                  <Image
                    alt={level.title}
                    src={level.imgSrc}
                    className="object-contain object-center pt-4"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="w-full md:flex-1">
                <h2 className="mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
                  {level.title}
                </h2>
                <p className="mb-4 text-gray-400">{level.description}</p>
                <ul className="list-disc pl-5 text-gray-400">
                  {level.skills.map((skill) => (
                    <li key={skill} className="mb-1">
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href={`/syllabus/${level.title.toLowerCase().replace(' ', '-')}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Learn more about ${level.title}`}
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
