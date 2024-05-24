import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import DashboardApi from '@/utils/api/dashboard-api'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { HiOutlineUserCircle } from 'react-icons/hi'

const KYC = () => {
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
      minWidth: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.owner?.email,
      cell: (row: any) => row?.owner?.email,
    },
    {
      name: 'Country',
      selector: (row: any) => row?.owner?.country,
      cell: (row: any) => row?.owner?.country,
    },
    // {
    //   name: 'Status',
    //   selector: (row: any) => row?.isActive,
    //   cell: (row: any) => (
    //     <StatusPill status={row.isActive ? 'active' : 'inactive'} />
    //   ),
    // },
    {
      name: 'Verification',
      selector: (row: any) => row?.isKYCVerified,
      cell: (row: any) => (
        <StatusPill status={row?.isKYCVerified ? 'verified' : 'unverified'} />
      ),
      width: '150px',
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const usersRes = await DashboardApi.getUsersKyc({})
        console.log(usersRes)
        setUsers(usersRes)
        setTotalUsers(usersRes.length)
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
        const res = await DashboardApi.getUsersKyc({})
        setUsers(res)
      } catch (err) {
      } finally {
        setTableLoading(false)
      }
    })()
  }, [searchValue])

  return (
    <Layout header="KYC" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
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
          <TableSearch
            name="searchValue"
            value={searchValue}
            placeholder="Search for user..."
            onChange={handleValueChange}
          />
        </div>
        <Table columns={columns} data={users} progressPending={tableLoading} />
      </div>
    </Layout>
  )
}

export default KYC

KYC.auth = true
