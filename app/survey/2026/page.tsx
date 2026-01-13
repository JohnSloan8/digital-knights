import { genPageMetadata } from 'app/seo'
import SurveyForm from '@/components/SurveyForm'
import PageHeader from '@/components/PageHeader'

export const metadata = genPageMetadata({ title: "Parents' Cybersecurity Survey 2026 - Questions" })

export default function SurveyQuestionsPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title="Survey Questions" />
        <div className="py-12">
          <SurveyForm />
        </div>
      </div>
    </>
  )
}
