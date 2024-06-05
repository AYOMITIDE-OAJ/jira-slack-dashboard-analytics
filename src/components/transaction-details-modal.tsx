import React, { Dispatch, SetStateAction } from 'react'
import KeyValueComponent from './key-value-component'
import Modal from './modal'
import moment from 'moment'
import StatusPill from './status-pill'
import { formatCurrency, wrapString } from '@/utils/helper'
import KeyDetailValueComponent from './key-detail-value-component'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  transaction: Record<string, any>
}

export default function TransactionDetailsModal({
  isOpen,
  setIsOpen,
  transaction,
}: Props) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1 className="text-lg">Transaction Details</h1>
        <div className="max-h-[680px] divide-y divide-gray-200 overflow-y-scroll py-3 md:py-6">
          <KeyValueComponent
            name="Date"
            value={moment(transaction?.createdAt).format('LLL')}
            size="sm"
          />
          <KeyValueComponent
            name="Ref"
            value={wrapString(transaction?.reference)}
            size="sm"
          />
          <KeyValueComponent
            name="Desc"
            value={transaction?.description}
            size="sm"
          />
          <KeyValueComponent
            name="Direction"
            value={<StatusPill status={transaction?.direction} size="sm" />}
            size="sm"
          />
          <KeyValueComponent
            name="Name"
            value={`${transaction?.owner?.firstName || ''} ${transaction?.owner?.lastName || ''}`}
            size="sm"
          />
          <KeyValueComponent
            name="Email"
            value={transaction?.owner?.email}
            size="sm"
          />
          <KeyValueComponent
            name="Amount"
            value={formatCurrency(transaction?.sourceAmount)}
            size="sm"
          />
          <KeyValueComponent
            name="Currency"
            value={transaction?.sourceCurrency}
            size="sm"
          />
          <KeyValueComponent name="Fee" value={transaction?.fee} size="sm" />
          <KeyValueComponent name="Rate" value={transaction?.rate} size="sm" />
          <KeyValueComponent name="Type" value={transaction?.type} size="sm" />
          <KeyValueComponent
            name="Status"
            value={<StatusPill status={transaction?.status} size="sm" />}
            size="sm"
          />
          {transaction?.failureReason && (
            <KeyDetailValueComponent
              name="Failure Reason"
              value={transaction?.failureReason}
              size="sm"
            />
          )}
          {transaction?.otherParty && (
            <div className="w-full pt-4">
              <p className="text-center text-xs">Other Party</p>
              <div className="divide-y divide-gray-200">
                <KeyValueComponent
                  name="Name"
                  value={`${transaction?.otherParty?.firstName} ${transaction?.otherParty?.lastName}`}
                  size="sm"
                />
                <KeyValueComponent
                  name="Email"
                  value={transaction?.otherParty?.email}
                  size="sm"
                />
                <KeyValueComponent
                  name="Phone"
                  value={transaction?.otherParty?.phone}
                  size="sm"
                />
                <KeyValueComponent
                  name="Country"
                  value={transaction?.otherParty?.country}
                  size="sm"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
