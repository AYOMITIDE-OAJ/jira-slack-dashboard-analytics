import { Config } from '@/lib/config'
import axios from 'axios'

const DashboardMiscApi = {
  async getRates() {
    const {
      data: { data },
    } = await axios.get(`${Config.apiMiscUrl}/pairs`)

    return data
  },

  async updateRate({
    payload,
  }: {
    payload: { currencyPrice: number; controlConfig: string }
  }) {
    const {
      data: { data },
    } = await axios.post('/rates/usd', { payload })

    return data
  },
}

export default DashboardMiscApi
