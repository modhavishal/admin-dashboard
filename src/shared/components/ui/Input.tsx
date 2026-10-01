import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  trailingAdornment?: ReactNode
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', trailingAdornment, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="block text-sm">
        {label && (
          <label htmlFor={inputId} className="mb-1 block font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 ${trailingAdornment ? 'pr-11' : ''} ${className}`}
            {...props}
          />
          {trailingAdornment && (
            <span className="absolute inset-y-0 right-2 flex items-center">
              {trailingAdornment}
            </span>
          )}
        </div>
        {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
      </div>
    )
  },
)

export default Input