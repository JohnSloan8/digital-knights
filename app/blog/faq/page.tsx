import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'FAQ' })

const faqs = [
  {
    question: 'Why is cybersecurity important for kids and teens?',
    answer:
      'Cybersecurity helps protect young people from online threats like scams, cyberbullying, and identity theft. Learning safe habits early builds lifelong digital resilience.',
  },
  {
    question: 'What are the most common online risks for children?',
    answer:
      'Common risks include exposure to inappropriate content, cyberbullying, online predators, phishing scams, and privacy breaches from oversharing personal information.',
  },
  {
    question: 'How can I teach kids to create strong passwords?',
    answer:
      'Encourage using long, unique passwords with a mix of letters, numbers, and symbols. Teach them not to reuse passwords and to use a password manager if possible.',
  },
  {
    question: 'What should I do if my child encounters cyberbullying?',
    answer:
      'Listen and support your child. Save evidence, block the bully, and report the incident to the platform. Teach kids not to respond and to seek help from trusted adults.',
  },
  {
    question: 'How can parents help kids stay safe on social media?',
    answer:
      'Set privacy settings, discuss what’s safe to share, and monitor activity. Encourage open communication about online experiences and teach kids to recognize suspicious behavior.',
  },
  {
    question: 'Are there tools to help monitor online activity?',
    answer:
      'Yes, parental controls, safe search filters, and monitoring apps can help. However, open dialogue and trust are just as important as technical solutions.',
  },
  {
    question: 'How do I talk to teens about online privacy?',
    answer:
      'Explain how personal data can be misused. Discuss the importance of controlling who sees their posts, using privacy settings, and thinking before sharing information.',
  },
  {
    question: 'What resources can I use to teach cybersecurity?',
    answer:
      'Use interactive games, online courses, and resources from organizations like CyberPatriot, Common Sense Media, and government sites. Hands-on activities make learning fun and memorable.',
  },
  {
    question: 'How often should I review online safety with my family?',
    answer:
      'Regularly—technology and threats change quickly. Set aside time each month to review safety tips, update passwords, and discuss new apps or websites.',
  },
]

export default function FAQPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            FAQs
          </h1>
        </div>
        <ul className="pt-4 md:pt-6">
          {faqs.map((faq, idx) => (
            <li key={idx} className="py-4 md:py-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                {faq.question}
              </h2>
              <p className="text-base text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
