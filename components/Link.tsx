/* eslint-disable jsx-a11y/anchor-has-content */
'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const InternalLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const searchParams = useSearchParams()
  const id = searchParams?.get('id')
  let finalHref = href.toString()
  if (id && !finalHref.includes('id=')) {
    finalHref = `${finalHref}${finalHref.includes('?') ? '&' : '?'}id=${id}`
  }
  return <Link className="break-words" href={finalHref} {...rest} />
}

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && typeof href === 'string' && href.startsWith('/')
  const isAnchorLink = href && typeof href === 'string' && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Suspense fallback={<Link className="break-words" href={href} {...rest} />}>
        <InternalLink href={href} {...rest} />
      </Suspense>
    )
  }

  if (isAnchorLink) {
    return <a className="break-words" href={href} {...rest} />
  }

  return (
    <a className="break-words" target="_blank" rel="noopener noreferrer" href={href} {...rest} />
  )
}

export default CustomLink
