import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TransactionDetailsModal from '@/components/transaction-details-modal'
import User from '@/components/user'
import { Roles } from '@/lib/roles'
import DashboardApi from '@/utils/api/dashboard-api'
import { formatCurrency } from '@/utils/helper'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const Pending = () => {
  const [loading, setLoading] = useState(true)
  const [pendingCards, setPendingCard] = useState([])
  const [totalUsers, setTotalUsers] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Record<string, any>>({})

  const handleRowClick = (row: any) => {
    setSelected(row)
    setIsOpen(true)
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Name',
      selector: (row: any) => row,
      cell: (row: any) => <User user={row} />,
      width: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
      width: '200px',
    },
    {
      name: 'Type',
      selector: (row: any) => row?.type,
      cell: (row: any) => <p className="capitalize">{row?.type}</p>,
    },
    {
      name: 'Brand',
      selector: (row: any) => row?.brand,
      cell: (row: any) => <p className="capitalize">{row?.brand}</p>,
    },
    {
      name: 'Country',
      selector: (row: any) => row?.address.country,
      cell: (row: any) => <StatusPill status={row?.address.country} />,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => <StatusPill status={row.status} />,
      width: '150px',
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const [pendingRes] = await Promise.all([
          DashboardApi.getCardsByStatus({ page: 1, status: 'requests' }),
        ])
        setPendingCard(pendingRes.records)
        setTotalUsers(pendingRes.total)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Card Requests" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
          <>
            <h1 className="text-2xl font-medium text-gray-600">{totalUsers}</h1>
            <p className="text-xs">Total Card Requests</p>
          </>
        </div>
        <Table
          columns={columns}
          data={pendingCards}
          onRowClicked={handleRowClick}
        />
      </div>
      <TransactionDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        transaction={selected}
      />
    </Layout>
  )
}

export default withRole(Pending, [Roles.SuperAdmin, Roles.Admin])

Pending.auth = true
