import { Routes } from '@/constants/routes'
import AuthApi from '@/utils/api/auth-api'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface LoginCredentials {
  email: string
  password: string
  role: string[]
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
        const role = credentials?.role || ['']

        const res: any = await AuthApi.login({
          email,
          password,
          role,
        })

        if (res) {
          return res
        }

        return null
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
        token.user = {...user, user: {...user.user, role: "crm"} }
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

const authenticate = async ({ email, password, role }: LoginCredentials) => {
  const validEmail = 'admin@palremit.com'
  const validPassword = 'palremitadmin'

  if (email.trim() === validEmail && password.trim() === validPassword) {
    return {
      email,
      role,
      lastLogin: new Date(),
      accessToken: 'ejy.qdq31dqw09uwdawe129ejoaWJDaoijwj12e0odjaoiwdj12',
    }
  }
  return null
}
