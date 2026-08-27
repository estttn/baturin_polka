import { ArrowRight } from 'lucide-react'

type TextRollButtonProps = {
  text: string
  className?: string
  circleClassName?: string
  iconClassName?: string
  iconSize?: number
}

const ease = 'duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]'

export function TextRollButton({
  text,
  className = '',
  circleClassName = 'h-6 w-6 bg-white',
  iconClassName = 'text-gray-900',
  iconSize = 14,
}: TextRollButtonProps) {
  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-2 font-medium ${className}`}
    >
      <span className="h-[20px] overflow-hidden">
        <span
          className={`flex flex-col transition-transform ${ease} group-hover:-translate-y-1/2`}
        >
          <span className="flex h-[20px] items-center">{text}</span>
          <span className="flex h-[20px] items-center" aria-hidden="true">
            {text}
          </span>
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full ${circleClassName}`}
      >
        <ArrowRight
          size={iconSize}
          className={`transition-transform ${ease} group-hover:-rotate-45 ${iconClassName}`}
        />
      </span>
    </button>
  )
}
