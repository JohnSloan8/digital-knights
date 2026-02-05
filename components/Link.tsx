/* eslint-disable jsx-a11y/anchor-has-content */
'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const InternalLink = ({
  href,
  className,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const searchParams = useSearchParams()
  const id = searchParams?.get('id')
  let finalHref = href.toString()
  if (id && !finalHref.includes('id=')) {
    finalHref = `${finalHref}${finalHref.includes('?') ? '&' : '?'}id=${id}`
  }
  return (
    <Link
      className={`break-words text-blue-400 underline hover:cursor-pointer hover:text-blue-500 ${className || ''}`}
      href={finalHref}
      {...rest}
    />
  )
}

const CustomLink = ({
  href,
  className,
  ...rest
}: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && typeof href === 'string' && href.startsWith('/')
  const isAnchorLink = href && typeof href === 'string' && href.startsWith('#')

  const combinedClassName = `break-words text-blue-400 underline hover:cursor-pointer hover:text-blue-500 ${className || ''}`

  if (isInternalLink) {
    return (
      <Suspense fallback={<Link className={combinedClassName} href={href} {...rest} />}>
        <InternalLink href={href} className={className} {...rest} />
      </Suspense>
    )
  }

  if (isAnchorLink) {
    return <a className={combinedClassName} href={href} {...rest} />
  }

  return (
    <a
      className={combinedClassName}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  )
}

export default CustomLink
