import { Clock } from 'lucide-react'
import { TextRollButton } from './TextRollButton'
import { useLondonTime } from '../hooks/useLondonTime'

const LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Journal', href: '#journal' },
]

export function Footer() {
  const time = useLondonTime()

  return (
    <footer id="connect" className="bg-[#EFEFEF] pb-8 pt-16 sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 border-b border-gray-300 pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <a
              href="#top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900"
              aria-label="Axion Studio"
            >
              <span className="text-[11px] font-bold tracking-tight text-white">
                AX
              </span>
            </a>
            <p className="mt-6 max-w-[22ch] text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
              Book the next desk.
            </p>
            <p className="mt-4 text-[13px] text-gray-600">
              Taking on projects for Q1 2026
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-16">
            <nav className="flex flex-col gap-3" aria-label="Footer">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div>
              <div className="mb-4 flex items-center gap-1.5 text-[13px] text-gray-600">
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
          </div>
        </div>

        <div
          id="journal"
          className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[13px] text-gray-500">
            Journal — next note in Q1 2026. No archive yet.
          </p>
          <p className="text-[13px] text-gray-500">
            Axion Studio, London · © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
