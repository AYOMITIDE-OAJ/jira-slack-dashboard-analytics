import React, { Dispatch, SetStateAction, useState } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'
import Select from './select'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: any
  deactivateUser: (user: any) => void
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
  deactivateUser,
}: Props) {
  const [myUser, setMyUser] = useState(user)

  const handleSelect = (option: SelectOption) => {
    setMyUser({ ...myUser, role: option.value })
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
              value={myUser?.role}
              options={roles}
              onChange={() => null}
              variant="dark"
            />
          </aside>

          <section className="mx-4 my-4 flex gap-5 md:mx-8 lg:mx-10">
            <Button rounded={false} onClick={() => setIsOpen(false)}>
              Save Changes
            </Button>
          </section>
        </div>
      </main>
    </Modal>
  )
}
