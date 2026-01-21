import ThreeSceneSimple from '@/components/ThreeSceneSimple'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Thanks' })

export default function ThanksPage() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <ThreeSceneSimple className="h-full w-full" />
      </div>
    </div>
  )
}
