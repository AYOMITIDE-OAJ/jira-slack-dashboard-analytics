import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  status:
    | 'success'
    | 'successful'
    | 'error'
    | 'failed'
    | 'pending'
    | 'processing'
}

export default function StatusPill({ status }: Props) {
  const statuses: any = {
    success: 'bg-green-600/10 text-green-600',
    successful: 'bg-green-600/10 text-green-600',
    error: 'bg-red-600/10 text-red-600',
    failed: 'bg-red-600/10 text-red-600',
    pending: 'bg-amber-600/10 text-amber-600',
    processing: 'bg-amber-600/10 text-amber-600',
  }

  return (
    <div
      className={cn(
        'rounded-full px-3 py-1 text-xs capitalize',
        statuses[status]
      )}
    >
      {status}
    </div>
  )
}
