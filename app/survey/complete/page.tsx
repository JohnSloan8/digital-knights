import Link from '@/components/Link'

export default function SurveyCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="mb-4 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
        Survey Complete
      </h1>

      <div className="max-w-2xl px-4 text-left text-gray-300">
        <p className="mb-8 text-lg">
          Thank you for completing the survey! Your responses have been recorded.
        </p>

        <p className="mb-4 text-xl font-semibold text-white">Further information:</p>

        <ul className="list-none space-y-4 text-gray-400">
          <li>
            Read answers to common questions about the project:{' '}
            <Link href="/faq" className="text-primary-500 hover:text-primary-400 underline">
              FAQ
            </Link>
          </li>
          <li>
            View the proposed cybersecurity curriculum structure:{' '}
            <Link href="/syllabus" className="text-primary-500 hover:text-primary-400 underline">
              Syllabus
            </Link>
          </li>
          <li>
            Learn more about the team and goals behind Digital Knights:{' '}
            <Link href="/about" className="text-primary-500 hover:text-primary-400 underline">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
