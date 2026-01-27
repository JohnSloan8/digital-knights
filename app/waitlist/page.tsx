import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from './WaitlistForm'
import Link from '@/components/Link'
import WaitingScene from '@/components/WaitingScene'

export const metadata = genPageMetadata({ title: 'Waitlist' })

export default function WaitlistPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Waitlist"
          description="Add your child/children to the waitlist for future classes"
        />
        <div className="py-12">
          <p className="mb-8 text-lg text-gray-300">
            If you are interested in your child/children joining a Digital Knights class in the
            future, please complete the form below to be added to the waitlist.
          </p>
          <p className="mb-8 text-lg text-gray-300">
            Please note the following proposed timeline of events:
          </p>
          <div className="mb-10 overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full text-left text-sm text-gray-300">
              <thead className="bg-gray-800 text-xs font-semibold text-gray-200 uppercase">
                <tr>
                  <th className="w-1 px-2 py-4 whitespace-nowrap sm:px-6">Date</th>
                  <th className="px-2 py-4 sm:px-6">Event</th>
                  <th className="px-2 py-4 sm:px-6">Further Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 border-t border-gray-700">
                <tr>
                  <td className="px-2 py-4 font-medium whitespace-nowrap text-white sm:px-6">
                    May 2026
                  </td>
                  <td className="px-2 py-4 sm:px-6">Publish curriculum</td>
                  <td className="px-2 py-4 sm:px-6">
                    High-level outline available{' '}
                    <Link href="/curriculum" className="text-primary-500 hover:text-primary-400">
                      here
                    </Link>
                    . Details will be informed by results from{' '}
                    <Link href="/survey" className="text-primary-500 hover:text-primary-400">
                      survey
                    </Link>{' '}
                    & discussions with parents
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-4 font-medium whitespace-nowrap text-white sm:px-6">
                    Jul 2026
                  </td>
                  <td className="px-2 py-4 sm:px-6">Confirm location of academy</td>
                  <td className="px-2 py-4 sm:px-6">
                    Likely D14/D16, but depends on demand and available facilities
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-4 font-medium whitespace-nowrap text-white sm:px-6">
                    Sep 2026
                  </td>
                  <td className="px-2 py-4 sm:px-6">Begin classes</td>
                  <td className="px-2 py-4 sm:px-6">
                    Depending on acquiring necessary approvals, insurance and resources
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <WaitingScene className="relative z-[-1] -mt-[80px] mb-0 h-[300px] w-full md:h-[500px]" />

          <WaitlistForm />
        </div>
      </div>
    </>
  )
}
