import { useSession } from 'next-auth/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../../input'
import Button from '../../button'
import Image from 'next/image'

export default function Profile() {
  const { data: session } = useSession()
  const user = (session?.user as any)?.user
  const [formData, setFormData] = useState({
    firstName: user?.name.split(' ')[0],
    lastName: user?.name.split(' ')[1],
    email: user?.email,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-[600px] w-full p-4 md:w-[600px] md:p-8">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center space-x-5">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-neutral-200 md:h-24 md:w-24">
                <Image
                  src="/assets/images/user-avatar.png"
                  alt="Profile"
                  fill
                />
              </div>
              <div>
                <p className="text-lg font-normal text-gray-600">
                  Profile Image
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <Input
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                label="First Name"
                onChange={handleChange}
                variant="dark"
                disabled
              />
              <Input
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange}
                variant="dark"
                disabled
              />
            </div>
            <Input
              name="email"
              value={formData.email}
              placeholder="example@example.com"
              label="Email Address"
              onChange={handleChange}
              variant="dark"
              disabled
            />
          </div>
          <Button className="mt-7 w-full md:w-max md:px-8" rounded={false}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
