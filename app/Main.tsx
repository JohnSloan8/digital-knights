import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import ThreeScene from '@/components/ThreeScene'
import Quote from '@/components/Quote'
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
        <div className="py-6 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl space-y-8 px-4">
            <Quote>
              <p className="mb-6 text-lg font-light text-blue-100 italic md:text-xl">
                Starting digital media and literacy education at secondary level is simply too late
              </p>
              <footer className="text-right">
                <Link
                  href="https://www.cybersafekids.ie/report2025/"
                  className="text-primary-500 hover:text-primary-400 text-base not-italic !no-underline md:text-lg"
                >
                  CyberSafeKids 'Trends and Usage' (2025)
                </Link>
              </footer>
            </Quote>
            <Quote>
              <p className="mb-6 text-lg font-light text-blue-100 italic md:text-xl">
                We need to invest more in resources for digital education
              </p>
              <footer className="text-right">
                <Link
                  href="https://www.oco.ie/app/uploads/2025/09/OCO-Smartphone-Ban-Child-Friendly-Report.pdf"
                  className="text-primary-500 hover:text-primary-400 text-base not-italic !no-underline md:text-lg"
                >
                  Ombudsman for Children's Office 'One Size Does Not Fit All' (2025)
                </Link>
              </footer>
            </Quote>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="prose prose-invert w-full max-w-none md:text-lg">
            <p>
              Digital Knights is an independent educational initiative dedicated to preparing
              children in Ireland for entry into the digital world. It is founded on the premise
              that children should understand how technology and the internet work <i>before</i>{' '}
              they possess a mobile phone.
            </p>
            <p>
              Education is the strongest weapon against the dangers facing young people when first
              going online. A solid foundation in digital literacy can help them make informed
              decisions about how to engage with technology and the online world safely and
              responsibly. It also prepares them for a future where digital skills will be
              increasingly important.
            </p>
            <p>
              On this website, you will find a range of educational resources for both parents and
              children covering the topics of tech and cybersecurity. These resources aim to provide
              more technical depth than other similar materials available. If you, or your
              child(ren) are interested in understanding the 'how' and 'why' behind the advice,
              these resources are designed to help. Articles and guides for parents are published in
              plain language and are designed to be accessible to those with no prior technical
              knowledge. A structured{' '}
              <Link
                href="/curriculum"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                curriculum
              </Link>{' '}
              for 8-13 year olds is under development. Parents' input is being actively sought
              through a{' '}
              <Link
                href="/survey"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                survey
              </Link>{' '}
              and follow-up discussions.
            </p>

            <p>
              Digital Knights was created by{' '}
              <Link
                href="/about#about-me"
                className="text-primary-500 hover:text-primary-400 !no-underline"
              >
                Dr. John Sloan
              </Link>{' '}
              - a father, Trinity College Research Fellow and CISSP certified cybersecurity
              professional. It was inspired by his desire to prepare his own children for entry into
              the digital world, chats with other parents who share similar concerns, and calls from
              various national bodies for improved education in this area.
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
