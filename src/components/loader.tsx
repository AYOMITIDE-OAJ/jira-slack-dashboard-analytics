import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className="flex h-[500px] w-full flex-1 items-center justify-center">
      <Image
        src="/assets/svg/palremit-logo.svg"
        alt="Loading"
        height={200}
        width={200}
        className="animate-pulse duration-100"
      />
    </div>
  )
}
