import { useEffect, useState } from 'react'
import { Clock, Menu, X } from 'lucide-react'
import { HeroShader } from './HeroShader'
import { PartnerBadge } from './PartnerBadge'
import { TextRollButton } from './TextRollButton'
import { useLondonTime } from '../hooks/useLondonTime'

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Connect', href: '#connect' },
]

export function Hero() {
  const time = useLondonTime()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <section
      id="top"
      className="relative flex h-screen flex-col overflow-hidden bg-[#EFEFEF]"
    >
      <HeroShader />

      <nav className={`relative ${menuOpen ? 'z-[60]' : 'z-20'}`}>
        <div className="mx-auto max-w-[1440px] p-2 sm:p-3">
          <div className="flex items-center justify-between rounded-full bg-white p-[5px]">
            <div className="flex items-center gap-6">
              <a
                href="#top"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 sm:h-10 sm:w-10"
                aria-label="Axion Studio"
              >
                <span className="text-[10px] font-bold tracking-tight text-white sm:text-[11px]">
                  AX
                </span>
              </a>
              <div className="hidden items-center gap-6 md:flex">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden items-center gap-4 md:flex lg:gap-5">
              <span className="hidden text-[13px] text-gray-600 lg:inline">
                Taking on projects for Q1 2026
              </span>
              <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                <Clock size={14} aria-hidden="true" />
                <span>{time} in London</span>
              </div>
              <TextRollButton
                text="Book a strategy call"
                className="rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] text-white"
                circleClassName="h-6 w-6 bg-white"
                iconClassName="text-gray-900"
              />
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-gray-900 px-3.5 py-2 text-[13px] font-medium text-white md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close' : 'Menu'}
            >
              {menuOpen ? 'Close' : 'Menu'}
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 mx-3 mb-3 rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[13px] text-gray-600">
            <Clock size={14} aria-hidden="true" />
            <span>{time} in London</span>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[28px] font-medium leading-[32px] text-gray-900"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <TextRollButton
            text="Start a project"
            className="mt-8 w-full justify-between rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:text-[14px]"
            circleClassName="h-7 w-7 bg-white sm:h-8 sm:w-8"
            iconClassName="text-[#F26522]"
            iconSize={16}
          />
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col">
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
            Axion Studio
          </p>
          <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
            We craft digital experiences
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            for brands ready to dominate
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            their category online.
          </h1>
          <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5">
            <TextRollButton
              text="Start a project"
              className="w-fit rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
              circleClassName="h-7 w-7 bg-white sm:h-8 sm:w-8"
              iconClassName="text-[#F26522]"
              iconSize={16}
            />
            <PartnerBadge />
          </div>
        </div>
      </div>
    </section>
  )
}
