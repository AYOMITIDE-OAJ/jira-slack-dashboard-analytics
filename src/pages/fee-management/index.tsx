import Button from '@/components/button'
import FormInput from '@/components/form-input'
import Layout from '@/components/layout'
import React, { ChangeEvent, useState } from 'react'

const FeeManagement = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pairs: '',
    buyMarket: '',
    buyRate: '',
    sellMarket: '',
    sellRate: '',
  })
  const [setReqLoading, setSetReqLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value !== '' && isNaN(Number(value))) {
      return
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Layout header="Fee Management" loading={loading}>
      <div className="grid md:grid-cols-3">
        <div className="col-span-1 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white p-4">
          <div className="py-4">
            <h1 className="text-lg font-medium text-gray-600">Update Rates</h1>
          </div>
          <form className="space-y-4 py-4" onSubmit={handleSubmit}>
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
              <Button className="w-1/2" rounded={false} loading={setReqLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default FeeManagement

FeeManagement.auth = true
