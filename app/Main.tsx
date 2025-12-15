import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import ThreeScene from '@/components/ThreeScene'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div id="react-three-fibre-container">
        <ThreeScene className="fixed top-0 left-0 h-screen w-screen" />
        <div className="fixed bottom-0 left-0 z-20 w-full bg-gradient-to-t from-black/50 to-transparent pt-32 pb-10 text-center">
          <h1 className="pb-2 text-3xl leading-9 font-extrabold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Digital Knights
          </h1>
          <p className="text-xl leading-7 font-medium text-gray-300">
            Cybersecurity for kids, teens and parents
          </p>
        </div>
      </div>
    </>
  )
}
