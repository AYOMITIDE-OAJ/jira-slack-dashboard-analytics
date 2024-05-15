import Loader from '@/components/loader'
import { Routes } from '@/constants/routes'
import AuthApi from '@/utils/api/auth-api'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        await AuthApi.logout()
      } catch (err) {
        // console.error(err);
      } finally {
        router.push(Routes.Login)
      }
    })()
  }, [router])

  return (
    <main className="flex h-full w-full items-center justify-center">
      <Loader />
    </main>
  )
}
