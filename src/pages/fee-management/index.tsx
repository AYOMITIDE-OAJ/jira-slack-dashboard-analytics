import Button from '@/components/button'
import FormInput from '@/components/form-input'
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import Table from '@/components/table'
import { Roles } from '@/lib/roles'
import DashboardMiscApi from '@/utils/api/dashboard-misc-api'
import { formatCurrency, returnOptionValue } from '@/utils/helper'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'

const FeeManagement = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pair: '',
    buy_markup: '',
    buy: '',
    sell_markup: '',
    sell: '',
  })

  const [rates, setRates] = useState([])
  const [setReqLoading, setSetReqLoading] = useState(false)

  const columns: TableColumn<any>[] = [
    {
      name: 'Pairs',
      selector: (row: any) => row?.pair,
    },
    {
      name: 'Buy Markup',
      selector: (row: any) => row?.buy_markup,
      cell: (row: any) => <p>{row?.buy_markup}</p>,
    },
    {
      name: 'Buy',
      selector: (row: any) => row?.buy,
      cell: (row: any) => formatCurrency(row?.buy),
    },
    {
      name: 'Sell Markup',
      selector: (row: any) => row?.sell_markup,
      cell: (row: any) => <p className="capitalize">{row?.sell_markup}</p>,
    },
    {
      name: 'Sell',
      selector: (row: any) => row?.sell,
      cell: (row: any) => <p className="capitalize">{row?.sell}</p>,
    },
  ]

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const [ratesRes] = await Promise.all([DashboardMiscApi.getRates()])
        setRates(ratesRes)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value !== '' && isNaN(Number(value))) {
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSetReqLoading(true)
    const { pair: rateId, ...rest } = formData

    try {
      await DashboardMiscApi.updateRate(returnOptionValue(rateId), {
        ...rest,
        buy_markup: rest.buy_markup,
        sell_markup: rest.sell_markup,
      })
      handleGenericSuccess('Rate Updated Successfully')
    } catch (e) {
      handleError(e)
    } finally {
      setSetReqLoading(false)
    }
  }

  return (
    <Layout header="Fee Management" loading={loading}>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
        <div className="col-span-1 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white p-4">
          <div className="pb-4">
            <h1 className="text-lg font-medium text-gray-600">Update Rates</h1>
          </div>
          <form className="space-y-4 py-4" onSubmit={handleSubmit}>
            <FormInput
              name="pair"
              label="Pairs"
              value={formData.pair}
              placeholder="BTCNGN"
              type="tel"
              onChange={handleChange}
              disabled={true}
            />
            <FormInput
              name="buy_markup"
              label="Buy Market in %"
              value={formData.buy_markup}
              placeholder="2.0"
              type="tel"
              onChange={handleChange}
            />
            <FormInput
              name="buy"
              label="Buy Rate"
              value={formData.buy}
              placeholder="26035.89"
              type="tel"
              onChange={handleChange}
              disabled={true}
            />
            <FormInput
              name="sell_markup"
              label="Sell Market in %"
              value={formData.sell_markup}
              placeholder="2.0"
              type="tel"
              onChange={handleChange}
            />
            <FormInput
              name="sell"
              label="Sell Rate"
              value={formData.sell}
              placeholder="26035.89"
              type="tel"
              onChange={handleChange}
              disabled={true}
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
          <Table
            columns={columns}
            data={rates}
            onRowClicked={(row: any) => setFormData(row)}
          />
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
