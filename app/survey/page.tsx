import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'

export const metadata = genPageMetadata({ title: "Parents' Cybersecurity Survey 2026" })

export default function SurveyPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Parents' Cybersecurity Survey 2026"
          description="This is a survey aimed at gathering parents' awareness, knowledge and opinions on tech and cybersecurity education for their children."
        />
        <div className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="prose prose-invert max-w-none pb-8">
              <p>
                Thank you for taking the time to participate in this survey. Your input is valuable
                in helping us understand the current landscape of cybersecurity awareness among
                parents.
              </p>
            </div>
            <Link
              href="/survey/2026?id"
              className="bg-primary-600 hover:bg-primary-500 focus:ring-primary-600 rounded-md px-8 py-4 text-xl font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Start Survey
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
