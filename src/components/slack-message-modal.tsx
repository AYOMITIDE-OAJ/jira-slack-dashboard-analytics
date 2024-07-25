import React, { Dispatch, SetStateAction, useState, ChangeEvent } from 'react'
import Modal from './modal'
import Button from './button'
import TextArea from './text-area'
import {
  handleError,
  handleGenericError,
  handleGenericSuccess,
} from '@/utils/notify'
import DashboardApi from '@/utils/api/dashboard-api'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateSlackMessageModal({ isOpen, setIsOpen }: Props) {
  const [formData, setFormData] = useState({
    message: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!formData.message) {
        handleGenericError('Message is required')
        return;
      }

      await DashboardApi.createSlackMessage(formData.message)
      handleGenericSuccess('Slack Message Created Successfully')
      setIsOpen(false)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <h2 className="text-md text-lg text-black">Create Slack Message</h2>
        <div>
          <form onSubmit={handleSaveChanges}>
            <p className="mb-2 mt-8 px-2 text-sm text-black">Message</p>
            <TextArea
              variant="dark"
              name="message"
              label=""
              placeholder="Enter Message here"
              value={formData.message}
              onChange={handleChange}
            />

            <section className="my-10 mb-4">
              <Button rounded={false}>Publish to slack</Button>
            </section>
          </form>
        </div>
      </main>
    </Modal>
  )
}
