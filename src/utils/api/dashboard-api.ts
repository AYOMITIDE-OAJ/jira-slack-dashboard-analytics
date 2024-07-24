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
    } = await axiosInstance.get(`/jira/fetch-issues`)

    return data
  },

  async getSlackMessages(): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/slack/fetch-messages`)

    return data
  },
}

export default DashboardApi
