import axios from 'axios'

const BASE_API_URL = process.env.API_BASE_URL
const TOKEN = process.env.API_KEY

export default function createAxiosInstance(multipart = false) {
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
    async function (config: any) {
      // Do something before request is sent
      config.headers!.authorization = `Bearer ${TOKEN}`

      return { ...config }
    },
    async function (error: any) {
      // Do something with request error
      return await Promise.reject(error)
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
