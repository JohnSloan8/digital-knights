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
          description="Parents' awareness, knowledge and opinions on tech and cybersecurity issues related to their children."
        />
        <div className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="prose prose-invert max-w-none pb-8">
              <h3>What is the purpose of this survey?</h3>
              <p>
                To inform the development of an independent tech and cybersecurity curriculum for
                primary-school age children in Ireland.
              </p>

              <h3>Who is this survey for?</h3>
              <p>Parents/Guardians of children under 13 years old in Ireland.</p>

              <h3>How many questions are there?</h3>
              <p>16.</p>

              <h3>How long will this survey take?</h3>
              <p>5-10 minutes.</p>

              <h3>Is this survey anonymous?</h3>
              <p>
                Yes. You will be given an option at the end of the survey to include your email
                address if you want to learn more.
              </p>

              <h3>What types of questions are asked?</h3>
              <p>
                All questions relate to you, the parent/guardian's views, opinions and attitudes on
                tech and cybersecurity issues for you and your children.
              </p>
              <p>The questions are grouped into 5 sections:</p>
              <ol>
                <li>Competency</li>
                <li>Awareness</li>
                <li>Concerns</li>
                <li>Education</li>
                <li>Basic Demographics</li>
              </ol>

              <h3>Why are you asking these questions?</h3>
              <p>
                Parents' experience and opinions on tech and cybersecurity have a significant impact
                on their child/children's interaction with the digital world. Understand the
                parent's position is crucial for designing a curriculum.
              </p>

              <h3>What will happen with the results of the survey?</h3>
              <p>
                The results will be used to inform the development of a curriculum for educating
                children on tech and cybersecurity before possessing an internet-enabled device.
              </p>
            </div>
            <Link
              href="/survey/2026?id"
              className="bg-primary-800 hover:bg-primary-900 focus:ring-primary-600 rounded-md px-8 py-4 text-xl font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Start Survey
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
