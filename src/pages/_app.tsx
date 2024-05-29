import '@/styles/globals.css'
import AuthGuard from '@/utils/auth-guard'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
      refetchInterval={500}
      refetchOnWindowFocus
    >
      <Head>
        <title>Palremit Admin Dashboard</title>
        <meta name="theme-color" content="#E6E7EB" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="description" content="Palremit Admin Dashboard" />
      </Head>
      {
        // @ts-ignore
        Component.auth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )
      }
      <ToastContainer theme="colored" />
    </SessionProvider>
  )
}
