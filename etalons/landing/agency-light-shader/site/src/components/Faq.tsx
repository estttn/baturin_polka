import { useState } from 'react'
import { SectionBadge } from './SectionBadge'

const QUESTIONS = [
  {
    q: 'You say Q1 2026. Can we start sooner?',
    a: 'The current desk is closed through December. A strategy call still makes sense now — we use it to hold a slot, not to sell a package on the call.',
  },
  {
    q: 'What happens on a strategy call?',
    a: 'Thirty minutes. You bring the category problem and the constraint (time, stack, stakeholders). We say if it is a brand platform, a product, or not a fit. No deck.',
  },
  {
    q: 'Do you work with early-stage teams?',
    a: 'If the brand already has a category to dominate and a decision-maker in the room. We do not take pre-product experiments or “we need a presence”.',
  },
  {
    q: 'How do retainers work after launch?',
    a: 'A named designer and a monthly hours block. Same file, same system. We do not hand you a PDF and disappear.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionBadge number="5" label="Before you book" />
        <h2 className="mb-10 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-14 sm:px-8 lg:mb-16 lg:px-12">
          Direct answers.
        </h2>

        <div className="px-5 sm:px-8 lg:px-12">
          <div className="lg:grid lg:grid-cols-[26%_1fr] lg:gap-12">
            <p className="mb-8 max-w-[28ch] text-[15px] font-medium leading-[1.6] text-gray-600 lg:mb-0 lg:text-[16px] lg:leading-[1.65]">
              If it is not on this list, it belongs on the call.
            </p>
            <ul>
              {QUESTIONS.map((item, index) => {
                const isOpen = open === index
                return (
                  <li key={item.q} className="border-t border-gray-200">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-[16px] font-medium tracking-[-0.02em] text-gray-900 sm:text-[18px]">
                        {item.q}
                      </span>
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[20px] leading-none text-gray-900"
                        aria-hidden="true"
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[52ch] pb-6 text-[14px] leading-[1.65] text-gray-600 sm:text-[15px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
