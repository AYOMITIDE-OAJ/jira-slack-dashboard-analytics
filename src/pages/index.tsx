// import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Routes } from '@/constants/routes'
import { PageLoader } from '@/components/loader'

// const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(Routes.Dashboard)
  }, [router])

  return <PageLoader />
}

export default Home

Home.auth = true
