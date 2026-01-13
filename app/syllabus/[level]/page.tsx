import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'

export async function generateMetadata(props: { params: Promise<{ level: string }> }) {
  const params = await props.params
  const level = decodeURI(params.level)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
  return genPageMetadata({ title: level })
}

export default async function LevelPage(props: { params: Promise<{ level: string }> }) {
  const params = await props.params
  const levelTitle = decodeURI(params.level)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <>
      <div className="divide-y divide-gray-700">
        <PageHeader title={levelTitle} />
        <div className="py-12">
          <div className="prose prose-invert max-w-none pt-10 pb-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
