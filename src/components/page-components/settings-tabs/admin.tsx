// import { Popover } from '@/components/Popover'
// import Button from '@/components/button'
// import Input from '@/components/input'
// import Modal from '@/components/modal'
// import Select from '@/components/select'
// import StatusPill from '@/components/status-pill'
// import Table from '@/components/table'
// import DashboardApi from '@/utils/api/dashboard-api'
// import { handleGenericSuccess, handleError } from '@/utils/notify'
// import { useRouter } from 'next/router'
// import React, {
//   ChangeEvent,
//   Dispatch,
//   FormEvent,
//   SetStateAction,
//   useEffect,
//   useState,
// } from 'react'
// import { TableColumn } from 'react-data-table-component'
// import { CiCircleMore } from 'react-icons/ci'
// import { HiOutlineUserCircle } from 'react-icons/hi'

// interface Props {
//   isOpen: boolean
//   setIsOpen: Dispatch<SetStateAction<boolean>>
// }

// export default function Admin({ isOpen, setIsOpen }: Props) {
//   const router = useRouter()
//   const [tableLoading, setTableLoading] = useState(false)
//   const [reqLoading, setReqLoading] = useState(false)
//   const [admins, setAdmins] = useState([])
//   const [selectedRow, setSelectedRow] = useState(null)
//   const [popoverOpen, setPopoverOpen] = useState(false)

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     role: '',
//   })

//   useEffect(() => {
//     ;(async () => {
//       setTableLoading(true)

//       try {
//         const [adminsRes] = await Promise.all([DashboardApi.getAdminUsers()])
//         setAdmins(adminsRes)
//       } catch (err) {
//       } finally {
//         setTableLoading(false)
//       }
//     })()
//   }, [])

