import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface Props {
  children: JSX.Element
  className?: string
}

export default function CardLayout({ children, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-4 hover:bg-neutral-50',
        className
      )}
    >
      {children}
    </div>
  )
}
