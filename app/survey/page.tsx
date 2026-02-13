import StartSurveyButton from '@/components/StartSurveyButton'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import { redirect } from 'next/navigation'
import SurveyScene from '@/components/SurveyScene'

export const metadata = genPageMetadata({ title: 'Survey' })

export default async function SurveyPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams

  if (searchParams && searchParams.id) {
    redirect(`/survey/2026?id=${searchParams.id}`)
  }

  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Cybersecurity Survey"
          description="Understanding the parents' persective in 2026"
        />
        <div className="py-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="prose prose-invert w-full max-w-none pb-8 md:text-lg">
              <SurveyScene className="relative mb-8 h-[300px] w-full md:float-left md:mr-8 md:mb-4 md:h-[500px] md:w-1/2" />
              <h3>What is the purpose of this survey?</h3>
              <p>
                To inform the development of an independent tech and cybersecurity curriculum for
                children in Ireland.
              </p>

              <h3>Who is this survey for?</h3>
              <p>
                Parents/Guardians of children in Ireland who are interested in tech and
                cybersecurity education for their children.
              </p>

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
                on their child/children's interaction with the digital world. Understanding this
                persepective is important for designing a curriculum.
              </p>

              <h3>What will happen with the results of the survey?</h3>
              <p>
                The results will be used to inform the development of a curriculum for educating
                children on tech and cybersecurity.
              </p>
            </div>
            <StartSurveyButton />
          </div>
        </div>
      </div>
    </>
  )
}
