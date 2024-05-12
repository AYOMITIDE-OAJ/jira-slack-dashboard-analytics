import CardLayout from '@/components/card-layout'
import Layout from '@/components/layout'
import { thousandSeparator } from '@/utils/helper'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'

export default function Dashboard() {
  return (
    <Layout header="Dashboard">
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-y-4 xl:grid-cols-4 xl:gap-x-4">
          <CardLayout className="py-5">
            <div className="grid grid-rows-2 gap-5">
              <div className="bg-background flex items-center space-x-3 rounded-lg px-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white"></div>
                <div className="space-y">
                  <p className="text-lg font-semibold text-primary">
                    $ 3,223,234.00
                  </p>
                  <p className="text-xs text-gray-500">Total Balance</p>
                </div>
              </div>
              <div className="bg-background flex items-center space-x-3 rounded-lg px-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white"></div>
                <div className="space-y">
                  <p className="text-lg font-semibold text-primary">
                    $ 3,223.00
                  </p>
                  <p className="text-xs text-gray-500">Total Transactions</p>
                </div>
              </div>
            </div>
          </CardLayout>
          <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3 md:grid-rows-2">
            <CurrencyCard currency="USD" symbol="$" balance={33200.04} />
            <CurrencyCard currency="GBP" symbol="£" balance={33200.24} />
            <CurrencyCard currency="NGN" symbol="₦" balance={453200.24} />
            <CurrencyCard currency="NGN" symbol="₦" balance={453200.24} />
            <CurrencyCard currency="NGN" symbol="₦" balance={453200.24} />
            <CurrencyCard currency="NGN" symbol="₦" balance={453200.24} />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-y-4 md:grid-cols-5 md:gap-x-4 md:gap-y-0">
          <CardLayout className="col-span-2 px-0 py-6">
            <div className="space-y-4">
              <div className="px-5">
                <p className="text-sm font-semibold">Financial Performance</p>
              </div>
              <div className="grid grid-cols-1 gap-3 divide-x divide-gray-200 md:grid-cols-2">
                <div className="space-y px-5">
                  <p className="text-xs">PROFIT</p>
                  <p className="text-lg font-semibold text-green-600">
                    {`$ ${thousandSeparator(22000.54)}`}
                  </p>
                  <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p>
                </div>
                <div className="space-y px-5">
                  <p className="text-xs">LOSS</p>
                  <p className="text-lg font-semibold text-red-500">
                    {`-$ ${thousandSeparator(220.26)}`}
                  </p>
                  {/* <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p> */}
                </div>
              </div>
            </div>
          </CardLayout>
          <CardLayout className="col-span-3 px-0 py-6">
            <div className="space-y-4">
              <div className="px-5">
                <p className="text-sm font-semibold">Card Information</p>
              </div>
              <div className="grid grid-cols-1 gap-3 divide-x divide-gray-200 md:grid-cols-3">
                <div className="space-y px-5">
                  <p className="text-xs">TOTAL AMOUNT ON CARD</p>
                  <p className="text-lg font-semibold text-green-600">
                    {`$ ${thousandSeparator(22000.54)}`}
                  </p>
                  <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p>
                </div>
                <div className="space-y px-5">
                  <p className="text-xs">TOTAL DEPOSIT MADE</p>
                  <p className="text-lg font-semibold text-green-600">
                    {`$ ${thousandSeparator(220.26)}`}
                  </p>
                  {/* <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p> */}
                </div>
                <div className="space-y px-5">
                  <p className="text-xs">TOTAL CREDIT MADE</p>
                  <p className="text-lg font-semibold text-green-600">
                    {`$ ${thousandSeparator(220.26)}`}
                  </p>
                  {/* <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p> */}
                </div>
              </div>
            </div>
          </CardLayout>
        </div>
      </div>
    </Layout>
  )
}

interface CurrencyCardProps {
  currency: string
  symbol?: string
  balance: number
}

const CurrencyCard = ({ currency, symbol, balance }: CurrencyCardProps) => {
  return (
    <CardLayout className="px-5 py-4">
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={`https://kapowaz.github.io/square-flags/flags/${currency.substring(0, 2).toLowerCase()}.svg`}
              alt="Flag"
              height={40}
              width={40}
              priority
            />
          </div>
          <div>
            <p className="text-base font-semibold text-primary">{currency}</p>
          </div>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="">
            <p className="font-medium text-primary">
              {symbol || currency} {thousandSeparator(balance)}
            </p>
            <p className="text-xs text-gray-500">Available Balance</p>
          </div>
          <div>
            <BsArrowRight />
          </div>
        </div>
      </div>
    </CardLayout>
  )
}
