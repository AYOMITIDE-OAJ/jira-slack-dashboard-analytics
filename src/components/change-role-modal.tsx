import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'
import Select from './select'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: User
  setMyUser: (user: User) => void
  triggerRoleChange: (id: string, newRole: string) => Promise<void>
}

interface SelectOption {
  name: string
  value: string
}

const roles: SelectOption[] = [
  { name: 'Investor', value: 'investor' },
  { name: 'Super-admin', value: 'super-admin' },
  { name: 'CRM', value: 'crm' },
  { name: 'Marketer', value: 'marketer' },
]

export default function ChangeRoleModal({
  isOpen,
  setIsOpen,
  user,
  setMyUser,
  triggerRoleChange,
}: Props) {
  const [selectedRole, setSelectedRole] = useState(user?.role || '')

  useEffect(() => {
    setSelectedRole(user?.role || '')
  }, [user])

  const handleSelect = (option: any) => {
    const { value } = option
    setMyUser({ ...user, role: value })
  }

  const handleSaveChanges = () => {
    setIsOpen(false)
    triggerRoleChange(user._id, selectedRole)
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <h2 className="text-md text-lg text-black">Change Role</h2>
        <div>
          <div className="relative m-auto my-4 mt-8 h-[40px] w-[40px] ">
            <Image
              src="/assets/images/disable-warning.png"
              alt="Profile"
              fill
            />
          </div>
          <p className="text-md px-8 text-center text-black">
            Are you sure you want to change this user&apos;s role?
          </p>
          <aside className="flex items-center justify-center space-x-4 px-3 py-2 md:px-6 md:py-6">
            <Select
              name="role"
              label="Role"
              value={selectedRole}
              options={roles}
              onChange={handleSelect}
              variant="dark"
            />
          </aside>

          <section className="mx-4 my-4 flex gap-5 md:mx-8 lg:mx-10">
            <Button rounded={false} onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </section>
        </div>
      </main>
    </Modal>
  )
}
