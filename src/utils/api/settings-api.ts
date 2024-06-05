import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const SettingsApi = {
  async changePassword({
    payload,
  }: {
    payload: { firstName: string; lastName: string; password: string }
  }) {
    const {
      data: { data },
    } = await axiosInstance.post('', { payload })

    return data
  },

  async addAdmin({ payload }: { payload: { email: string; role: string } }) {
    const {
      data: { data },
    } = await axiosInstance.post('', { payload })

    return data
  },
}

export default SettingsApi
