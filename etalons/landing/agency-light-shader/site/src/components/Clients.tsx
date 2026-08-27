import { SectionBadge } from './SectionBadge'

const PUBLISHED = [
  { name: 'Narrativ', line: 'Media — Site of the Month 2025', href: '#projects' },
  { name: 'Luminar', line: 'Product — platform rebuild', href: '#projects' },
]

const UNPUBLISHED = ['Helio', 'Northline', 'Vesper', 'Orbis']

export function Clients() {
  return (
    <section
      id="clients"
      className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge
          number="4"
          label="Who we work with"
          borderClassName="border-gray-300"
        />
        <h2 className="mb-10 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          Published work, and
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          names we keep off the wall.
        </h2>

        <div className="grid grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-12">
          <div>
            <p className="mb-5 text-[12px] font-medium tracking-wide text-gray-500">
              On this site
            </p>
            <ul>
              {PUBLISHED.map((client) => (
                <li key={client.name} className="border-t border-gray-300">
                  <a
                    href={client.href}
                    className="flex flex-col gap-1 py-5 transition-colors duration-300 hover:text-gray-500 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[28px] font-medium leading-[32px] tracking-[-0.03em] text-gray-900 sm:text-[32px] sm:leading-[36px]">
                      {client.name}
                    </span>
                    <span className="text-[13px] text-gray-600 sm:text-[14px]">
                      {client.line}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[12px] font-medium tracking-wide text-gray-500">
              Retainers under NDA
            </p>
            <p className="mb-6 max-w-[36ch] text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
              Four active desks we do not logo-stamp. Category work in consumer,
              finance and media — shown in the room, not in a ticker.
            </p>
            <p className="text-[18px] font-medium tracking-[-0.02em] text-gray-400 sm:text-[22px]">
              {UNPUBLISHED.join('  ·  ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
