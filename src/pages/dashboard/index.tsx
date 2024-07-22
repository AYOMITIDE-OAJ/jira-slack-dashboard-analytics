import CardLayout from '@/components/card-layout'
import ChartComponent from '@/components/chart-component'
import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import DashboardApi from '@/utils/api/dashboard-api'
import { formatCurrency } from '@/utils/helper'
import { handleError } from '@/utils/notify'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [patterns, setPatterns] = useState([])
  const [issueMentionData, setIssueMentionData] = useState([])

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Name',
      cell: (row: any) => <p>{row?.owner}</p>,
      selector: (row: any) => row?.owner,
      width: '250px',
    },
    {
      name: 'Reference',
      selector: (row: any) => row?.reference,
      width: '300px',
    },
    {
      name: 'Amount',
      selector: (row: any) => row?.sourceAmount,
      cell: (row: any) => (
        <p className="capitalize">
          {row?.sourceCurrency} {formatCurrency(row?.sourceAmount)}
        </p>
      ),
    },
    {
      name: 'Type',
      selector: (row: any) => row?.type,
      cell: (row: any) => <p>{row?.type}</p>,
    },
    {
      name: 'Direction',
      selector: (row: any) => row?.direction,
      cell: (row: any) => <p className="capitalize">{row?.direction}</p>,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => <StatusPill status={row.status} />,
    },
  ]

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
            <ChartComponent data={issueMentionData} />
          </CardLayout>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

Dashboard.auth = true
