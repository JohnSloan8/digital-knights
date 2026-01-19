import { allFaqs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'

export const metadata = genPageMetadata({ title: 'FAQ' })

export default function FaqPage() {
  const faq = allFaqs.find((p) => p.slug === 'faq/qanda') || allFaqs[0]

  if (!faq) {
    return <div>No FAQ found</div>
  }

  return (
    <div className="divide-y divide-gray-700">
      <PageHeader title={faq.title} description={faq.summary} />
      <div className="py-12">
        <div className="prose dark:prose-invert max-w-none">
          <MDXLayoutRenderer code={faq.body.code} />
        </div>
      </div>
    </div>
  )
}
