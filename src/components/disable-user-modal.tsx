import React, { Dispatch, SetStateAction } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: any
  deactivateUser: any
  activateUser: any
}

export default function DisableUserModal({
  isOpen,
  setIsOpen,
  user,
  deactivateUser,
  activateUser,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <h2 className="text-md text-lg text-black">
          {user?.isActive ? 'Deactivate' : 'Activate'} User
        </h2>
        <div>
          <div className="relative m-auto mt-8 my-4 h-[40px] w-[40px] ">
            <Image
              src="/assets/images/disable-warning.png"
              alt="Profile"
              fill
            />
          </div>
          <p className="text-md px-8 text-center text-black">
            Are you sure you sure you want to{' '}
            {user?.isActive ? 'Deactivate' : 'Activate'} this user from using
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

          <section className="my-4 mx-4 md:mx-8 lg:mx-10 flex gap-5">
            <Button rounded={false} className="border-2 hover:text-white bg-white text-primary">
              No
            </Button>
            <>
              {user?.isActive ? (
                <Button
                  rounded={false}
                  onClick={deactivateUser}
                  className="hover:bg-red-600  hover:text-white"
                >
                  Yes
                </Button>
              ) : (
                <Button
                  rounded={false}
                  onClick={activateUser}
                  className="hover:bg-red-600  hover:text-white"
                >
                  Yes
                </Button>
              )}
            </>
          </section>
        </div>
      </main>
    </Modal>
  )
}
