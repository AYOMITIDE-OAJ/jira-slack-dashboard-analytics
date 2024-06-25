import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TableSearch from '@/components/table-search'
import DashboardApi from '@/utils/api/dashboard-api'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { CiCircleMore } from 'react-icons/ci'
import { useRouter } from 'next/router'
import { Routes } from '@/constants/routes'
import moment from 'moment'
import User from '@/components/user'
import withRole from '@/components/page-components/with-role'
import { Roles, isSuperAdmin } from '@/lib/roles'
import debounce from 'lodash.debounce'
import { useSession } from 'next-auth/react'

const Users = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user
  const router = useRouter()
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
      name: 'Registration',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Name',
      selector: (row: any) => row,
      cell: (row: any) => <User user={row} />,
      minWidth: '300px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
      cell: (row: any) => row?.email,
      width: '300px',
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
      minWidth: '150px',
    },
    {
      name: 'Verification',
      selector: (row: any) => row?.isVerified,
      cell: (row: any) => (
        <StatusPill status={row?.isVerified ? 'verified' : 'unverified'} />
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
          onClick={() =>
            router.push({ pathname: Routes.User, query: { id: row?._id } })
          }
        />
      ),
      width: '100px',
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

  const debounceSearch = useCallback(
    debounce(async (query) => {
      setTableLoading(true)
      try {
        const res = await DashboardApi.getAllUsers({ search: query })
        setUsers(res.records)
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
    <Layout header="Users" loading={loading}>
      <div className="w-full xl:mt-5">
        <div className="flex flex-col items-start justify-between gap-4 rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6 md:flex-row md:items-center">
          <div>
            {isSuperAdmin(userSession?.role) && totalUsers && (
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
        <Table
          columns={columns}
          data={users}
          progressPending={tableLoading}
          onRowClicked={(row: any) =>
            router.push({ pathname: Routes.User, query: { id: row._id } })
          }
        />
      </div>
    </Layout>
  )
}

export default withRole(Users, [Roles.SuperAdmin, Roles.Admin, Roles.CRM])

Users.auth = true
