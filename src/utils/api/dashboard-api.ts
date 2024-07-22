import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const DashboardApi = {
  async getDashBoardAnalytics() {
    const {
      data: { data },
    } = await axiosInstance.get('/jira-slack/analytic-patterns')

    return data
  },

  async getJiraIssues(): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/jira/issues`)

    return data
  },

  // currently defaulted to random channel because that's where I've my application install on the workspace
  async syncSlackMessages(channelName = 'random'): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/slack/fetch/${channelName}`)

    return data
  },

  async getSlackMessages(): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/slack/messages`)

    return data
  },

  async createSlackMessages(
    channelName: string = 'random', // currently defaulted to random to communicate with bot app
    message: string
  ): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/slack/messages/send`, {
      channelName,
      message,
    })

    return data
  },
}

export default DashboardApi
