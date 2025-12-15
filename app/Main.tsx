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
      </div>
    </>
  )
}
