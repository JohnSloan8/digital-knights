'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function FaqSubmissionForm() {
  const [question, setQuestion] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setStatus('submitting')

    const { error } = await supabase.from('faq').insert([{ question }])

    if (error) {
      console.error('Error submitting question:', error)
      setStatus('error')
    } else {
      setQuestion('')
      setStatus('success')
    }
  }

  return (
    <div className="mt-16 border-t border-gray-700 pt-10">
      <h3 className="mb-4 text-2xl leading-9 font-bold tracking-tight text-white">
        Have a question not listed here?
      </h3>
      <p className="mb-4 text-gray-400">All suggested questions are submitted anonymously.</p>

      {status === 'success' ? (
        <div className="rounded-md bg-green-900/30 p-4">
          <p className="text-sm font-medium text-green-200">
            Thank you! Your question has been submitted anonymously.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-2 text-sm font-medium text-green-400 underline hover:text-green-300"
          >
            Submit another question
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="sr-only">
              Your Question
            </label>
            <textarea
              id="question"
              name="question"
              rows={4}
              className="focus:ring-primary-500 block w-full rounded-md border-0 bg-gray-800 py-1.5 text-gray-100 shadow-sm ring-1 ring-gray-700 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-400">
              There was an error submitting your question. Please try again.
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit Question'}
          </button>
        </form>
      )}
    </div>
  )
}
