import { cn } from '@/lib/utils'
import React from 'react'

type ButtonVariants =
  | 'primary'
  | 'outline'
  | 'primary_outline'
  | 'danger'
  | 'success'
type ButtonSizes = 'sm' | 'md' | 'lg'

interface Props {
  children: any
  className?: string
  variant?: ButtonVariants
  onClick?: () => void
  loading?: boolean
  type?: 'submit' | 'button'
  size?: ButtonSizes
  disabled?: boolean
}

export default function Button({
  children,
  className,
  loading,
  disabled,
  variant = 'primary',
  size = 'lg',
  ...props
}: Props) {
  const variants = {
    primary:
      'bg-primary hover:bg-primary/90 text-white border border-primary disabled:bg-primary/60 disabled:border-primary/60',
    outline:
      'bg-transparent hover:bg-neutral-900 text-white/80 border border-white/80 disabled:bg-secondary',
    primary_outline:
      'bg-transparent hover:bg-neutral-900 text-lime-400 border border-lime-400 disabled:bg-secondary',
    danger:
      'bg-red-600 hover:bg-red-600/90 text-white border border-red-600 disabled:bg-red-600/60 disabled:border-red-600/60',
    success:
      'bg-green-600 hover:bg-green-600/90 text-white border border-green-600 disabled:bg-green-600/60 disabled:border-green-600/60',
  }[variant]

  const sizes = {
    sm: 'py-1 px-4 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-4 text-base',
  }[size]

  return (
    <button
      {...props}
      className={cn(
        variants,
        'w-full cursor-pointer rounded-full px-4 py-3 text-sm font-medium disabled:cursor-not-allowed',
        sizes,
        className
      )}
      disabled={disabled || loading}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}
