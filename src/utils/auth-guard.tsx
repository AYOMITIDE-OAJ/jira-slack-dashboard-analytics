import { Routes } from '@/constants/routes'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import AuthApi from './api/auth-api'
import Loader from '@/components/loader'

export default function AuthGuard({ children }: any) {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => router.push(Routes.Logout),
  })
  const user = !!session?.user

  const [loading, setLoading] = useState(true)

  const getSignOutRedirectUrl = useCallback(async () => {
    const newSession: any = await getSession()
    if (!newSession?.user?.user) {
      // await AuthApi.logout()
      return Routes.Login
    }
    return null
  }, [])

  useEffect(() => {
    ;(async () => {
      const url = await getSignOutRedirectUrl()

      if (url) {
        router.push(url)
      } else if (session) {
        setLoading(false)
      }
    })()
  }, [session, router, getSignOutRedirectUrl])

  if (user && !loading) {
    return children
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Loader />
    </div>
  )
}
