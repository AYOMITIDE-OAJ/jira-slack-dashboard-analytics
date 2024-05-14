import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import DashboardApi from '@/utils/api/dashboard-api'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { HiOutlineUserCircle } from 'react-icons/hi'

export default function Users() {
  const [users, setUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState<number>()
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [tableLoading, setTableLoading] = useState(false)

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Name',
      selector: (row: any) => row,
      cell: (row: any) => (
        <div className="flex items-center space-x-2 text-sm">
          <div className="border-200 h-8 w-8 overflow-hidden rounded-full">
            <HiOutlineUserCircle className="text-neutral-400" size={32} />
          </div>
          <p className="">
            {row?.firstName} {row?.lastName}
          </p>
        </div>
      ),
      width: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
      cell: (row: any) => row?.email,
    },
    {
      name: 'Country',
      selector: (row: any) => row?.country,
      cell: (row: any) => row?.country,
    },
    {
      name: 'Status',
      selector: (row: any) => row.isActive,
      cell: (row: any) => (
        <StatusPill status={row.isActive ? 'active' : 'inactive'} />
      ),
    },
    {
      name: 'Verification',
      selector: (row: any) => row?.isVerified,
      cell: (row: any) => (
        <StatusPill status={row?.isVerified ? 'verified' : 'unverified'} />
      ),
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const [usersRes] = await Promise.all([
          DashboardApi.getAllUsers({ page: 1, limit: 100 }),
        ])
        setUsers(usersRes.records)
        setTotalUsers(usersRes.total)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setTableLoading(true)
      try {
        const res = await DashboardApi.getAllUsers({ search: searchValue })
        setUsers(res.records)
      } catch (err) {
      } finally {
        setTableLoading(false)
      }
    })()
  }, [searchValue])

  return (
    <Layout header="Users" loading={loading}>
      <div className="mt-10 w-full">
        <div className="flex w-full items-center justify-between rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
          <div>
            {totalUsers && (
              <>
                <h1 className="text-2xl font-medium text-gray-600">
                  {totalUsers}
                </h1>
                <p className="text-xs">Total Users</p>
              </>
            )}
          </div>
          <div>
            <TableSearch
              name="searchValue"
              value={searchValue}
              placeholder="Search for user..."
              onChange={handleValueChange}
            />
          </div>
        </div>
        <Table columns={columns} data={users} progressPending={tableLoading} />
      </div>
    </Layout>
  )
}
