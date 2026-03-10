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
              Digital Knights is an independent educational initiative dedicated to preparing
              children in Ireland for entry into the digital world.
            </p>
            <p>
              {' '}
              It offers a significantly more <strong>technical</strong> and{' '}
              <strong>privacy-focused</strong> approach to online safety than is currently available
              in other common resources (e.g. Webwise, CyberSafeKids, Comisiún ).
            </p>
            <p>
              A core driver of the project is the belief that children should have a solid
              understanding of how computers and the internet work <strong>before</strong> posessing
              an internet enabled device.
            </p>
            <p>
              This knowledge will help the 13-year-old who gets their first smartphone to make
              informed decisions about how to use it safely and responsibly.
            </p>
            <p>
              On this website, articles and guides for parents and ch on a range of tech and
              cybersecurity topics are published regularly on this website.
            </p>
            <p>
              A{' '}
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
              Digital Knights was founded by{' '}
              <Link
                href="/about#about-me"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                John Sloan
              </Link>{' '}
              - a father, Computer Science PhD, Trinity College lecturer and CISSP certified
              cybersecurity professional.
            </p>

            <p>
              Many thanks to the parents who have already contributed to this project through
              discussions and the survey - your input is invaluable!
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
