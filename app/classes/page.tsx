import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from './WaitlistForm'
import Link from '@/components/Link'
import WaitingScene from '@/components/WaitingScene'

export const metadata = genPageMetadata({ title: 'Classes' })

export default function ClassesPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title="Classes" description="Information about Digital Knights classes" />
        <div className="py-12">
          <div className="prose prose-invert mb-8 w-full max-w-none md:text-lg">
            <p>
              If you would like to express an interest in your child/children joining a Digital
              Knights class in the future, please complete the form below to be added to the
              waitlist.
            </p>
            <p>Places will be assigned on a first-come-first-served basis</p>
          </div>

          <WaitingScene className="relative z-[-1] -mt-[80px] mb-0 h-[300px] w-full md:h-[500px]" />

          <WaitlistForm />
        </div>
      </div>
    </>
  )
}