//   const roles = [
//     { name: 'Investor', value: 'investor' },
//     { name: 'Super-admin', value: 'super-admin' },
//     { name: 'CRM', value: 'crm' },
//     { name: 'Marketer', value: 'marketer' },
//   ]

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSelect = (option: any) => {
//     const { value } = option
//     setFormData({ ...formData, role: value })
//   }

//   const columns: TableColumn<any>[] = [
//     {
//       name: 'Name',
//       selector: (row: any) => row,
//       cell: (row: any) => (
//         <div className="flex items-center space-x-2 text-sm">
//           <div className="border-200 h-8 w-8 overflow-hidden rounded-full">
//             <HiOutlineUserCircle className="text-neutral-400" size={32} />
//           </div>
//           <p className="">{row?.name}</p>
//         </div>
//       ),
//       minWidth: '250px',
//     },
//     {
//       name: 'Email',
//       selector: (row: any) => row?.email,
//       cell: (row: any) => row?.email,
//       minWidth: '300px',
//     },
//     {
//       name: 'Role',
//       selector: (row: any) => row?.role,
//       cell: (row: any) => row?.role,
//     },
//     {
//       name: 'Status',
//       selector: (row: any) => row?.isDisabled,
//       cell: (row: any) => (
//         <StatusPill status={row?.isDisabled == false ? 'success' : 'failed'} />
//       ),
//     },
//     {
//       name: '',
//       selector: (row: any) => row,
//       cell: (row: any) => (
//         <CiCircleMore
//           className="text-gray-300"
//           size={35}
//           onClick={() => console.log('admin')}
//         />
//       ),
//       width: '100px',
//     },
//   ]

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setReqLoading(true)
//     try {
//       await DashboardApi.addAdmin({
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         role: formData.role,
//       })

//       handleGenericSuccess('Admin Created Successfully')
//       router.reload()
//     } catch (e) {
//       handleError(e)
//     } finally {
//       setReqLoading(false)
//     }
//   }

//   return (
//     <div>
//       <Table
//         onRowClicked={(row) => {
//           setSelectedRow(row)
//           setPopoverOpen(false) // Close the popover when a new row is clicked
//         }}
//         columns={columns}
//         data={admins}
//         progressPending={tableLoading}
//       />
//       {popoverOpen && selectedRow && (
//         <Popover
//           className="w-max space-y-3 rounded-md bg-white px-1 py-2"
//           placement="auto-end"
//           // onClose={() => setPopoverOpen(false)} // Add this to close the popover when clicking outside
//           trigger={() => (
//             <svg
//               className="mx-1"
//               width={3}
//               height={13}
//               viewBox="0 0 3 13"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <circle
//                 cx="1.5"
//                 cy="1.5"
//                 r="1.5"
//                 fill="currentColor"
//                 fillOpacity="0.5"
//               />
//               <circle
//                 cx="1.5"
//                 cy="6.5"
//                 r="1.5"
//                 fill="currentColor"
//                 fillOpacity="0.5"
//               />
//               <circle
//                 cx="1.5"
//                 cy="11.5"
//                 r="1.5"
//                 fill="currentColor"
//                 fillOpacity="0.5"
//               />
//             </svg>
//           )}
//         >
//           <Popover.Item>Change Role</Popover.Item>
//           <Popover.Item>Activate</Popover.Item>
//           <Popover.Item>Delete</Popover.Item>
//         </Popover>
//       )}
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-1">
//             <h1 className="text-lg font-medium">Add New Admin</h1>
//             <p className="text-sm text-gray-400">
//               Add new admins and organization
//             </p>
//           </div>
//           <div className="mt-6 space-y-4 md:space-y-6">
//             <Input
//               name="firstName"
//               value={formData.firstName}
//               placeholder="John"
//               label="First Name"
//               onChange={handleChange}
//               variant="dark"
//             />
//             <Input
//               name="lastName"
//               value={formData.lastName}
//               placeholder="Smith"
//               label="Last Name"
//               onChange={handleChange}
//               variant="dark"
//             />
//             <Input
//               name="email"
//               value={formData.email}
//               placeholder="example@example.com"
//               label="Email"
//               onChange={handleChange}
//               variant="dark"
//             />
//             <Select
//               name="role"
//               label="Role"
//               value={formData.role}
//               options={roles}
//               onChange={handleSelect}
//               variant="dark"
//             />
//           </div>
//           <div className="mt-5">
//             <Button
//               loading={reqLoading}
//               rounded={false}
//               className="w-full md:w-1/2"
//             >
//               Add Admin
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   )
// }

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
import { PopoverItem } from '@/components/Popover/PopoverItem'
import { Popover } from '@/components/Popover'

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
  const [popoverOpen, setPopoverOpen] = useState(false)

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
      name: '',
      selector: (row: any) => row,
      cell: (row: any) => (
        <CiCircleMore
          className="text-gray-300"
          size={35}
          onClick={() => {
            setSelectedRow(row)
            setPopoverOpen(true)
          }}
        />
      ),
      width: '100px',
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

  return (
    <div>
      <Table
        onRowClicked={(row) => {
          setSelectedRow(row)
          setPopoverOpen(false) // Close the popover when a new row is clicked
        }}
        columns={columns}
        data={admins}
        progressPending={tableLoading}
      />
      {/* {popoverOpen && selectedRow && ( */}
        <Popover
          trigger={() => (
            <svg
              className="mx-1"
              width={3}
              height={13}
              viewBox="0 0 3 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="1.5"
                cy="1.5"
                r="1.5"
                fill="currentColor"
                fillOpacity="0.5"
              />
              <circle
                cx="1.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                fillOpacity="0.5"
              />
              <circle
                cx="1.5"
                cy="11.5"
                r="1.5"
                fill="currentColor"
                fillOpacity="0.5"
              />
            </svg>
          )}
          className="w-max space-y-3 rounded-md bg-white px-1 py-2"
        >
          <Popover.Item>Change Role</Popover.Item>
          <Popover.Item>Activate</Popover.Item>
          <Popover.Item>Delete</Popover.Item>
        </Popover>
      {/* )} */}
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
