import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Modal from './modal'
import Image from 'next/image'
import Button from './button'
import Input from './input'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  withdrawalId: string
  declineWithdrawal: (withdrawalId: string, reason: string) => Promise<void>
}

export default function DeclineWithdrawalModal({
  isOpen,
  setIsOpen,
  withdrawalId,
  declineWithdrawal,
}: Props) {
  const [formData, setFormData] = useState({
    reason: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <main>
        <h2 className="text-md text-lg text-black">Decline Withdrawal</h2>
        <div>
          <div className="relative m-auto my-4 mt-8 h-[40px] w-[40px] ">
            <Image
              src="/assets/images/disable-warning.png"
              alt="Profile"
              fill
            />
          </div>
          <p className="text-md px-8 text-center text-black">
            Are you sure you sure you want to decline this withdrawal request?
          </p>
          <aside className="flex items-center justify-center space-x-4 px-3 py-2 md:px-6 md:py-6">
            <Input
              name="reason"
              value={formData.reason}
              placeholder="Specify Decline Reason"
              label="Reason"
              onChange={handleChange}
              variant="dark"
            />
          </aside>

          <section className="mx-4 my-4 flex gap-5 md:mx-8 lg:mx-10">
            <Button onClick={() => setIsOpen(false)} rounded={false}>
              No
            </Button>
            <>
              <Button
                variant="danger"
                rounded={false}
                onClick={() => declineWithdrawal(withdrawalId, formData.reason)}
              >
                Yes
              </Button>
            </>
          </section>
        </div>
      </main>
    </Modal>
  )
}
