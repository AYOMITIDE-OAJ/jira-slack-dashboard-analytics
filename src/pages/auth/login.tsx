import Button from '@/components/button'
import Input from '@/components/input'
import { Routes } from '@/constants/routes'
import { handleError } from '@/utils/notify'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    try {
      const credentials = {
        email: String(data.email),
        password: String(data.password),
      }

      const res = await signIn('credentials', {
        redirect: false,
        ...credentials,
      })

      if (res?.error) {
        if (res.error !== 'SessionRequired')
          handleError(res?.error || 'Invalid credentials')
      }

      if (res?.ok) {
        router.push(Routes.Home)
      }
      setLoading(false)
    } finally {
      setLoading(false)
    }
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
          <Button
            className="mt-10"
            type="submit"
            loading={loading}
            disabled={!(data.email && data.password)}
          >
            Login
          </Button>
        </form>
      </main>
    </div>
  )
}
