'use client'

import React, { useState } from 'react'

interface MatrixRadioProps {
  question: string
  options: string[]
  rows: string[]
  name: string
}

const MatrixRadio = ({ question, options, rows, name }: MatrixRadioProps) => {
  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{question}</h3>
      <table className="min-w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question \ Option
            </th>
            {options.map((option, idx) => (
              <th key={idx} scope="col" className="px-6 py-3 text-center">
                {option}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row}</td>
              {options.map((option, optIdx) => (
                <td key={optIdx} className="px-6 py-4 text-center">
                  <input
                    type="radio"
                    name={`${name}-${rowIdx}`}
                    value={option}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface MatrixSliderProps {
  question: string
  rows: string[]
  name: string
  suffix?: string
}

const MatrixSlider = ({ question, rows, name, suffix = '%' }: MatrixSliderProps) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{question}</h3>
      <div className="space-y-6">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">{row}</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                name={`${name}-${idx}`}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
              <span className="w-12 text-sm text-gray-500 dark:text-gray-400">50{suffix}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CheckboxesProps {
  question: string
  options: string[]
  name: string
}

const Checkboxes = ({ question, options, name }: CheckboxesProps) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{question}</h3>
      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={idx} className="flex items-center">
            <input
              id={`${name}-${idx}`}
              type="checkbox"
              value={option}
              name={name}
              className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
            />
            <label
              htmlFor={`${name}-${idx}`}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MatrixRatingProps {
  question: string
  rows: string[]
  name: string
  scale?: number
}

const MatrixRating = ({ question, rows, name, scale = 10 }: MatrixRatingProps) => {
  const scaleArr = Array.from({ length: scale }, (_, i) => i + 1)
  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{question}</h3>
      <table className="min-w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Question \ Rating
            </th>
            {scaleArr.map((s) => (
              <th key={s} scope="col" className="px-2 py-3 text-center">
                {s}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row}</td>
              {scaleArr.map((s) => (
                <td key={s} className="px-2 py-4 text-center">
                  <input
                    type="radio"
                    name={`${name}-${rowIdx}`}
                    value={s}
                    className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ChildrenTable = () => {
  const [rows, setRows] = useState([1, 2, 3, 4, 5])

  return (
    <div className="mb-8 overflow-x-auto">
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Input the age of each child, gender, and whether they currently possess their own
        smartphone.
      </h3>
      <table className="min-w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">Age</th>
            <th className="px-6 py-3">Gender</th>
            <th className="px-6 py-3">Has Own Smartphone?</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <td className="px-6 py-4">{r}</td>
              <td className="px-6 py-4">
                <input
                  type="number"
                  className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                />
              </td>
              <td className="px-6 py-4">
                <select className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400">
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </td>
              <td className="px-6 py-4 text-center">
                <input
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 h-4 w-4 rounded border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SurveyForm() {
  return (
    <form className="space-y-12">
      {/* SECTION 1 */}
      <div>
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Section 1: Competency
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          The following pages contain questions relating to your: Technical ability, Attitude to
          cybersecurity, and Cybersecurity practices.
          <br />
          Why are these questions being asked? A parent's competency in technology and cybersecurity
          may exert a strong influence on how their children interact online.
        </p>

        <MatrixRadio
          name="tech_knowledge"
          question="Question 1/3: Your own technical knowledge. Select how strongly you agree or disagree with the following statements about your technical knowledge."
          options={[
            'Strongly Disagree',
            'Disagree',
            'Neither Agree nor Disagree',
            'Agree',
            'Strongly Agree',
          ]}
          rows={[
            'I am confident when using a computer.',
            'I am confident that I can manage settings and permissions for apps on my smartphone.',
            "I can usually fix technical issues by myself, e.g. wifi stops working, headphones won't connect etc.",
            'I enjoy troubleshooting technical problems.',
            'I can easily manage settings on my home router, e.g. log in to the admin panel, change the wifi password, set up a guest network etc.',
          ]}
        />

        <MatrixRadio
          name="privacy_attitude"
          question="Question 2/3: Attitude to cybersecurity. Select how strongly you agree or disagree with the following statements on privacy and cybersecurity."
          options={[
            'Strongly Disagree',
            'Disagree',
            'Neither Agree nor Disagree',
            'Agree',
            'Strongly Agree',
          ]}
          rows={[
            'I feel confident in my ability to identify and avoid common cybersecurity threats, such as phishing emails or malicious websites',
            'I make a conscious effort to protect my privacy online.',
            'I share photos/videos of myself online',
            'I actively change the default privacy settings on my devices and social media accounts to limit what information is shared.',
            'I believe the convenience of personalized features (like location tracking or tailored recommendations) is worth the loss of some personal privacy.',
            'I trust that tech companies are genuine in their efforts to protect my personal data.',
            'I trust that current laws and government regulations are sufficient to protect my personal data from being misused by companies.',
          ]}
        />

        <Checkboxes
          name="tools_usage"
          question="Question 3/3: Cybersecurity Practices. Select all of the following privacy and cybersecurity tools that you currently use."
          options={[
            'VPN',
            'Private Email',
            'Ad and Tracker Blocker',
            'Password Manager',
            'Email Aliases',
            'Private DNS',
            'Encrypted Messaging',
            'Private Search Engine',
            'Privacy Enhanced Browser',
            'None of the Above',
          ]}
        />
      </div>

      {/* SECTION 2 */}
      <div>
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Section 2: Awareness
        </h2>

        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          *Figures in Question 1 are based on data from the &apos;Cybersafekids Trends and Usage
          Report Academic Year 2024-2025&apos;. Actual figures from the survey will be shown on the
          following page. A link to the Cybersafekids website is provided later in this section.
        </p>

        <MatrixSlider
          name="trends_8_12"
          question="Question 1/4: Current tech trends for 8-12 year olds. Estimate the percentage of 8-12 year olds in Ireland who..."
          rows={[
            'have their own smart device',
            'have accounts on 13+ social media/messaging apps',
            'have experienced cyberbullying',
            'have talked to a parent about online safety in the past year',
            'have engaged with people they have never met on apps/games',
            'have used AI chatbots',
            'have shared images or videos of themselves online',
          ]}
        />

        <div className="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 className="font-semibold text-blue-800 dark:text-blue-100">
            Answer 1/4: Current tech trends for 8-12 year olds
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            Actual figures from the survey will be shown on the report page.
          </p>
        </div>

        <MatrixSlider
          name="trends_12_15"
          question="Question 2/4: Current tech trends for 12-15 year olds. Estimate the percentage of 12-15 year olds in Ireland who..."
          rows={[
            'have their own smart device',
            'have accounts on 13+ social media/messaging apps',
            'have experienced cyberbullying',
            'have talked to a parent about online safety in the past year',
            'have engaged with people they have never met on apps/games',
            'have used AI chatbots',
            'have shared images or videos of themselves online',
          ]}
        />

        <div className="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 className="font-semibold text-blue-800 dark:text-blue-100">
            Answer 2/4: Current tech trends for 12-15 year olds
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            Actual figures from the survey will be shown on the report page.
          </p>
        </div>

        <Checkboxes
          name="privacy_violations"
          question="Question 3/4: Privacy violations relating to children. Below is a list of fines imposed on tech firms for privacy violations specifically relating to children. Please check those that you are aware of."
          options={[
            "Epic Games/Fortnite (2022): Unauthorised collection of children's data - $520 million",
            "Meta/Instagram (2022): Children's accounts default to public - €405 million",
            "TikTok (2023): Unauthorised access to children's accounts - €345 million",
            "Google/YouTube (2019 & 2025): Repeated, unauthorised collection of children's data for targetted ads - $170 Million & $30 million",
            "Amazon/Alexa (2023): - Recording and not deleting children's voices - $25 Million",
            "Microsoft/Xbox (2023): - Unauthorised collection and retention of children's data - $20 Million",
            'None of the above',
          ]}
        />

        <Checkboxes
          name="edu_resources"
          question="Question 4/4: Available Educational Resources. Below is a list of resources for educating children in Ireland on online safety and cybersecurity. Please check those that you are familiar with."
          options={[
            'CyberSafeKids',
            'TUSLA - Online Safety',
            'Webwise',
            'National Parents Council - Internet Safety Training',
            'ISPCC - Digital Ready Hub',
            'Comisiún na Meán - Keeping Safe Online',
            'None of the above',
          ]}
        />
      </div>

      {/* SECTION 3 */}
      <div>
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Section 3: Concerns
        </h2>

        <MatrixRating
          name="safety_concerns"
          question="Question 1/3: Online safety concerns for children. Rank the following concerns you have for your own child/children from 1 - Not concerned at all, to 10 - Extremely concerned."
          rows={[
            'Cyberbullying',
            'Phone/Internet/Gaming addiction',
            'Organisations tracking activity (browsing behaviour, location etc.)',
            'Access to unsuitable/harmful content',
            'Negative mental health impact, e.g. body image, masculinity',
            'Online predators and grooming',
            'Digital Footprint, e.g. all online actions stored permanently.',
            'Recommender algorithms pushing extreme/polarising content.',
            'Financial risks, e.g. in-app purchases.',
            'Sexting or Image based abuse',
            'Relationships with AI chatbots.',
          ]}
        />

        <MatrixRadio
          name="tech_attitude"
          question="Question 2/3: Attitude to child/children's use of technology. Select how strongly you agree or disagree with the following statements on children's use of phones/internet"
          options={[
            'Strongly Disagree',
            'Disagree',
            'Neither Agree nor Disagree',
            'Agree',
            'Strongly Agree',
          ]}
          rows={[
            'Social media should be banned for users under a certain age',
            'Mobile phones should be banned for users under a certain age',
            'Age verification should be introduced to all social media platforms',
            "I am happy for my child/children's browsing data to be tracked and used to provide them with a 'personalised' experience.",
            'A Google/Apple account is necessary for using an ordinary Android/Apple device - I am happy for my child to sign up to either service when they get their own phone.',
            "I am happy for my child/children's to share their photos/videos online",
            'I am happy for the photos/videos my child/children take to be stored in the cloud.',
          ]}
        />

        <MatrixRadio
          name="controls"
          question="Question 3/3: Cybersecurity controls you use/intend to use for your child/children. Which of the following services/controls for aiding with child smartphone safety do you currently use, or intend to use."
          options={['Do not/Will not use', 'Unsure', 'Use/Will use', "Don't know"]}
          rows={[
            'Real time location tracking',
            "Remote lock (instantly lock the device from the parent's phone)",
            'Content Filters (restrict/allow certain sites/apps)',
            'Screen time scheduler',
            'Call and message monitoring (see call logs and read all messages)',
          ]}
        />
      </div>

      {/* SECTION 4 */}
      <div>
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Section 4: Education
        </h2>

        <MatrixRadio
          name="expert_opinions"
          question="Question 1/3: Opinions of experts and children. Select how strongly you agree or disagree with the following statements."
          options={[
            'Strongly Disagree',
            'Disagree',
            'Neither Agree nor Disagree',
            'Agree',
            'Strongly Agree',
          ]}
          rows={[
            'Mobile phones should be banned at schools - Minister for Education Norma Foley (2024) [1]',
            "Blanket bans for phones in schools is not in the best interest of children - Ombudsman for Children's Office (OCO) (2025) [2]",
            'Starting digital media and literacy education at secondary level is simply too late - CyberSafeKids Trends and Usage Report (2025) [3]',
            'We need to Invest more in resources for digital education - OCO Youth Advisory Panel (2025) [4]',
            "Parents should be the ones to introduce their children to the internet - Webwise A Parent's Guide to a Better Internet [5]",
          ]}
        />

        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="mb-1 font-semibold">References:</p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              <a
                href="https://www.rte.ie/news/education/2024/0821/1466075-schools-mobile-phones/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                RTE: Schools mobile phones (2024)
              </a>
            </li>
            <li>
              <a
                href="https://www.rte.ie/news/ireland/2025/0910/1532761-phone-bans-ireland/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                RTE: Phone bans Ireland (2025)
              </a>
            </li>
            <li>
              <a
                href="https://www.cybersafekids.ie/report2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                CyberSafeKids Report (2025)
              </a>
            </li>
            <li>
              <a
                href="https://www.oco.ie/app/uploads/2025/09/OCO-Smartphone-Ban-Child-Friendly-Report.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                OCO Smartphone Ban Child Friendly Report (2025)
              </a>
            </li>
            <li>
              <a
                href="https://www.webwise.ie/parents/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Webwise: Parents Guide
              </a>
            </li>
          </ol>
        </div>

        <MatrixRadio
          name="skills_importance"
          question="Question 2/3: Aspirations for your own child/children's education. How important are the following skills for your child to learn?"
          options={[
            'Not at all important',
            'Not important',
            'Neutral',
            'Important',
            'Very important',
          ]}
          rows={[
            'Scam & phishing recognition',
            'Computational thinking & creativity, e.g. how to solve problems using technology',
            'Coding e.g. learning a programming language like Python, Javascript',
            'How to minimise their online digital footprint, e.g. browse the internet/use apps without being tracked',
            'How to store and backup personal photos/videos/documents independently, i.e. not with large tech companies',
            'Cryptography, e.g. logic behind passwords & encryption',
          ]}
        />

        <MatrixRadio
          name="edu_opinion"
          question="Question 3/3: Your opinion on your child/children's tech & cybersecurity education. Select how strongly you agree or disagree with the following statements on online safety and tech education."
          options={[
            'Strongly Disagree',
            'Disagree',
            'Neither Agree nor Disagree',
            'Agree',
            'Strongly Agree',
          ]}
          rows={[
            'I am confident I can personally teach my child/children how to stay safe online.',
            'I am confident that my child/children (will) receive sufficient education in school to keep them safe online.',
            'I am confident that the technical education my child/children (will) receive at school is sufficient for the world they will enter as adults.',
          ]}
        />
      </div>

      {/* SECTION 5 */}
      <div>
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-700 dark:text-white">
          Section 5: Basic Demographics
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              What is your role?
            </label>
            <select
              id="role"
              className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            >
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="children-count"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              How many children do you have?
            </label>
            <select
              id="children-count"
              className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>
        </div>

        <ChildrenTable />
      </div>

      {/* FINAL */}
      <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Finally</h3>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          Thank you for completing the survey! Your responses will be a great help in informing the
          development of a new tech and cybersecurity curriculum.
          <br className="mb-2" />
          If you are interested in a more comprehensive tech and cybersecurity education for your
          own child/children, or would like to further discuss the issues in this survey, please
          leave your email in the box below.
        </p>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="comments"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Any further comments or questions:
          </label>
          <textarea
            id="comments"
            rows={4}
            className="focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none sm:w-auto"
        >
          Submit Survey
        </button>
      </div>
    </form>
  )
}
