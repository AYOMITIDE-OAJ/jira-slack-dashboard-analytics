import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  status: 'success' | 'done' | 'verified' | 'todo'

  size?: 'xs' | 'sm' | 'base'
}

export default function StatusPill({ status, size = 'xs' }: Props) {
  const statuses: any = {
    success: 'bg-green-600/10 text-green-600',
    done: 'bg-green-600/10 text-green-600',
    verified: 'bg-green-600/10 text-green-600',
    todo: 'bg-red-600/10 text-red-600',
  }[status]

  const sizes: any = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  }[size]

  return (
    <div
      className={cn('w-max rounded-full px-3 py-1 capitalize', sizes, statuses)}
    >
      {status}
    </div>
  )
}
