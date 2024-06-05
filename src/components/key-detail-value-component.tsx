import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const KeyDetailValueComponent = ({
  name,
  value,
  size = 'base',
  onClick,
}: {
  name: string
  value: string | number | ReactNode
  size?: 'sm' | 'base'
  onClick?: () => void
}) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
  }[size]

  return (
    <main
      className={cn(
        'items-left flex w-full flex-col justify-between space-x-6 rounded-lg bg-gray-100 px-3 py-4 text-neutral-600',
        sizes
      )}
    >
      <div>
        <p className="mb-2 w-max font-semibold text-primary">{name}</p>
        <div onClick={onClick} className={cn(onClick && 'cursor-pointer ')}>
          <p className="capitalize">{value}</p>
        </div>
      </div>
    </main>
  )
}

export default KeyDetailValueComponent
