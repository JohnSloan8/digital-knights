import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: "Parents' Cybersecurity Survey 2026" })

export default function SurveyPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Parents' Cybersecurity Survey 2026
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            This is a survey aimed at gathering parents' awareness, knowledge and opinions on tech
            and cybersecurity education for their children.
          </p>
        </div>
        <div className="container py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="prose dark:prose-invert max-w-none pb-8">
              <p>
                Thank you for taking the time to participate in this survey. Your input is valuable
                in helping us understand the current landscape of cybersecurity awareness among
                parents.
              </p>
            </div>
            <Link
              href="/survey/2026?id"
              className="bg-primary-800 hover:bg-primary-900 dark:hover:bg-primary-400 focus:ring-primary-600 rounded-md px-8 py-4 text-xl font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none dark:ring-offset-black"
            >
              Start Survey
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
