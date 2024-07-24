import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import { useGlobalContext } from '@/context/AppContext'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const JiraIssues = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { jiraIssues, setJiraIssues } = useGlobalContext()

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const jiraIssuesRes = await DashboardApi.getJiraIssues()
        setJiraIssues(jiraIssuesRes)
      } catch (err) {
        handleError(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const priorityMapping: {
    [key: string]: 'low' | 'lowest' | 'medium' | 'high' | 'highest'
  } = {
    low: 'low',
    lowest: 'lowest',
    medium: 'medium',
    high: 'high',
    highest: 'highest',
  }

  const getPriorityStatus = (
    priorityName: string
  ): 'low' | 'lowest' | 'medium' | 'high' | 'highest' => {
    return priorityMapping[priorityName.toLowerCase()] || 'low'
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },

    {
      name: 'Issue ID',
      selector: (row: any) => row?.id,
    },
    {
      name: 'Assignee',
      cell: (row: any) => <p>{row?.assignee?.displayName}</p>,
      selector: (row: any) => row?.assignee?.displayName,
      minWidth: '200px',
    },
    {
      name: 'Priority',
      selector: (row: any) => row?.priority?.name,
      cell: (row: any) => (
        <StatusPill status={getPriorityStatus(row?.priority?.name)} />
      ),

      minWidth: '100px',
    },
    {
      name: 'Summary',
      cell: (row: any) => <p>{row?.summary}</p>,
      selector: (row: any) => row?.summary,
      minWidth: '350px',
    },
    {
      name: 'Status',
      selector: (row: any) => row?.status.name,
      cell: (row: any) => (
        <StatusPill status={row?.status.name == 'Closed' ? 'closed' : 'open'} />
      ),
    },
  ]

  return (
    <Layout header="Jira Issues">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <Table
          columns={columns}
          data={jiraIssues}
          progressPending={isLoading}
        />
      </div>
    </Layout>
  )
}

export default JiraIssues

JiraIssues.auth = true
