import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
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
  retryKycSubmission: (id: string) => void
  uploadUserKyc: (cardId: string) => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function CardDetailsModal({
  isOpen,
  setIsOpen,
  card,
  retryKycSubmission,
  uploadUserKyc,
  handleFileChange,
}: Props) {
  const [fileName, setFileName] = useState('')
  const [preview, setPreview] = useState(null)

  const onFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      setFileName(file.name)
      handleFileChange(event)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview((reader as any).result)
      }
      reader.readAsDataURL(file)
    }
  }

  const closeModalAction = () => {
    setIsOpen(false)
    setFileName('')
    setPreview(null)
  }

  const triggerFileInput = () => {
    ;(document as any).getElementById('dropzone-file').click()
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={closeModalAction}>
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
          <Button rounded={false} onClick={() => retryKycSubmission(card._id)}>
            Retry Request
          </Button>
          <div className="mt-8 gap-4">
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <input
                onChange={onFileChange}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
              {preview ? (
                <Image
                  src={preview}
                  alt="Uploaded Preview"
                  className="mx-auto my-3 block rounded-xl object-contain"
                  height={150}
                  width={150}
                  onClick={triggerFileInput}
                />
              ) : (
                <label htmlFor="dropzone-file" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </label>
              )}
            </div>
            {fileName && (
              <p className="mt-2 text-sm text-green-500">{fileName}</p>
            )}

            <aside className="text-center">
              <Button
                variant="black_white"
                className="my-4 text-sm "
                rounded={false}
                onClick={() => {
                  uploadUserKyc(card._id)
                  setFileName('')
                }}
                disabled={!fileName}
              >
                UPLOAD NEW SELFIE
              </Button>
            </aside>
          </div>
        </div>
      </div>
    </Modal>
  )
}
