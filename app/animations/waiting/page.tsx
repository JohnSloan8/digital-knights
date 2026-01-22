import WaitingScene from '@/components/WaitingScene'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Waiting' })

export default function WaitingPage() {
  return (
    <div className="relative h-full w-full">
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <WaitingScene className="h-full w-full" />
      </div>
    </div>
  )
}
