import { TextRollButton } from './TextRollButton'
import { SectionBadge } from './SectionBadge'

const SERVICES = [
  {
    name: 'Brand platforms',
    detail: 'Sites that carry a category, not a campaign cycle.',
    span: '8–16 weeks',
  },
  {
    name: 'Product interfaces',
    detail: 'Flows, systems and UI for tools people use every week.',
    span: '10–20 weeks',
  },
  {
    name: 'Launch systems',
    detail: 'A digital surface plus the motion, 3D or film around it.',
    span: '6–12 weeks',
  },
  {
    name: 'Retainer',
    detail: 'A monthly desk for iteration after the first ship.',
    span: 'from 3 months',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge number="3" label="What we take on" />
        <h2 className="mb-10 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          Four ways of working.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          One studio.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12">
          <ul>
            {SERVICES.map((item) => (
              <li
                key={item.name}
                className="grid grid-cols-1 gap-1 border-t border-gray-200 py-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_auto] sm:items-baseline sm:gap-8 sm:py-7"
              >
                <h3 className="text-[18px] font-medium tracking-[-0.02em] text-gray-900 sm:text-[22px]">
                  {item.name}
                </h3>
                <p className="text-[14px] leading-[1.6] text-gray-600 sm:text-[15px]">
                  {item.detail}
                </p>
                <span className="text-[13px] text-gray-500 sm:text-right">
                  {item.span}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-8">
            <TextRollButton
              text="Book a strategy call"
              className="rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
              circleClassName="h-7 w-7 bg-white sm:h-8 sm:w-8"
              iconClassName="text-[#F26522]"
              iconSize={16}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
