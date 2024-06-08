import React, { useState, useEffect } from 'react'
import { TableColumn } from 'react-data-table-component'
import { CiCircleMore } from 'react-icons/ci'
import { HiOutlineUserCircle } from 'react-icons/hi'
import Table from '@/components/table'
import DashboardApi from '@/utils/api/dashboard-api'
import Modal from '@/components/modal'
import Button from '@/components/button'
import Input from '@/components/input'
import Select from '@/components/select'
import StatusPill from '@/components/status-pill'
import { handleGenericSuccess, handleError } from '@/utils/notify'
import { useRouter } from 'next/router'
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from '@headlessui/react'
import { FcAreaChart } from 'react-icons/fc'

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Admin({ isOpen, setIsOpen }: Props) {
  const router = useRouter()
  const [tableLoading, setTableLoading] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)
  const [admins, setAdmins] = useState([])
  const [selectedRow, setSelectedRow] = useState<any>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    ;(async () => {
      setTableLoading(true)
      try {
        const adminsRes = await DashboardApi.getAdminUsers()
        setAdmins(adminsRes)
      } catch (err) {
        console.error(err)
      } finally {
        setTableLoading(false)
      }
    })()
  }, [])

  const roles = [
    { name: 'Investor', value: 'investor' },
    { name: 'Super-admin', value: 'super-admin' },
    { name: 'CRM', value: 'crm' },
    { name: 'Marketer', value: 'marketer' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelect = (option: any) => {
    const { value } = option
    setFormData({ ...formData, role: value })
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Name',
      selector: (row: any) => row.name,
      cell: (row: any) => (
        <div className="flex items-center space-x-2 text-sm">
          <div className="border-200 h-8 w-8 overflow-hidden rounded-full">
            <HiOutlineUserCircle className="text-neutral-400" size={32} />
          </div>
          <p>{row.name}</p>
        </div>
      ),
      minWidth: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row.email,
      cell: (row: any) => row.email,
      minWidth: '300px',
    },
    {
      name: 'Role',
      selector: (row: any) => row.role,
      cell: (row: any) => row.role,
    },
    {
      name: 'Status',
      selector: (row: any) => row.isDisabled,
      cell: (row: any) => (
        <StatusPill
          status={row?.isDisabled ? 'inactive' : 'active'}
          size="sm"
        />
      ),
    },
    {
      name: 'Actions',
      cell: (row: any) => renderMenu(row._id, row.role),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReqLoading(true)
    try {
      await DashboardApi.addAdmin(formData)
      handleGenericSuccess('Admin Created Successfully')
      router.reload()
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  const handleActivate = async (id: string) => {
    console.log('Activate account with id:', id)

    setReqLoading(true)
    try {
      await DashboardApi.deactivateAdminUser(id)
      handleGenericSuccess('Account Activated Successfully')
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  const handleRoleChange = async (id: string, newRole: string) => {
    console.log('Delete account with id:', id)

    setReqLoading(true)
    try {
      await DashboardApi.changeAdminUserRole(id, newRole)
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  const renderMenu = (id: string, role: string) => (
    <Menu>
      <MenuButton>
        <CiCircleMore className="text-gray-300" size={35} />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-75"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="w-40 origin-top-right rounded-xl bg-white p-1 text-sm/6 shadow-md focus:outline-none"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-blue-500 data-[focus]:bg-gray-100"
              onClick={() => handleRoleChange(id, role)}
            >
              Change Role
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-red-500 data-[focus]:bg-gray-100"
              onClick={() => handleActivate(id)}
            >
              Deactivate Account
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )

  return (
    <div>
      <Table
        onRowClicked={(row) => setSelectedRow(row)}
        columns={columns}
        data={admins}
        progressPending={tableLoading}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <h1 className="text-lg font-medium">Add New Admin</h1>
            <p className="text-sm text-gray-400">
              Add new admins and organization
            </p>
          </div>
          <div className="mt-6 space-y-4 md:space-y-6">
            <Input
              name="firstName"
              value={formData.firstName}
              placeholder="John"
              label="First Name"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="lastName"
              value={formData.lastName}
              placeholder="Smith"
              label="Last Name"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="email"
              value={formData.email}
              placeholder="example@example.com"
              label="Email"
              onChange={handleChange}
              variant="dark"
            />
            <Select
              name="role"
              label="Role"
              value={formData.role}
              options={roles}
              onChange={handleSelect}
              variant="dark"
            />
          </div>
          <div className="mt-5">
            <Button
              loading={reqLoading}
              rounded={false}
              className="w-full md:w-1/2"
            >
              Add Admin
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
