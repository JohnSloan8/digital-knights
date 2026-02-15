/* eslint-disable jsx-a11y/anchor-has-content */
'use client'

import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement> & { noStyle?: boolean }

const InternalLink = ({ href, className, noStyle, ...rest }: CustomLinkProps) => {
  const searchParams = useSearchParams()
  const id = searchParams?.get('id')
  let finalHref = href.toString()
  if (id && !finalHref.includes('id=')) {
    finalHref = `${finalHref}${finalHref.includes('?') ? '&' : '?'}id=${id}`
  }
  const defaultClasses =
    'break-words text-blue-400 underline hover:cursor-pointer hover:text-blue-500'
  const finalClass = noStyle ? className || '' : `${defaultClasses} ${className || ''}`

  return <Link className={finalClass} href={finalHref} {...rest} />
}

const CustomLink = ({ href, className, noStyle, ...rest }: CustomLinkProps) => {
  const isInternalLink = href && typeof href === 'string' && href.startsWith('/')
  const isAnchorLink = href && typeof href === 'string' && href.startsWith('#')

  const defaultClasses =
    'break-words text-blue-400 underline hover:cursor-pointer hover:text-blue-500'
  const combinedClassName = noStyle ? className || '' : `${defaultClasses} ${className || ''}`

  if (isInternalLink) {
    return (
      <Suspense fallback={<Link className={combinedClassName} href={href} {...rest} />}>
        <InternalLink href={href} className={className} noStyle={noStyle} {...rest} />
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
