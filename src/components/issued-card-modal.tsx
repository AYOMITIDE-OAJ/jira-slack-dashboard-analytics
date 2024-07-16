import React, { Dispatch, SetStateAction } from 'react'
import Modal from './modal'
import moment from 'moment'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  transaction: any[]
}

export default function IssuedCardModal({
  isOpen,
  setIsOpen,
  transaction,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1 className="text-lg">Issued Card Transaction Details</h1>
        <div className="max-h-[680px] divide-y divide-gray-200 overflow-y-scroll py-3 md:py-6">
          {transaction.length > 0 ? (
            transaction.map((tranx: any) => (
              <aside className="my-3" key={tranx?.transaction_date}>
                <div className="my-1 flex items-center justify-between">
                  <p className="text-black">Amount: </p>
                  <p className="font-semibold text-primary">
                    {tranx?.currency} {tranx.amount}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-black">Date: </p>
                  <p className="text-neutral-600 text-xs">
                    {moment(tranx?.transaction_date).format('LLL')}
                  </p>
                </div>
                <div className="my-1 flex items-center justify-between">
                  <p className="text-black">Desc: </p>
                  <p className="text-neutral-600 text-xs">{tranx.description}</p>
                </div>
              </aside>
            ))
          ) : (
            <p className="text-center text-neutral-600">No record found</p>
          )}
        </div>
      </div>
    </Modal>
  )
}
