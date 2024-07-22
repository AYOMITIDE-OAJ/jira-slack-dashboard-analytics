import CardLayout from '@/components/card-layout'
import ChartComponent from '@/components/chart-component'
import Layout from '@/components/layout'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [patterns, setPatterns] = useState([])
  const [issueMentionData, setIssueMentionData] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const jiraSlackAnalytics = await DashboardApi.getDashBoardAnalytics()
        setPatterns(jiraSlackAnalytics.patterns)
        setIssueMentionData(jiraSlackAnalytics.issueMentionData)
      } catch (err) {
        handleError(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Analytics Dashboard" loading={loading}>
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-y-4 xl:grid-cols-4 xl:gap-x-4">
          <CardLayout className="py-5">
            <ChartComponent
              issueMentionData={issueMentionData}
              patterns={patterns}
            />
          </CardLayout>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

Dashboard.auth = true
