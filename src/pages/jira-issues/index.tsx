import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import { useGlobalContext } from '@/context/AppContext'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import debounce from 'lodash.debounce'
import moment from 'moment'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const JiraIssues = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { jiraIssues, setJiraIssues, totalJiraIssues, setTotalJiraIssues } = useGlobalContext()

  const fetchIssues = async (summary?: string) => {
    try {
      const data = await DashboardApi.getJiraIssues(summary)
      setJiraIssues(data)
      setTotalJiraIssues(data?.length)
    } catch (error) {
      handleError(error)
    }
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const debounceSearch = useCallback(
    debounce(async (query) => {
      setIsLoading(true)
      try {
        const res = await DashboardApi.getJiraIssues(query)
        setJiraIssues(res)
      } catch (err) {
      } finally {
        setIsLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    debounceSearch(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    fetchIssues()
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
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
          <div>
            <>
              <h1 className="text-2xl font-medium text-gray-600">
                {totalJiraIssues}
              </h1>
              <p className="text-xs"> Total Jira Issues</p>
            </>
          </div>
          <TableSearch
            name="searchValue"
            value={searchTerm}
            placeholder="Search for Jira Issue..."
            onChange={handleValueChange}
          />
        </div>
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
