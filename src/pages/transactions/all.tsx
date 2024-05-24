import Layout from '@/components/layout'
import Modal from '@/components/modal'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TransactionDetailsModal from '@/components/transaction-details-modal'
import DashboardApi from '@/utils/api/dashboard-api'
import { formatCurrency } from '@/utils/helper'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { HiOutlineUserCircle } from 'react-icons/hi'

const Deposit = () => {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
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
      selector: (row: any) => row?.owner,
      cell: (row: any) => (
        <div className="flex items-center space-x-2 text-sm">
          <div className="border-200 h-8 w-8 overflow-hidden rounded-full">
            <HiOutlineUserCircle className="text-neutral-400" size={32} />
          </div>
          <p className="">
            {row?.owner?.firstName} {row?.owner?.lastName}
          </p>
        </div>
      ),
      width: '250px',
    },
    {
      name: 'Reference',
      selector: (row: any) => row?.reference,
      width: '300px',
    },
    {
      name: 'Currency',
      selector: (row: any) => row?.sourceCurrency,
      cell: (row: any) => <p>{row?.sourceCurrency}</p>,
    },
    {
      name: 'Amount',
      selector: (row: any) => row?.sourceAmount,
      cell: (row: any) => formatCurrency(row?.sourceAmount),
    },
    {
      name: 'Type',
      selector: (row: any) => row?.direction,
      cell: (row: any) => <StatusPill status={row?.direction} />,
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
        const [transactionsRes] = await Promise.all([
          DashboardApi.getAllTransactions({ page: 1 }),
        ])
        setTransactions(transactionsRes.records)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Transactions" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
          <h1 className="text-base font-medium text-gray-600">Deposit</h1>
        </div>
        <Table
          columns={columns}
          data={transactions}
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

export default Deposit

Deposit.auth = true
