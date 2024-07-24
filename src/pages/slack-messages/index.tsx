import CreateSlackMessageModal from '@/components/create-slack-message-modal'
import Layout from '@/components/layout'
import Table from '@/components/table'
import { useGlobalContext } from '@/context/AppContext'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const SlackMessages = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { slackMessages, setSlackMessages } = useGlobalContext()

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      try {
        const slackMessagesRes = await DashboardApi.getSlackMessages()
        setSlackMessages(slackMessagesRes)
      } catch (err) {
        handleError(err)
      } finally {
        setIsLoading(false)
      }
    })()
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
        <aside className="m-4 flex justify-between">
          <div></div>
        </aside>
        <Table
          columns={columns}
          data={slackMessages}
          progressPending={isLoading}
        />
      </div>
      <CreateSlackMessageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Layout>
  )
}

export default SlackMessages

SlackMessages.auth = true
