/* eslint-disable react-hooks/exhaustive-deps */
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import TransactionDetailsModal from '@/components/transaction-details-modal'
import User from '@/components/user'
import { Roles } from '@/lib/roles'
import DashboardApi from '@/utils/api/dashboard-api'
import debounce from 'lodash.debounce'
import moment from 'moment'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const Issued = () => {
  const [loading, setLoading] = useState(true)
  const [issuedCards, setIssuedCard] = useState([])
  const [totalUsers, setTotalUsers] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Record<string, any>>({})
  const [searchValue, setSearchValue] = useState('')
  const [tableLoading, setTableLoading] = useState(false)

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const debounceSearch = useCallback(
    debounce(async (query) => {
      setTableLoading(true)
      try {
        const res = await DashboardApi.getCardsByStatus({
          status: 'issued',
          searchValue: query,
        })
        setIssuedCard(res.records)
      } catch (err) {
      } finally {
        setTableLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    debounceSearch(searchValue)
  }, [searchValue])

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Name',
      selector: (row: any) => row.nameOnCard,
      cell: (row: any) => <User user={row} />,
      width: '250px',
    },
    {
      name: 'Brand',
      selector: (row: any) => row?.brand,
      cell: (row: any) => <p className="capitalize">{row?.brand}</p>,
    },
    {
      name: 'Type',
      selector: (row: any) => row?.type,
      cell: (row: any) => <p className="capitalize">{row?.type}</p>,
    },
    {
      name: 'Request ID',
      selector: (row: any) => row?.requestId,
      cell: (row: any) => row?.requestId,
      width: '250px',
    },
    {
      name: 'Country',
      selector: (row: any) => row?.address.country,
      cell: (row: any) => <StatusPill status={row?.address.country} />,
    },
    {
      name: 'Status',
      selector: (row: any) => row.isActive,
      cell: (row: any) => (
        <StatusPill status={row.isActive ? 'active' : 'inactive'} />
      ),
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const issuedRes = await  DashboardApi.getCardsByStatus({ page: 1, status: 'issued' });
        setIssuedCard(issuedRes.records)
        setTotalUsers(issuedRes.total)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Issued Cards" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
          <div>
            <>
              <h1 className="text-2xl font-medium text-gray-600">
                {totalUsers}
              </h1>
              <p className="text-xs"> Total Issued Cards</p>
            </>
          </div>
          <TableSearch
            name="searchValue"
            value={searchValue}
            placeholder="Search for cards..."
            onChange={handleValueChange}
          />
        </div>
        <Table
          columns={columns}
          data={issuedCards}
          progressPending={tableLoading}
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

export default withRole(Issued, [Roles.SuperAdmin, Roles.Admin])

Issued.auth = true
