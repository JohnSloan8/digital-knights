import QuestionScene from '@/components/QuestionScene'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Question' })

export default function QuestionPage() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <QuestionScene className="h-full w-full" />
      </div>
    </div>
  )
}
