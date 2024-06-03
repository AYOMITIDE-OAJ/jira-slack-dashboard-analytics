import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react'
import Modal from '@/components/modal'
import Input from '@/components/input'
import Select, { SelectOption } from '@/components/select'
import Button from '@/components/button'
import TextArea from '@/components/text-area'
import DashboardApi from '@/utils/api/dashboard-api'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import { returnOptionValue } from '@/utils/helper'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  wallets: SelectOption[]
}

export default function DebitWalletModal({
  isOpen,
  setIsOpen,
  wallets,
}: Props) {
  const [formData, setFormData] = useState({
    wallet: '',
    amount: '',
    action: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)

  const [actions] = useState([
    {
      name: 'Debit Ledger And Available',
      value: 'debit-ledger-and-available',
    },
    // {
    //   name: 'Debit Ledger',
    //   value: 'debit-ledger',
    // },
    // {
    //   name: 'Debit Available',
    //   value: 'debit-available',
    // },
  ])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelect = (option: any, name: string) => {
    const { value } = option
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { wallet: walletId, ...rest } = formData
    try {
      await DashboardApi.adjustWalletBalance(returnOptionValue(walletId), {
        ...rest,
        amount: Number(rest.amount),
        action: returnOptionValue(rest.action),
      })
      handleGenericSuccess('Wallet Debited')
      setIsOpen(false)
    } catch (e: any) {
      handleError(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-1">
          <h1 className="text-lg font-medium">Debit Wallet</h1>
          <p className="text-sm text-gray-400">
            Withdraw funds from user&apos;s wallet
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <Select
            name="Wallet"
            label="Wallet"
            value={formData.wallet}
            options={wallets}
            onChange={(value) => handleSelect(value, 'wallet')}
            variant="dark"
          />
          <Input
            name="amount"
            value={formData.amount}
            placeholder="10000"
            label="Amount"
            onChange={handleChange}
            variant="dark"
          />
          <Select
            name="action"
            label="Action"
            value={formData.action}
            options={actions}
            onChange={(value) => handleSelect(value, 'action')}
            variant="dark"
          />
          <TextArea
            name="reason"
            label="Reason*"
            placeholder="State Reason"
            value={formData.reason}
            onChange={handleChange}
            variant="dark"
          />
        </div>
        <div className="mt-5">
          <Button
            rounded={false}
            className="w-full"
            loading={loading}
            disabled={!(formData.amount && formData.action && formData.reason)}
          >
            Debit Wallet
          </Button>
        </div>
      </form>
    </Modal>
  )
}
