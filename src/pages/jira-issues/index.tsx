import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import DashboardApi from '@/utils/api/dashboard-api'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const JiraIssues = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const jiraIssuesRes = await DashboardApi.getJiraIssues()
        console.log('jiraIssuesRes', jiraIssuesRes)
        setEmployees(jiraIssuesRes)
      } catch (err) {
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Summary',
      cell: (row: any) => <p>{row?.summary}</p>,
      selector: (row: any) => row?.summary,
      minWidth: '350px',
    },
    {
      name: 'Issue ID',
      selector: (row: any) => row?.issueId,
    },
    {
      name: 'Status',
      selector: (row: any) => row?.status,
      cell: (row: any) => (
        <StatusPill status={row?.status == 'Done' ? 'done' : 'todo'} />
      ),
    },
  ]

  return (
    <Layout header="Jira Issues">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <Table columns={columns} data={employees} progressPending={isLoading} />
      </div>
    </Layout>
  )
}

export default JiraIssues

JiraIssues.auth = true
