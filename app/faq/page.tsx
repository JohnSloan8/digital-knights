import { allFaqs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { genPageMetadata } from 'app/seo'
import PageHeader from '@/components/PageHeader'
import FaqSubmissionForm from '@/components/FaqSubmissionForm'
import QuestionScene from '@/components/QuestionScene'

export const metadata = genPageMetadata({ title: 'FAQ' })

const components = {
  h3: ({ children }) => <h3 className="mb-2 text-lg font-semibold text-white">{children}</h3>,
  p: ({ children }) => <p className="mb-8 text-base text-gray-400">{children}</p>,
}

export default function FaqPage() {
  const faq = allFaqs.find((p) => p.slug === 'faq/qanda') || allFaqs[0]

  if (!faq) {
    return <div>No FAQ found</div>
  }

  return (
    <div className="divide-y divide-gray-700">
      <PageHeader title={faq.title} description={faq.summary} />
      <div className="py-12">
        <div className="max-w-none">
          <QuestionScene className="relative mb-8 h-[300px] w-full md:float-right md:mb-4 md:ml-8 md:h-[500px] md:w-1/2" />
          <MDXLayoutRenderer code={faq.body.code} components={components} />
        </div>
        <FaqSubmissionForm />
      </div>
    </div>
  )
}
