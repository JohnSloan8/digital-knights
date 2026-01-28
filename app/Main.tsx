import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import ThreeScene from '@/components/ThreeScene'
import headerNavLinks from '@/data/headerNavLinks'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const descriptions = {
    Blog: 'Articles and updates about cybersecurity and education.',
    Survey: 'Help us improve by taking our brief survey.',
    FAQ: 'Answers to common questions about our programs.',
    Curriculum: 'Explore our 5-level structured learning path.',
    Waitlist: 'Sign up to be notified when spots open.',
    About: 'Our mission, vision, and the team behind Digital Knights.',
  }

  return (
    <>
      <div id="react-three-fibre-container">
        <ThreeScene className="absolute top-0 left-0 h-screen w-full" />
      </div>
      <div className="relative z-10 mx-auto mt-[100vh] w-full">
        <div className="divide-y divide-gray-700">
          <div className="pt-6 pb-8">
            <p className="text-lg leading-7 text-gray-300">
              Digital Knights is a comprehensive cybersecurity education platform designed for kids,
              teens, and parents. Our mission is to transform beginners into digital guardians
              through a structured curriculum that covers computational thinking, programming, and
              advanced security concepts. Join us to build a safer digital future.
            </p>
          </div>
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <div key={link.title} className="py-8">
                <div className="flex flex-col space-y-2">
                  <Link
                    href={link.href}
                    className="text-primary-500 hover:text-primary-400 text-xl font-bold"
                  >
                    {link.title}
                  </Link>
                  <p className="text-gray-400">{descriptions[link.title] || 'Learn more'}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
