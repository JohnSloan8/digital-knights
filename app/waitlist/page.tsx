import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import WaitlistForm from './WaitlistForm'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Waitlist' })

export default function WaitlistPage() {
  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Waitlist"
          description="Add your child/children to the waitlist for future classes"
        />
        <div className="py-12 pb-40">
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
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Further Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 border-t border-gray-700">
                <tr>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">May 2026</td>
                  <td className="px-6 py-4">Details on curriculum Published</td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">July 2026</td>
                  <td className="px-6 py-4">Location of academy confirmed</td>
                  <td className="px-6 py-4">
                    Likely Rathfarnham area, but depends on demand and available facilities
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    September 2026
                  </td>
                  <td className="px-6 py-4">Classes for all ages are scheduled to begin</td>
                  <td className="px-6 py-4">
                    Depending on acquiring necessary approvals, insurance and resources
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 className="mt-12 mb-6 text-center text-2xl leading-8 font-bold tracking-tight text-gray-100">
            Waitlist Application Form
          </h2>
          <WaitlistForm />
        </div>
      </div>
    </>
  )
}
