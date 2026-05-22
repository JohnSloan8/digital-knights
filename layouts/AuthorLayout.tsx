import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="items-start space-y-2 py-12 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
        <div className="flex flex-col items-center space-x-2">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={96}
              height={96}
              className="h-16 w-16 rounded-full xl:h-24 xl:w-24"
            />
          )}
          <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
          <div className="mb-4 text-center text-gray-400">{occupation}</div>
          <div className="text-center">
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-primary-500 hover:text-primary-400 hover:underline"
              >
                {email}
              </a>
            )}
          </div>
          <div className="text-gray-400">{company}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="x" href={twitter} />
            <SocialIcon kind="bluesky" href={bluesky} />
          </div>
        </div>
        <div className="prose prose-invert md:prose-lg max-w-none xl:col-span-2">{children}</div>
      </div>
    </>
  )
}
