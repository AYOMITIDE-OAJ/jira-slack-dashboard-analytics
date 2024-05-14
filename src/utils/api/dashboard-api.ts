import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const DashboardApi = {
  async getDashBoardOverview() {
    const {
      data: { data },
    } = await axiosInstance.get('/overview')

    return data
  },

  async getAllTransactions({
    page = 1,
    limit = 100,
    type,
  }: {
    page?: number
    limit?: number
    type?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/transactions?page=${page}&limit=${limit}${type && `&filters[type]=${type}`}`
    )

    return data
  },

  async getAllUsers({
    page = 1,
    limit = 100,
    search,
  }: {
    page?: number
    limit?: number
    search?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/users?page=${page}&limit=${limit}${search && `&search=${search}`}`
    )

    return data
  },

  async getUsersKyc({ userId }: { userId?: string }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/kyc?${userId && `userId=${userId}`}`)

    return data
  },
}

export default DashboardApi
