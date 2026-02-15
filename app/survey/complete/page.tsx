import Link from '@/components/Link'
import ThanksScene from '@/components/ThanksScene'
import PageHeader from '@/components/PageHeader'

export default function SurveyCompletePage() {
  return (
    <div className="divide-y divide-gray-700">
      <PageHeader title="Survey Complete" description="Thank you for completing the survey!" />
      <div className="py-12">
        <div className="prose prose-invert max-w-none md:text-lg">
          <ThanksScene className="relative mb-8 h-[300px] w-full md:float-right md:mb-4 md:ml-8 md:h-[500px] md:w-1/2" />

          <p className="text-xl font-semibold text-white">Useful Links:</p>

          <ul>
            <li>
              Register your interest for future classes: <Link href="/waitlist">Waitlist</Link>
            </li>
            <li>
              View the proposed cybersecurity curriculum structure:{' '}
              <Link href="/curriculum">Curriculum</Link>
            </li>
            <li>
              Read answers to common questions about the project: <Link href="/faq">FAQ</Link>
            </li>

            <li>
              Learn more about Digital Knights: <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
