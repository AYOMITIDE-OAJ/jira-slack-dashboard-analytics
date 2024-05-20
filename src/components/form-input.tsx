import { cn } from '@/lib/utils'
import { ChangeEvent } from 'react'

interface FormInputProps {
  name: string
  placeholder?: string
  value: string
  label: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
}

export default function FormInput({
  name,
  placeholder,
  value,
  label,
  type = 'text',
  onChange,
  disabled = false,
  className,
}: FormInputProps) {
  return (
    <div className="w-full space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          'w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-3 text-sm ring-0 focus:outline-none',
          className
        )}
      />
    </div>
  )
}
