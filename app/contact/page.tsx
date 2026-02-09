'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import PageHeader from '@/components/PageHeader'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setShowThankYou(true)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const { error } = await supabase.from('contact_requests').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ])

      if (error) throw error

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="divide-y divide-gray-700">
        <PageHeader
          title="Contact"
          description="Get in touch about classes, curriculum, or general questions."
        />
        <div className="py-12">
          {status === 'success' ? (
            <div className="relative flex min-h-[200px] items-center justify-center text-center">
              <div
                className={`absolute transition-opacity duration-1000 ${
                  showThankYou ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <h3 className="flex items-baseline justify-center text-2xl font-bold text-white">
                  Sending message
                  <span className="ml-2 animate-pulse text-4xl" style={{ animationDelay: '0ms' }}>
                    .
                  </span>
                  <span className="ml-2 animate-pulse text-4xl" style={{ animationDelay: '200ms' }}>
                    .
                  </span>
                  <span className="ml-2 animate-pulse text-4xl" style={{ animationDelay: '400ms' }}>
                    .
                  </span>
                </h3>
              </div>

              <div
                className={`transition-opacity duration-1000 ${
                  showThankYou ? 'opacity-100 delay-1000' : 'opacity-0'
                }`}
              >
                <h3 className="mb-4 text-2xl font-bold text-white">Message sent!</h3>
                <p className="text-lg text-gray-400">
                  Thank you for your message. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    setShowThankYou(false)
                  }}
                  className="mt-8 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-gray-800 p-4 sm:p-8">
              <h2 className="mt-0 mb-6 text-center text-2xl leading-8 font-bold tracking-tight text-gray-100">
                Send a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-10">
                <div>
                  <label htmlFor="name" className="mb-2 block text-base font-medium text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-base font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-base font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-base text-white placeholder-gray-400"
                    placeholder="How can we help?"
                  />
                </div>

                {status === 'error' && (
                  <div className="rounded-lg border border-red-800 bg-red-900/50 p-4 text-center text-red-200">
                    <p className="font-medium">Error sending message</p>
                    <p className="text-sm opacity-80">Please try again later.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-primary-800 hover:bg-primary-900 focus:ring-primary-600 w-full cursor-pointer rounded-md px-5 py-2.5 text-base font-medium text-white ring-offset-black focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
