import Button from '@/components/button'
import Input from '@/components/input'
import Modal from '@/components/modal'
import Select from '@/components/select'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleGenericSuccess, handleError } from '@/utils/notify'
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import { TableColumn } from 'react-data-table-component'
import { CiCircleMore } from 'react-icons/ci'
import { HiOutlineUserCircle } from 'react-icons/hi'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Admin({ isOpen, setIsOpen }: Props) {
  const [tableLoading, setTableLoading] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)

  const [admins, setAdmins] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@email.com',
      role: 'admin',
      status: 'active',
    },
    {
      firstName: 'Mary',
      lastName: 'Doe',
      email: 'mary@email.com',
      role: 'admin',
      status: 'active',
    },
    {
      firstName: 'Harry',
      lastName: 'Doe',
      email: 'harry@email.com',
      role: 'admin',
      status: 'inactive',
    },
    {
      firstName: 'Frank',
      lastName: 'Doe',
      email: 'john@email.com',
      role: 'admin',
      status: 'active',
    },
  ])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  })

  const roles = [
    { name: 'admin', value: 'admin' },
    { name: 'super-admin', value: 'super-admin' },
    { name: 'admin-user', value: 'admin-user' },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      minWidth: '250px',
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
      cell: (row: any) => row?.email,
      minWidth: '300px',
    },
    {
      name: 'Role',
      selector: (row: any) => row?.role,
      cell: (row: any) => row?.role,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => <StatusPill status={row.status} />,
    },
    {
      name: '',
      selector: (row: any) => row,
      cell: (row: any) => (
        <CiCircleMore
          className="text-gray-300"
          size={35}
          onClick={() => console.log('admin')}
        />
      ),
      width: '100px',
    },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReqLoading(true)
    try {
      await DashboardApi.addAdmin({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role,
      })
      handleGenericSuccess('Admin Created Successfully')
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  return (
    <div>
      <Table columns={columns} data={admins} progressPending={tableLoading} />
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
