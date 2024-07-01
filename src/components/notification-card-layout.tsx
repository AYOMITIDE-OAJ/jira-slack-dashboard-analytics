import { cn } from '@/lib/utils'
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
          <p>{data.userType}</p>
        </div>
        <p className="text-sm">{data.time}</p>
      </aside>
      <main>
        <p className="text-md">{data.message}</p>
      </main>
    </div>
  )
}
