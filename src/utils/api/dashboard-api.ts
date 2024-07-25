import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const DashboardApi = {
  async getDashBoardAnalytics() {
    const {
      data: { data },
    } = await axiosInstance.get('/jira-slack/analytic-patterns')

    return data
  },

  async getJiraIssues(summary?: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/jira/fetch-issues`, {
      params: summary ? { summary } : {},
    })

    return data
  },

  async getSlackMessages(text?: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/slack/fetch-messages`, {
      params: text ? { text } : {},
    })

    return data
  },

  async createSlackMessage(message: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/slack/messages/send`, {
      message,
      channelName: 'random',
    })

    return data
  },
}

export default DashboardApi
