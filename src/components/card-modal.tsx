import React, { Dispatch, SetStateAction } from 'react'
import KeyValueComponent from './key-value-component'
import Modal from './modal'
import moment from 'moment'
import StatusPill from './status-pill'
import KeyDetailValueComponent from './key-detail-value-component'
import Image from 'next/image'
import Button from './button'
import KeyValueSenComponent from './key-value-sensitive.component'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  card: Record<string, any>
  retryKycSubmission: any
  uploadUserKyc: any
  handleFileChange: any
}

export default function CardDetailsModal({
  isOpen,
  setIsOpen,
  card,
  retryKycSubmission,
  uploadUserKyc,
  handleFileChange,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1 className="text-lg">Card Details</h1>
        <div className="max-h-[680px] divide-y divide-gray-200 overflow-y-scroll py-3 md:py-6">
          <KeyValueComponent
            name="Date"
            value={moment(card?.createdAt).format('LLL')}
            size="sm"
          />
          <KeyValueComponent
            name="Name"
            value={`${card?.firstName || ''} ${card?.lastName || ''}`}
            size="sm"
          />
          <KeyValueSenComponent name="Email" value={card?.email} size="sm" />
          <KeyValueSenComponent
            name="Cardholder Id"
            value={card?.cardholderId}
            size="sm"
          />
          <KeyValueComponent name="Mobile" value={card?.phone} size="sm" />
          <KeyValueComponent
            name="Status"
            value={<StatusPill status={card?.status} size="sm" />}
            size="sm"
          />
          {card?.failureReason && (
            <KeyDetailValueComponent
              name="Failure Reason"
              value={card?.failureReason}
              size="sm"
            />
          )}
          {card?.identityNumber && (
            <div className="w-full pt-4">
              <p className="text-center text-xs font-bold">IDENTITY</p>
              <div className="divide-y divide-gray-200">
                <KeyValueComponent
                  name="Number"
                  value={`${card?.identityNumber}`}
                  size="sm"
                />
                <Image
                  src={card?.identitySelfie}
                  alt="User Image"
                  className="mx-auto my-3 block rounded-xl object-contain"
                  height={150}
                  width={150}
                />
              </div>
            </div>
          )}
          <Button onClick={() => retryKycSubmission(card._id)}>
            Retry Request
          </Button>
          <div className='flex justify-between gap-4 items-center mt-6'>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Button variant='black_white' className="my-4" onClick={() => uploadUserKyc(card._id)}>
              Upload new selfie
            </Button>
          </div>{' '}
        </div>
      </div>
    </Modal>
  )
}
