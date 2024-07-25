import Button from '@/components/button'
import Layout from '@/components/layout'
import CreateSlackMessageModal from '@/components/slack-message-modal'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import { useGlobalContext } from '@/context/AppContext'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import debounce from 'lodash.debounce'
import moment from 'moment'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const SlackMessages = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const {
    slackMessages,
    setSlackMessages,
    totalSlackMessages,
    setTotalSlackMessages,
  } = useGlobalContext()

  const fetchSlackMessages = async (text?: string) => {
    try {
      const data = await DashboardApi.getSlackMessages(text)
      setSlackMessages(data)
      setTotalSlackMessages(data?.length)
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
        const res = await DashboardApi.getSlackMessages(query)
        setSlackMessages(res)
        setTotalSlackMessages(res?.length)
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
    fetchSlackMessages()
  }, [])

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(parseFloat(row?.ts)).format('LLL'),
      maxWidth: '200px',
    },
    {
      name: 'User ID',
      selector: (row: any) => row?.user,
      maxWidth: '150px',
    },
    {
      name: 'Message',
      cell: (row: any) => <p>{row?.text}</p>,
      selector: (row: any) => row?.text,
      minWidth: '300px',
    },
    {
      name: 'Channel ID',
      cell: (row: any) => <p>{row?.channel}</p>,
      selector: (row: any) => row?.channel,
      maxWidth: '150px',
    },
  ]

  return (
    <Layout header="Slack Messages">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
          <div>
            <>
              <div>
                <aside className="">
                  <h1 className="text-2xl font-medium text-gray-600">
                    {totalSlackMessages}
                  </h1>
                  <p className="text-xs"> Total Slack Messages</p>
                </aside>
              </div>
            </>
          </div>
          <TableSearch
            name="searchValue"
            value={searchTerm}
            placeholder="Search for Slack Messages..."
            onChange={handleValueChange}
          />
        </div>
        <Table
          columns={columns}
          data={slackMessages}
          progressPending={isLoading}
        />
      </div>
      <main className="my-5 flex justify-between">
        <div></div>
        <aside className="w-1/4">
          <Button onClick={() => setIsOpen(true)} rounded={false}>
            Create Slack Message
          </Button>
        </aside>
      </main>
      <CreateSlackMessageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Layout>
  )
}

export default SlackMessages

SlackMessages.auth = true
