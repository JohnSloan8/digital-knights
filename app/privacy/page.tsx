import siteMetadata from '@/data/siteMetadata'

export default function PrivacyPolicy() {
  return (
    <div className="divide-y divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Privacy Policy
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
        <div className="flex flex-col items-center pt-8">
          <p className="text-gray-400">Last updated: February 9, 2026</p>
        </div>
        <div className="prose prose-invert md:prose-lg max-w-none pt-8 pb-8 xl:col-span-2">
          <h2>Introduction</h2>
          <p>How data is handled when visiting this website is explained in this Privacy Policy.</p>

          <h2>Cookies</h2>
          <p>
            <strong>Cookies are not used on this site.</strong>
          </p>
          <p>
            Your behavior on this site is not tracked across the internet, data is not sold to
            advertisers, and no invasive tracking technologies are used.
          </p>

          <h2>Local Storage</h2>
          <p>
            <strong>Local Storage is not used on this site.</strong>
          </p>
          <p>No data is stored on the device.</p>

          <h2>Analytics</h2>
          <p>
            A privacy-focused analytics tool (Umami) is used to understand general website usage
            trends, e.g. how many site visits per day. Traffic is measured <strong>without</strong>{' '}
            collecting personal data, IP addresses, or cookies. All data is aggregated and
            anonymized.
          </p>

          <h2>Contact Us</h2>
          <p>
            If there are any questions about this Privacy Policy, please contact{' '}
            <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
