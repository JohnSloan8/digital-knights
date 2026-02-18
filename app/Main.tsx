import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import ThreeScene from '@/components/ThreeScene'
import headerNavLinks from '@/data/headerNavLinks'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const descriptions = {
    Articles: 'Articles and updates about cybersecurity and education.',
    Survey: 'Help us improve by taking our brief survey.',
    FAQ: 'Answers to common questions about our programs.',
    Curriculum: 'Explore our 5-level structured learning path.',
    Waitlist: 'Sign up to be notified when spots open.',
    About: 'Our mission, vision, and the team behind Digital Knights.',
  }

  return (
    <>
      <div id="react-three-fibre-container">
        <ThreeScene className="absolute top-0 left-0 h-[100svh] w-full" />
      </div>
      <div className="relative z-10 mx-auto mt-[calc(100svh-64px)] w-full md:mt-[calc(100svh-96px)]">
        <div className="">
          <div className="prose prose-invert w-full max-w-none md:text-lg">
            <h2>Introduction</h2>
            <p>
              Digital Knights is a new, educational initiative in South Dublin dedicated to teaching
              children tech and cybersecurity skills to prepare them for entry into the digital
              world.
            </p>
            <p>
              The main goal of Digital Knights is to provide children with sufficient technical
              skills to manage their devices, data and digital footprint in a way that enables them
              to navigate online spaces safely and privately. A secondary goal is to provide
              information to parents to support their children's learning and development.
            </p>
            <p>
              A{' '}
              <Link
                href="/curriculum"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                curriculum
              </Link>{' '}
              is currently under development which will be published on this website. In-person or
              online classes for children and parents will be made available if required. Parents
              input into the curriculum is being actively sought through a{' '}
              <Link
                href="/survey"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                survey
              </Link>{' '}
              and follow-up discussions.
            </p>
            <p>
              Digital Knights was founded by{' '}
              <Link
                href="/about#about-me"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                John Sloan
              </Link>{' '}
              - a father, Computer Science PhD, Trinity College lecturer and CISSP certified
              cybersecurity expert .
            </p>
          </div>

          <div className="my-10 border-t border-gray-700" />

          <h2 className="mt-10 mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
            Navigate Site
          </h2>
          <div className="space-y-8 text-gray-300 md:text-lg md:leading-8">
            <div>
              <p className="mb-2">For more information about Digital Knights:</p>
              <div className="flex flex-col space-y-1">
                <Link
                  href="/about"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  About <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/faq"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  FAQ <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/curriculum"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  Curriculum <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-2">Help with the curriculum development by providing your input:</p>
              <div className="flex flex-col space-y-1">
                <Link
                  href="/survey"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  Survey <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* <div>
              <p className="mb-2">If interested in your child/children joining a class:</p>
              <div className="flex flex-col space-y-1">
                <Link
                  href="/waitlist"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  Waitlist <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div> */}

            <div>
              <p className="mb-2">
                Information for parents on relevant topics will be posted here:
              </p>
              <div className="flex flex-col space-y-1">
                <Link
                  href="/blog"
                  className="text-primary-500 hover:text-primary-400 font-bold !no-underline"
                >
                  Articles <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
          {/* <div className="my-10 border-t border-gray-700 text-gray-300 md:text-lg">
            <h2 className="mt-10 mb-4 text-2xl leading-8 font-bold tracking-tight text-gray-100">
              Timeline
            </h2>
            <p className="mb-2">
              Below is a proposed timeline for curriculum development and academy opening if there
              is sufficient demand
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full text-left text-sm text-gray-300 md:text-lg">
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
                      <Link
                        href="/curriculum"
                        className="text-primary-500 hover:text-primary-400 !no-underline"
                      >
                        here
                      </Link>
                      . Details will be informed by results from{' '}
                      <Link
                        href="/survey"
                        className="text-primary-500 hover:text-primary-400 !no-underline"
                      >
                        survey
                      </Link>{' '}
                      & discussions with parents
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-4 font-medium whitespace-nowrap text-white sm:px-6">
                      Jul 2026
                    </td>
                    <td className="px-2 py-4 sm:px-6">Confirm location of academy and pricing</td>
                    <td className="px-2 py-4 sm:px-6">
                      Location likely D14/D16, but depends on cost, demand and available facilities.
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
          </div> */}
        </div>
      </div>
    </>
  )
}
