import { cn } from '@/lib/utils'
import moment from 'moment'
import React from 'react'

interface Props {
  data: any
  className?: string
}

export default function NotificationCardLayout({ data, className }: Props) {
  return (
    <div
      className={cn(
        'rounded-xl border-y-2 border-gray-200 bg-white p-4 hover:bg-neutral-50',
        className
      )}
    >
      <aside className="my-8 flex justify-between">
        <div>
          <h2 className="text-xl font-bold text-primary">{data.title}</h2>
        </div>
        <p className="text-sm">{moment(data.createdAt).format('LLL')}</p>
      </aside>
      <main>
        <p className="text-md">{data.message}</p>
      </main>
    </div>
  )
}
