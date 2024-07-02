import Layout from '@/components/layout'
import React, { ChangeEvent, useState } from 'react'
import Button from '@/components/button'
import { useSession } from 'next-auth/react'
import FormInput from '@/components/form-input'
import { handleError, handleGenericError } from '@/utils/notify'
import Select from '@/components/select'
import NotificationCardLayout from '@/components/notification-card-layout'
import NotificationSuccessModal from '@/components/notification-success-modal'
import DashboardApi from '@/utils/api/dashboard-api'
import AsyncSelect from 'react-select/async'

const Notifications = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user

  const [loading, setLoading] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')

  const [formData, setFormData] = useState({
    type: '',
    userId: '',
    title: '',
    content: '',
  })

  const pastNotifications = [
    {
      id: 1,
      title: 'BVN error and App Update',
      userType: 'All Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      id: 2,
      title: 'Rate update on USDT/USD',
      userType: 'Premium Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      id: 3,
      title: 'BVN error and App Update',
      userType: 'All Users',
      message:
        'Over the last few hours, we received some complaints from some of our newly onboarded users about the error messages experienced at the BVN point of verification, and immediately, we swung into action. We are pleased to announce that the issues have been rectified with updates pushed to Play Store.',
      time: '16:23 AM, 12 Dec 2022',
    },
    {
      id: 4,
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
    setFormData({ ...formData, [name]: value })
  }

  const handleSelect = (option: any) => {
    const { value } = option
    setSelectedUser(value)

    if (value === 'all') {
      setFormData({ ...formData, userId: '' });
    } else {
      setFormData({ ...formData, userId: value });
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReqLoading(true)

    try {
      if (!formData.title || !formData.content) {
        handleGenericError('Title and Message fields are required')
      }

      await DashboardApi.sendPushNotification({
        userId: formData.userId,
        title: formData.title,
        message: formData.content,
      })
      setIsOpen(true)
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await DashboardApi.getAllUsers({ search: inputValue })
      console.log('RESPONSE', response.records)
      return response.records?.map((user: any) => ({
        label: (
          <p className="capitalize">{user.firstName + ' ' + user.lastName}</p>
        ),
        value: user._id,
      }))
    } catch (error) {
      handleError(error)
      return []
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
            <Select
              name="type"
              label="User Type"
              value={selectedUser}
              options={users}
              onChange={handleSelect}
              variant="dark"
            />
            {selectedUser === 'specific' && (
              // <FormInput
              //   name="userId"
              //   label="User ID"
              //   value={formData.userId}
              //   placeholder="Enter UserId"
              //   onChange={handleChange}
              //   type="text"
              // />

              <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                className="rounded-sm bg-primary p-1"
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    userId: (selectedOption as any).value,
                  })
                }}
              />
            )}
            <FormInput
              name="title"
              label="Message Title"
              value={formData.title}
              placeholder="Enter Message Title"
              onChange={handleChange}
              type="text"
            />
            <FormInput
              name="content"
              label="Message Body"
              model="textarea"
              value={formData.content}
              placeholder="Type Message Here"
              onChange={handleChange}
              type="text"
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
          {pastNotifications.map((data) => (
            <NotificationCardLayout
              key={data.id}
              data={data}
              className={'className'}
            />
          ))}
        </div>
      </div>
      <NotificationSuccessModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={formData.content}
      />
    </Layout>
  )
}

export default Notifications

Notifications.auth = true
