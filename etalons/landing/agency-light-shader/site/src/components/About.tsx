import { TextRollButton } from './TextRollButton'

const SMALL_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'

const LARGE_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

export function About() {
  return (
    <section id="studio" className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
            1
          </span>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Introducing Axion
          </span>
        </div>

        <h2 className="mb-12 px-5 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 sm:px-8 lg:mb-28 lg:px-12">
          Strategy-led creatives, delivering
          <br />
          results in digital and beyond.
        </h2>

        <div className="px-5 lg:hidden sm:px-8">
          <p className="text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
            Through research, creative thinking and iteration we help growing
            brands realize their digital full potential.
          </p>
          <TextRollButton
            text="About our studio"
            className="mt-6 rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
            circleClassName="h-7 w-7 bg-white sm:h-8 sm:w-8"
            iconClassName="text-[#F26522]"
            iconSize={16}
          />
          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-5">
            <img
              src={SMALL_IMAGE}
              alt="Axion Studio workspace"
              className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
            />
            <img
              src={LARGE_IMAGE}
              alt="Axion Studio collaboration"
              className="aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
            />
          </div>
        </div>

        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-5 lg:grid xl:gap-8 lg:px-12">
          <div className="self-end">
            <img
              src={SMALL_IMAGE}
              alt="Axion Studio workspace"
              className="aspect-[438/346] w-full rounded-2xl object-cover"
            />
          </div>
          <div className="flex justify-end self-start">
            <div>
              <p className="whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">
                Through research, creative
                <br />
                thinking and iteration we help
                <br />
                growing brands realize their
                <br />
                digital full potential.
              </p>
              <TextRollButton
                text="About our studio"
                className="mt-6 rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] text-white hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
                circleClassName="h-7 w-7 bg-white sm:h-8 sm:w-8"
                iconClassName="text-[#F26522]"
                iconSize={16}
              />
            </div>
          </div>
          <div className="self-end">
            <img
              src={LARGE_IMAGE}
              alt="Axion Studio collaboration"
              className="aspect-[3/2] w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
