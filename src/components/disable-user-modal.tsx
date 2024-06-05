import React, { Dispatch, SetStateAction } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: any
  deactivateUser: any
}

export default function DisableUserModal({
  isOpen,
  setIsOpen,
  user,
  deactivateUser,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <h2 className="text-md text-lg text-black">Deactivate User</h2>
        <div>
          <div className="relative m-auto my-4 mt-8 h-[40px] w-[40px] ">
            <Image
              src="/assets/images/disable-warning.png"
              alt="Profile"
              fill
            />
          </div>
          <p className="text-md px-8 text-center text-black">
            Are you sure you sure you want to Deactivate this user from using
            palremit
          </p>
          <aside className="flex items-center justify-center space-x-4 px-3 py-2 md:px-6 md:py-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200">
              <Image src="/assets/images/avatar.png" alt="Profile" fill />
            </div>
            <article className="space-y">
              <p className="text-md font-semibold text-primary">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm font-light">{user?.email}</p>
            </article>
          </aside>

          <section className="mx-4 my-4 flex gap-5 md:mx-8 lg:mx-10">
            <Button rounded={false}>No</Button>
            <>
              <Button variant="danger" rounded={false} onClick={deactivateUser}>
                Yes
              </Button>
            </>
          </section>
        </div>
      </main>
    </Modal>
  )
}
