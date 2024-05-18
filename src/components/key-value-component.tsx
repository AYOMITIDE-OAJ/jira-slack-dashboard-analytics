import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const KeyValueComponent = ({
  name,
  value,
  onClick,
}: {
  name: string
  value: string | number | ReactNode
  onClick?: () => void
}) => {
  return (
    <div className="flex w-full items-center justify-between space-x-3 px-2 py-3 text-base text-neutral-600">
      <div>
        <p className="w-max">{name}</p>
      </div>
      <div onClick={onClick} className={cn(onClick && 'cursor-pointer')}>
        <div className="text-right capitalize">{value}</div>
      </div>
    </div>
  )
}

export default KeyValueComponent
