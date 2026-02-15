import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-gradient-to-b from-black/75 to-transparent justify-between py-4 md:py-8'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  } else {
    headerClass += ' relative z-50'
  }

  return (
    <header className={headerClass}>
      <div className="flex w-full items-center justify-between px-4 sm:px-6 xl:px-8">
        <Link href="/" aria-label={siteMetadata.headerTitle} noStyle>
          <div className="flex items-center justify-between">
            <div className="mr-3 origin-left translate-y-[0px]">
              <Logo />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-7 text-lg font-semibold text-white sm:block md:h-8 md:text-2xl">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
        <div className="flex items-center space-x-1 leading-2 sm:space-x-1 md:space-x-2">
          <div className="no-scrollbar hidden max-w-full items-center gap-x-2 overflow-x-auto sm:flex md:gap-x-2">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-400 m-1 text-sm font-medium text-white md:text-base"
                  noStyle
                >
                  {link.title}
                </Link>
              ))}
          </div>
          {/* <SearchButton /> */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
