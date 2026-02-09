'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useState } from 'react'

export default function Footer() {
  const [showCookiePopup, setShowCookiePopup] = useState(false)

  return (
    <footer>
      {showCookiePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="border-primary-500 relative w-full max-w-sm rounded-lg border bg-gray-900 p-6 shadow-xl">
            <h3 className="mb-2 text-xl font-bold text-white">Cookies Policy</h3>
            <p className="mb-6 text-gray-300">Cookies are not used on this site.</p>
            <button
              onClick={() => setShowCookiePopup(false)}
              className="bg-primary-600 hover:bg-primary-700 w-full rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500">
          <div>{`© ${siteMetadata.title} ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link
            href="/privacy"
            className="!cursor-pointer !text-gray-500 !no-underline hover:!text-gray-400"
          >
            Privacy Policy
          </Link>
          <div>{` • `}</div>
          <button
            onClick={() => setShowCookiePopup(true)}
            className="cursor-pointer text-gray-500 hover:text-gray-400"
          >
            Cookies
          </button>
          <div>{` • `}</div>
          <Link
            href="/contact"
            className="!cursor-pointer !text-gray-500 !no-underline hover:!text-gray-400"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
