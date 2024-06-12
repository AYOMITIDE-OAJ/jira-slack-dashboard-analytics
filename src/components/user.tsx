import { Routes } from '@/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  nameOnCard?: string
  
}

interface Props {
  user: User
  disabled?: boolean
}

export default function User({ user, disabled = false }: Props) {
  const router = useRouter()

  const viewUser = () => {
    !disabled && router.push(`${Routes.User}?id=${user?._id}`)
  }

  return (
    <div className="flex items-center space-x-2 text-sm" onClick={viewUser}>
      <div className="border-200 relative h-8 w-8 overflow-hidden rounded-full border border-neutral-200">
        <Image src="/assets/images/avatar.png" alt="Profile" fill />
      </div>
      <p className="">
        {user?.firstName} {user?.lastName} {user.nameOnCard}
      </p>
    </div>
  )
}
