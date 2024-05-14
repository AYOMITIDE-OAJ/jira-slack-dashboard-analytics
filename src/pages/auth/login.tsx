import Button from '@/components/button'
import Input from '@/components/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-background px-5 md:px-24">
      <header className="py-6">
        <Image
          src="/assets/svg/palremit-logo.svg"
          alt="Palremit"
          height={150}
          width={150}
        />
      </header>
      <main className="mt-28 flex w-full justify-center md:mt-48">
        <form className="w-full md:w-[450px]" onSubmit={handleSubmit}>
          <h1 className="mb-6 text-xl font-bold text-primary">
            Login to Admin
          </h1>
          <div className="space-y-3">
            <Input
              name="email"
              label="Email"
              placeholder="admin@palremit.com"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              placeholder="*********"
              type="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 text-sm text-primary">
            <Link href={'/'}>Forgot Password?</Link>
          </div>
          <Button className="mt-10" type="submit">
            Login
          </Button>
        </form>
      </main>
    </div>
  )
}
