import React, { Dispatch, SetStateAction } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  content: string
}

export default function NotificationSuccessModal({
  isOpen,
  setIsOpen,
  content,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <div>
          <div className="relative m-auto my-4 mt-8 h-[100px] w-[150px] ">
            <Image
              src="/assets/images/notification-success.png"
              alt="Profile"
              fill
            />
          </div>
          <h1 className="my-2 px-8 text-center text-xl font-semibold text-black">
            Sent Successfully
          </h1>
          <p className="text-md px-8 text-center text-black">{content}</p>

          <section className="my-4 text-center">
            <Button
              className="w-1/3"
              onClick={() => setIsOpen(false)}
              rounded={false}
            >
              Done
            </Button>
            <></>
          </section>
        </div>
      </main>
    </Modal>
  )
}
