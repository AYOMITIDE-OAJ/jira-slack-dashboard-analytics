import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const FeeManagementApi = {
  async getRates({ page }: { page?: number }) {
    const {
      data: { data },
    } = await axiosInstance.get(`/rates?page=${page}`)

    return data
  },

  async setRates({
    payload,
  }: {
    payload: { currencyPrice: number; controlConfig: string }
  }) {
    const {
      data: { data },
    } = await axiosInstance.post('/rates/usd', { payload })

    return data
  },
}

export default FeeManagementApi
