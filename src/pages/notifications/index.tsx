import Layout from '@/components/layout'
import React, { ChangeEvent, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Button from '@/components/button'
import { Roles, isSuperAdmin } from '@/lib/roles'
import { useSession } from 'next-auth/react'
import FormInput from '@/components/form-input'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import Select from '@/components/select'

const Notifications = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user

  const [loading, setLoading] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')

  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
  })

  const pastNotifications = [
    {
      title: 'BVN error and App Update',
      userType: 'All Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      title: 'Rate update on USDT/USD',
      userType: 'Premium Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      title: 'BVN error and App Update',
      userType: 'All Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      title: 'Rate update on USDT/USD',
      userType: 'Premium Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
  ]

  interface SelectOption {
    name: string
    value: string
  }

  const users: SelectOption[] = [
    { name: 'All Users', value: 'all' },
    { name: 'Specific User', value: 'specific' },
    { name: 'Premium User', value: 'premium' },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value !== '' && isNaN(Number(value))) {
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleSelect = (option: any) => {
    const { value } = option
    setSelectedUser(value)
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReqLoading(true)
    const { type: rateId, ...rest } = formData

    try {
      //   await DashboardMiscApi.updateRate(returnOptionValue(rateId), {
      //     ...rest,
      //     title: rest.title,
      //     sell_markup: rest.sell_markup,
      //   })
      handleGenericSuccess('Notification Sent Successfully')
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  return (
    <Layout header="Notifications">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-1 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="pb-4">
            <h1 className="text-lg font-medium text-gray-600">Notify User</h1>
          </div>
          <form className="space-y-4 py-4" onSubmit={handleSubmit}>
            {/* <FormSelect
              name="type"
              label="User Type"
              value={formData.type}
              placeholder="Select User Type"
              onChange={handleChange}
            /> */}
            <Select
              name="type"
              label="User Type"
              value={selectedUser}
              options={users}
              onChange={handleSelect}
              variant="dark"
            />
            <FormInput
              name="title"
              label="Message Title"
              value={formData.title}
              placeholder="Enter Message Title"
              onChange={handleChange}
            />
            <FormInput
              name="content"
              label="Message Body"
              value={formData.content}
              placeholder="Type Message Here"
              onChange={handleChange}
            />

            <div className="w-full pt-4">
              <Button
                className="w-full md:w-1/2"
                rounded={false}
                loading={reqLoading}
              >
                Notify User
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
            <h1 className="text-base font-normal text-gray-600">
              Past Notifications
            </h1>
          </div>
          {/* <Table
            columns={columns}
            data={rates}
            onRowClicked={(row: any) => setFormData(row)}
          /> */}
        </div>
      </div>{' '}
    </Layout>
  )
}

export default Notifications

Notifications.auth = true
