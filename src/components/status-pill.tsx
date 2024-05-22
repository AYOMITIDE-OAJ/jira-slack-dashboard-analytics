import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  status:
    | 'success'
    | 'successful'
    | 'active'
    | 'verified'
    | 'error'
    | 'failed'
    | 'inactive'
    | 'unverified'
    | 'pending'
    | 'processing'
  size?: 'xs' | 'sm' | 'base'
}

export default function StatusPill({ status, size = 'xs' }: Props) {
  const statuses: any = {
    success: 'bg-green-600/10 text-green-600',
    successful: 'bg-green-600/10 text-green-600',
    active: 'bg-green-600/10 text-green-600',
    verified: 'bg-green-600/10 text-green-600',
    credit: 'bg-green-600/10 text-green-600',
    error: 'bg-red-600/10 text-red-600',
    failed: 'bg-red-600/10 text-red-600',
    inactive: 'bg-red-600/10 text-red-600',
    unverified: 'bg-red-600/10 text-red-600',
    debit: 'bg-red-600/10 text-red-600',
    pending: 'bg-amber-600/10 text-amber-600',
    processing: 'bg-amber-600/10 text-amber-600',
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
