import { signOut } from 'next-auth/react'
import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const AuthApi = {
  async login(payload: { email: string; password: string; role: any }) {
    const {
      data: { data },
    } = await axiosInstance.post('/auth/login', payload)

    return data
  },

  async logout() {
    await signOut({ redirect: false })
  },
}

export default AuthApi
