// import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Routes } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { isCRM, isCustomRole, Roles } from '@/lib/roles'
import { PageLoader } from '@/components/loader'

// const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user
  const router = useRouter()

  useEffect(() => {
    if (
      isCustomRole(userSession.role, [
        Roles.SuperAdmin,
        Roles.Admin,
        Roles.Investor,
        Roles.Marketer,
      ])
    ) {
      router.push(Routes.Dashboard)
    } else if (isCRM(userSession.role)) {
      router.push(Routes.Users)
    } else {
      router.push(Routes.Settings)
    }
  }, [router, userSession])

  return <PageLoader />
}

export default Home

Home.auth = true
