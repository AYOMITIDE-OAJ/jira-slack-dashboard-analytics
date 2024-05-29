import Button from '@/components/button'
import FormInput from '@/components/form-input'
import FormSelect from '@/components/form-select'
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import Table from '@/components/table'
import { Roles } from '@/lib/roles'
import { formatCurrency } from '@/utils/helper'
import React, { ChangeEvent, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const FeeManagement = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pairs: '',
    buyMarket: '',
    buyRate: '',
    sellMarket: '',
    sellRate: '',
  })
  const [pairs, setPairs] = useState([
    { name: 'BTC / USD', value: 'btcusd' },
    { name: 'USDT / USD', value: 'usdtusd' },
    { name: 'NGN / USD', value: 'ngnusd' },
    { name: 'KSH / USD', value: 'kshusd' },
  ])
  const [rates, setRates] = useState([])
  const [setReqLoading, setSetReqLoading] = useState(false)

  const columns: TableColumn<any>[] = [
    {
      name: 'Pairs',
      selector: (row: any) => row?.reference,
    },
    {
      name: 'Buy Markup',
      selector: (row: any) => row?.sourceCurrency,
      cell: (row: any) => <p>{row?.sourceCurrency}</p>,
    },
    {
      name: 'Buy',
      selector: (row: any) => row?.sourceAmount,
      cell: (row: any) => formatCurrency(row?.sourceAmount),
    },
    {
      name: 'Sell Markup',
      selector: (row: any) => row?.direction,
      cell: (row: any) => <p className="capitalize">{row?.direction}</p>,
    },
    {
      name: 'Sell',
      selector: (row: any) => row?.direction,
      cell: (row: any) => <p className="capitalize">{row?.direction}</p>,
    },
  ]

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value !== '' && isNaN(Number(value))) {
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleSelect = (option: any) => {
    const { value } = option
    setFormData({ ...formData, pairs: value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Layout header="Fee Management" loading={loading}>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-1 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="pb-4">
            <h1 className="text-lg font-medium text-gray-600">Update Rates</h1>
          </div>
          <form className="space-y-4 py-4" onSubmit={handleSubmit}>
            <FormSelect
              name="pairs"
              label="Pairs"
              value={formData.pairs}
              options={pairs}
              onChange={handleSelect}
            />
            <FormInput
              name="buyMarket"
              label="Buy Market in %"
              value={formData.buyMarket}
              placeholder="2.0"
              type="tel"
              onChange={handleChange}
            />
            <FormInput
              name="buyRate"
              label="Buy Rate"
              value={formData.buyRate}
              placeholder="26035.89"
              type="tel"
              onChange={handleChange}
            />
            <FormInput
              name="sellMarket"
              label="Sell Market in %"
              value={formData.sellMarket}
              placeholder="2.0"
              type="tel"
              onChange={handleChange}
            />
            <FormInput
              name="sellRate"
              label="Sell Rate"
              value={formData.sellRate}
              placeholder="26035.89"
              type="tel"
              onChange={handleChange}
            />
            <div className="w-full pt-4">
              <Button
                className="w-full md:w-1/2"
                rounded={false}
                loading={setReqLoading}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
            <h1 className="text-base font-normal text-gray-600">
              This percentage will be added to the prices of the pairs when
              updated
            </h1>
          </div>
          <Table columns={columns} data={rates} />
        </div>
      </div>
    </Layout>
  )
}

export default withRole(FeeManagement, [
  Roles.SuperAdmin,
  Roles.Admin,
  Roles.CRM,
])

FeeManagement.auth = true
