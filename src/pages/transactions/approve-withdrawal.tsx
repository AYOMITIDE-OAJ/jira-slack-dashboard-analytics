import Button from '@/components/button'
import KeyValueComponent from '@/components/key-value-component'
import Layout from '@/components/layout'
import Modal from '@/components/modal'
import withRole from '@/components/page-components/with-role'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import User from '@/components/user'
import { Roles } from '@/lib/roles'
import DashboardApi from '@/utils/api/dashboard-api'
import { formatCurrency } from '@/utils/helper'
import {
  handleError,
  handleGenericInfo,
  handleGenericSuccess,
} from '@/utils/notify'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { HiOutlineUserCircle } from 'react-icons/hi'

const ApproveWithdrawal = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [withdrawals, setWithdrawals] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>()
  const [requestLoading, setRequestLoading] = useState(false)

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
    },
    {
      name: 'Name',
      selector: (row: any) => row?.owner,
      cell: (row: any) => <User user={row.owner} />,
      width: '250px',
    },
    {
      name: 'Reference',
      selector: (row: any) => row?.reference,
      width: '300px',
    },
    {
      name: 'Currency',
      selector: (row: any) => row?.currency,
      cell: (row: any) => <p>{row?.currency}</p>,
    },
    {
      name: 'Amount',
      selector: (row: any) => row?.amount,
      cell: (row: any) => formatCurrency(row?.amount),
    },
    {
      name: 'Type',
      selector: (row: any) => row?.type,
      cell: (row: any) => <p className="capitalize">{row?.type}</p>,
    },
    {
      name: 'Status',
      selector: (row: any) => row?.approvalStatus,
      cell: (row: any) => <StatusPill status={row?.approvalStatus} />,
    },
  ]

  const viewTransaction = (transaction: any) => {
    setSelectedWithdrawal(transaction)
    setModalIsOpen(true)
  }

  const approveWithdrawal = async (withdrawalId: string) => {
    setRequestLoading(true)
    try {
      await DashboardApi.approveWithdrawal(withdrawalId)
      setModalIsOpen(false)
      handleGenericSuccess('Withdrawal approved')
      router.reload()
    } catch (e: any) {
      handleError(e)
    } finally {
      setRequestLoading(false)
    }
  }

  const declineWithdrawal = async (withdrawalId: string) => {
    setRequestLoading(true)
    try {
      await DashboardApi.declineWithdrawal(withdrawalId)
      setModalIsOpen(false)
      handleGenericInfo('Withdrawal Declined')
      router.reload()
    } catch (e: any) {
      handleError(e)
    } finally {
      setRequestLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await DashboardApi.getWithdrawalsRequiringApproval()
        setWithdrawals(res)
      } catch (e: any) {
        handleError(e)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Approve Withdrawal" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
          <h1 className="text-base font-medium text-gray-600">
            Withdrawal Requests
          </h1>
        </div>
        <Table
          columns={columns}
          data={withdrawals}
          onRowClicked={viewTransaction}
        />
      </div>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
        <div className="divide-y divide-neutral-200 rounded-lg bg-white">
          <div className="flex items-center space-x-4 pb-3 md:pb-6">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-neutral-200">
              <Image src="/assets/images/avatar.png" alt="Profile" fill />
            </div>
            <div className="space-y">
              <p className="text-xl font-semibold text-primary">
                {selectedWithdrawal?.owner?.firstName}{' '}
                {selectedWithdrawal?.owner?.lastName}
              </p>
              <p className="text-sm font-light">
                {selectedWithdrawal?.owner?.email}
              </p>
            </div>
          </div>
          <div className="py-3 md:py-6">
            <KeyValueComponent
              name="Amount"
              value={formatCurrency(selectedWithdrawal?.amount)}
            />
            <KeyValueComponent
              name="Currency"
              value={selectedWithdrawal?.currency}
            />
            <KeyValueComponent
              name="Date"
              value={moment(selectedWithdrawal?.createdAt).format('LLL')}
            />
            <KeyValueComponent
              name="Reference"
              value={selectedWithdrawal?.reference}
            />
            <KeyValueComponent name="Type" value={selectedWithdrawal?.type} />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3 md:pt-6">
            <Button
              variant="danger"
              loading={requestLoading}
              onClick={() => declineWithdrawal(selectedWithdrawal._id)}
              rounded={false}
            >
              Decline
            </Button>
            <Button
              variant="success"
              loading={requestLoading}
              onClick={() => approveWithdrawal(selectedWithdrawal._id)}
              rounded={false}
            >
              Approve
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  )
}

export default withRole(ApproveWithdrawal, [Roles.SuperAdmin])

ApproveWithdrawal.auth = true
