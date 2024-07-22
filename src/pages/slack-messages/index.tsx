import Button from '@/components/button'
import Layout from '@/components/layout'
import Table from '@/components/table'
import { useGlobalContext } from '@/context/AppContext'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const SlackMessages = () => {
  const [isLoading, setIsLoading] = useState(false)
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

  const triggerSyncSlackMessages = async () => {
    try {
      await DashboardApi.syncSlackMessages()
      handleGenericSuccess('Slack Messages Synced Successfully')
    } catch (error) {
      handleError(error)
    }
  }
  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.timestamp).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Message',
      cell: (row: any) => <p>{row?.message}</p>,
      selector: (row: any) => row?.message,
      minWidth: '350px',
    },
    {
      name: 'User ID',
      selector: (row: any) => row?.userId,
    },
  ]
  return (
    <Layout header="Slack Messages">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <aside className="m-4 flex justify-between">
          <div></div>
          <div onClick={() => triggerSyncSlackMessages()}>
            <Button rounded={false}>Sync Slack Messages</Button>
          </div>
        </aside>
        <Table
          columns={columns}
          data={slackMessages}
          progressPending={isLoading}
        />
      </div>
    </Layout>
  )
}

export default SlackMessages

SlackMessages.auth = true
