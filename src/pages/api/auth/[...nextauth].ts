import { Routes } from '@/constants/routes'
import { Config } from '@/lib/config'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface LoginCredentials {
  email: string
  password: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      // @ts-ignore
      credentials: undefined,
      name: 'Credentials',
      type: 'credentials',
      // @ts-ignore

      async authorize(credentials, req) {
        const email = String(credentials?.email)
        const password = String(credentials?.password)

        try {
          const res: any = await axios.post(`${Config.apiBaseUrl}/auth/login`, {
            email,
            password,
          })

          return res.data.data
        } catch (error: any) {
          throw new Error(
            error?.response?.data?.message ||
              error?.response?.data?.error ||
              error.message ||
              error
          )
        }
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken
        token.user = user
        // token.user = {...user, user: {...user.user, role: "crm"} }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.email = token.email
        session.user = token.user
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 2 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    maxAge: 2 * 60 * 60,
  },
  pages: {
    signIn: Routes.Login,
  },
}

export default NextAuth(authOptions)
