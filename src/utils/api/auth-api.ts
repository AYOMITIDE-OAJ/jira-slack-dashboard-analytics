import { signOut } from 'next-auth/react'
import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const AuthApi = {
  // async login() {
  // }

  async logout() {
    await signOut({ redirect: false })
  },
}

export default AuthApi
