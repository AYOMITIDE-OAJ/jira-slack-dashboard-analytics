import '@/styles/globals.css'
import AuthGuard from '@/utils/auth-guard'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
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
