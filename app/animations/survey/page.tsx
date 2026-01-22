import SurveyScene from '@/components/SurveyScene'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Survey' })

export default function SurveyPage() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <SurveyScene className="h-full w-full" />
      </div>
    </div>
  )
}
