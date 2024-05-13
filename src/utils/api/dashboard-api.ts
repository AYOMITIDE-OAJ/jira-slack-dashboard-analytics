import createAxiosInstance from '../axios'

export const axiosInstance = createAxiosInstance()

const getDashBoardOverview = async () => {
  const {
    data: { data },
  } = await axiosInstance.get('/overview')

  return data
}

const DashboardApi = {
  getDashBoardOverview,
}

export default DashboardApi
