import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className="flex h-[500px] w-full flex-1 items-center justify-center">
      <Image
        src="/assets/svg/palremit-logo-icon.svg"
        alt="Loading"
        height={50}
        width={50}
        className="animate-pulse duration-100"
      />
    </div>
  )
}
