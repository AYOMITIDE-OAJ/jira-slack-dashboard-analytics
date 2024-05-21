import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../../input'
import Button from '../../button'

export default function Password() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-[600px] w-full p-4 md:w-[600px] md:p-8">
        <form className="mt-4 w-full md:mt-10" onSubmit={handleSubmit}>
          <div className="space-y-4 md:space-y-6">
            <Input
              name="oldPassword"
              value={formData.oldPassword}
              placeholder="********"
              label="Old Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="newPassword"
              value={formData.newPassword}
              placeholder="********"
              label="New Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="********"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
          </div>
          <Button className="mt-7 w-full md:w-max md:px-8" rounded={false}>
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}
