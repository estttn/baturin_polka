type SectionBadgeProps = {
  number: string
  label: string
  borderClassName?: string
}

export function SectionBadge({
  number,
  label,
  borderClassName = 'border-gray-200',
}: SectionBadgeProps) {
  return (
    <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white sm:h-7 sm:w-7 sm:text-[12px]">
        {number}
      </span>
      <span
        className={`rounded-full border px-3 py-1 text-[12px] font-medium text-gray-900 sm:px-4 sm:py-1.5 sm:text-[13px] ${borderClassName}`}
      >
        {label}
      </span>
    </div>
  )
}
