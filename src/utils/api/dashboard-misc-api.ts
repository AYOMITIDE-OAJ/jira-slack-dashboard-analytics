import { Config } from '@/lib/config'
import axios from 'axios'

const DashboardMiscApi = {
  async getRates() {
    const {
      data: { data },
    } = await axios.get(`${Config.apiMiscUrl}/pairs`)

    return data
  },

  async updateRate(
    rateId: string,
    payload: { buy_markup: string; sell_markup: string }
  ): Promise<any> {
    const {
      data: { data },
    } = await axios.post(`/pairs/${rateId}`, payload)

    return data
  },
}

export default DashboardMiscApi
