import axios from 'axios'
import { getSession } from 'next-auth/react'
import { handleError } from './notify'
import { Config } from '@/lib/config'

const BASE_API_URL = Config.apiBaseUrl

export default function createAxiosInstance(multipart = false) {
  let origin = ''
  if (typeof window !== 'undefined') {
    origin = window?.location?.origin
  }

  const instance = axios.create({
    headers: {
      'Content-Type': `${
        multipart ? 'multipart/form-data' : 'application/json'
      }`,
    },
    baseURL: BASE_API_URL,
    timeout: 60000,
  })

  instance.interceptors.request.use(
    async (request) => {
      const session: any = await getSession()

      if (session?.user?.token) {
        request.headers.Authorization = `Bearer ${session?.user?.token}`
      }
      return request
    },
    (error) => {
      handleError(error)
      Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response: any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    async function (error: any) {
      if (error.response.status !== 401) return await Promise.reject(error)
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      return await Promise.reject(error)
    }
  )

  return instance
}
