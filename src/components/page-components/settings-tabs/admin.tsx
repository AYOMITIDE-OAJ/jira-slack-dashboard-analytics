import Button from '@/components/button'
import Input from '@/components/input'
import Modal from '@/components/modal'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { CiCircleMore } from 'react-icons/ci'
import { HiOutlineUserCircle } from 'react-icons/hi'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Admin({ isOpen, setIsOpen }: Props) {
  const [tableLoading, setTableLoading] = useState(false)
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
    email: '',
    role: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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

  return (
    <div>
      <Table columns={columns} data={admins} progressPending={tableLoading} />

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form>
          <div className="space-y-1">
            <h1 className="text-lg font-medium">Add New Admin</h1>
            <p className="text-sm text-gray-400">
              Add new admins and organization
            </p>
          </div>
          <div className="mt-6 space-y-4 md:space-y-6">
            <Input
              name="email"
              value={formData.email}
              placeholder="example@example.com"
              label="Email"
              onChange={handleChange}
              variant="dark"
            />
          </div>
          <div className="mt-5">
            <Button rounded={false} className="w-full md:w-1/2">
              Add Admin
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
