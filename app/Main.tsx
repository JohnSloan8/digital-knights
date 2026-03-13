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
            <p>
              Digital Knights is an independent educational initiative dedicated to preparing
              children for entry into the digital world. It is based on the belief that education is
              more effective than bans. We should teach children how computers and the internet work{' '}
              <i>before</i> giving them an internet enabled device. This knowledge will help the
              13-year-old who gets their first smartphone to make informed decisions about how to
              use it safely and responsibly.
            </p>

            <p>
              This website offers a range of resources for parents and children on the topics of
              tech and cybersecurity. Articles, advice and guides are published regularly, and a
              structured{' '}
              <Link
                href="/curriculum"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                curriculum
              </Link>{' '}
              for 8-13 year olds is under development - parents' input is being actively sought
              through a{' '}
              <Link
                href="/survey"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                survey
              </Link>{' '}
              and discussions.
            </p>

            <p>
              Digital Knights was created by{' '}
              <Link
                href="/about#about-me"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                John Sloan
              </Link>{' '}
              - a father, Computer Science PhD, Trinity College Research Fellow and CISSP certified
              cybersecurity professional.
            </p>
          </div>

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
        </div>
      </div>
    </>
  )
}
