/* eslint-disable react-hooks/exhaustive-deps */
import CardDetailsModal from '@/components/card-modal'
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import User from '@/components/user'
import { Roles } from '@/lib/roles'
import DashboardApi from '@/utils/api/dashboard-api'
import debounce from 'lodash.debounce'
import moment from 'moment'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { CiCircleMore } from 'react-icons/ci'

const Pending = () => {
  const [loading, setLoading] = useState(true)
  const [pendingCards, setPendingCard] = useState([])
  const [totalUsers, setTotalUsers] = useState<number>()
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Record<string, any>>({})
  const [searchValue, setSearchValue] = useState('')
  const [tableLoading, setTableLoading] = useState(false)

  const handleRowClick = (row: any) => {
    setSelected(row)
    setIsOpen(true)
  }

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
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
      cell: (row: any) => <User user={row} disabled />,
      width: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
      minWidth: '300px',
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
      minWidth: '150px',
    },
    {
      name: 'Country',
      selector: (row: any) => row?.address.country,
      cell: (row: any) => <StatusPill status={row?.address.country} />,
    },
    {
      name: 'Status',
      selector: (row: any) => row?.status,
      cell: (row: any) => (
        <StatusPill
          status={row?.status == 'cardholder-failed' ? 'inactive' : 'active'}
        />
      ),
      minWidth: '150px',
    },
    {
      name: '',
      selector: (row: any) => row,
      cell: (row: any) => (
        <CiCircleMore
          className="text-gray-300"
          size={35}
          onClick={() => handleRowClick(row)}
        />
      ),
      width: '100px',
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const pendingRes = await DashboardApi.getCardsByStatus({
          page: 1,
          status: 'requests',
        })
        setPendingCard(pendingRes.records)
        console.log(pendingRes.records)
        setTotalUsers(pendingRes.total)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const debounceSearch = useCallback(
    debounce(async (query) => {
      setTableLoading(true)
      try {
        const res = await DashboardApi.getCardsByStatus({
          status: 'requests',
          searchValue: query,
        })
        setPendingCard(res.records)
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

  return (
    <Layout header="Card Requests" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
          <div>
            <>
              <h1 className="text-2xl font-medium text-gray-600">
                {totalUsers}
              </h1>
              <p className="text-xs"> Total Card Requests</p>
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
          data={pendingCards}
          progressPending={tableLoading}
        />
      </div>
      <CardDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} card={selected} />
    </Layout>
  )
}

export default withRole(Pending, [Roles.SuperAdmin, Roles.Admin, Roles.CRM])

Pending.auth = true
