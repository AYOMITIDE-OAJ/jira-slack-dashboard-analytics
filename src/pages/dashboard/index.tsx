import CardLayout from '@/components/card-layout'
import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import TransactionDetailsModal from '@/components/transaction-details-modal'
import User from '@/components/user'
import DashboardApi from '@/utils/api/dashboard-api'
import {formatCurrency, thousandSeparator} from '@/utils/helper'
import moment from 'moment'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {useSession} from "next-auth/react"
import Table from "@/components/table"
import {TableColumn} from 'react-data-table-component'
import {BsArrowRight} from 'react-icons/bs'
import {RiArrowUpSFill} from 'react-icons/ri'
import {isCustomRole, Roles} from "@/lib/roles";

const Dashboard = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user
  console.log(session)
  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState<Record<string, any>>()
  const [balances, setBalances] = useState<Record<string, any>>()
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const handleRowClick = (row: any) => {
    setSelectedTransaction(row)
    setIsOpen(true)
  }

  const CurrencyCard = ({
    currency,
    symbol,
  }: {
    currency: string
    symbol?: string
  }) => {
    return (
      <CardLayout className="px-5 py-4">
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={`/assets/svg/${currency.toLowerCase()}.svg`}
                alt="Flag"
                height={40}
                width={40}
              />
            </div>
            <div>
              <p className="text-base font-semibold text-primary">{currency}</p>
            </div>
          </div>
          <div className="flex w-full items-end justify-between">
            {balances && (
              <div className="">
                <p className="font-medium text-primary">
                  {symbol && symbol}{' '}
                  {formatCurrency(balances[currency].balance)}{' '}
                  {!symbol && currency}
                </p>
                <p className="text-xs text-gray-500">Available Balance</p>
              </div>
            )}
            <div>
              <BsArrowRight />
            </div>
          </div>
        </div>
      </CardLayout>
    )
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Date',
      selector: (row: any) => moment(row?.createdAt).format('LLL'),
      minWidth: '200px',
    },
    {
      name: 'Name',
      selector: (row: any) => row?.owner,
      cell: (row: any) => <User user={row.owner} />,
      width: '250px',
    },
    {
      name: 'Reference',
      selector: (row: any) => row?.reference,
      width: '300px',
    },
    {
      name: 'Currency',
      selector: (row: any) => row?.sourceCurrency,
      cell: (row: any) => <p>{row?.sourceCurrency}</p>,
    },
    {
      name: 'Amount',
      selector: (row: any) => row?.sourceAmount,
      cell: (row: any) => formatCurrency(row?.sourceAmount),
    },
    {
      name: 'Direction',
      selector: (row: any) => row?.direction,
      cell: (row: any) => <p className="capitalize">{row?.direction}</p>,
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => <StatusPill status={row.status} />,
    },
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const [overviewRes, transactionsRes] = await Promise.all([
          DashboardApi.getDashBoardOverview(),
          DashboardApi.getAllTransactions({ page: 1, limit: 20 }),
        ])

        setOverview(overviewRes.counts)
        const transformedBalances = overviewRes.balances.reduce(
          (acc: any, balance: any) => {
            acc[balance.currency] = {
              currency: balance.currency,
              balance: balance.totalAmount['$numberDecimal'],
            }
            return acc
          },
          {}
        )
        setBalances(transformedBalances)
        setTransactions(transactionsRes.records)
      } catch (err) {
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Layout header="Dashboard" loading={loading}>
      <div className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-y-4 xl:grid-cols-4 xl:gap-x-4">
          <CardLayout className="py-5">
            <div className="grid grid-rows-2 gap-5">
              <div className="flex items-center space-x-3 rounded-lg bg-background px-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <svg
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.8283 0C10.1893 0 6.87415 1.20199 4.91246 2.18404C4.73522 2.27266 4.57007 2.35967 4.41619 2.44345C4.11167 2.60941 3.85226 2.76409 3.64602 2.90024L5.87759 6.18557L6.92813 6.60369C11.0336 8.67494 16.5392 8.67494 20.6455 6.60369L21.8378 5.98497L23.9477 2.90024C23.5107 2.6151 23.0562 2.3576 22.587 2.12926C20.635 1.15768 17.3988 0 13.8291 0M8.63927 3.71875C7.84904 3.57089 7.06856 3.37503 6.30216 3.13226C8.13978 2.31616 10.8781 1.45012 13.8291 1.45012C15.873 1.45012 17.8056 1.86582 19.404 2.3927C17.5309 2.65614 15.5322 3.10326 13.6277 3.6535C12.1292 4.08692 10.3778 4.0402 8.63927 3.71875ZM21.497 7.79843L21.2988 7.89832C16.7825 10.1766 10.7919 10.1766 6.27557 7.89832L6.08786 7.80326C-0.697899 15.248 -5.87805 29 13.8283 29C33.5346 29 28.2288 14.9926 21.497 7.79843ZM12.9912 14.5012C12.5639 14.5012 12.1541 14.671 11.8519 14.9731C11.5498 15.2753 11.38 15.6851 11.38 16.1125C11.38 16.5398 11.5498 16.9496 11.8519 17.2518C12.1541 17.5539 12.5639 17.7237 12.9912 17.7237V14.5012ZM14.6025 12.89V12.0843H12.9912V12.89C12.1366 12.89 11.3169 13.2295 10.7126 13.8338C10.1083 14.4381 9.76875 15.2578 9.76875 16.1125C9.76875 16.9671 10.1083 17.7868 10.7126 18.3911C11.3169 18.9954 12.1366 19.3349 12.9912 19.3349V22.5574C12.2903 22.5574 11.6934 22.1103 11.471 21.4835C11.438 21.381 11.3848 21.2861 11.3145 21.2045C11.2442 21.1229 11.1583 21.0562 11.0617 21.0084C10.9652 20.9606 10.8601 20.9326 10.7526 20.9261C10.645 20.9196 10.5373 20.9348 10.4357 20.9707C10.3342 21.0065 10.2408 21.0624 10.1612 21.135C10.0817 21.2076 10.0174 21.2954 9.97237 21.3933C9.92731 21.4911 9.90233 21.597 9.8989 21.7047C9.89548 21.8123 9.91368 21.9196 9.95243 22.0201C10.1747 22.6484 10.5862 23.1925 11.1304 23.5773C11.6746 23.962 12.3247 24.1687 12.9912 24.1687V24.9743H14.6025V24.1687C15.4571 24.1687 16.2768 23.8292 16.8811 23.2248C17.4855 22.6205 17.825 21.8008 17.825 20.9462C17.825 20.0915 17.4855 19.2719 16.8811 18.6675C16.2768 18.0632 15.4571 17.7237 14.6025 17.7237V14.5012C15.3034 14.5012 15.9003 14.9483 16.1227 15.5751C16.1557 15.6776 16.2089 15.7725 16.2792 15.8541C16.3495 15.9358 16.4355 16.0025 16.532 16.0503C16.6285 16.0981 16.7336 16.1261 16.8412 16.1325C16.9487 16.139 17.0564 16.1239 17.158 16.088C17.2596 16.0521 17.3529 15.9962 17.4325 15.9236C17.5121 15.851 17.5763 15.7632 17.6214 15.6654C17.6664 15.5675 17.6914 15.4617 17.6948 15.354C17.6982 15.2463 17.68 15.1391 17.6413 15.0386C17.4191 14.4102 17.0075 13.8662 16.4633 13.4814C15.9191 13.0966 15.269 12.89 14.6025 12.89ZM14.6025 19.3349V22.5574C15.0298 22.5574 15.4396 22.3877 15.7418 22.0855C16.044 21.7833 16.2137 21.3735 16.2137 20.9462C16.2137 20.5189 16.044 20.109 15.7418 19.8069C15.4396 19.5047 15.0298 19.3349 14.6025 19.3349Z"
                      fill="#F1D017"
                    />
                  </svg>
                </div>
                <div className="space-y">
                  <p className="text-xl font-semibold text-primary">
                    $ {thousandSeparator(overview?.totalTransactions) || '--'}
                  </p>
                  <p className="text-xs text-gray-500">Total Balance</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-background px-4 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <svg
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.3125 0C21.5557 0 22.748 0.402988 23.6271 1.12031C24.5061 1.83763 25 2.81053 25 3.82498V24.2249C24.9998 24.465 24.9165 24.7002 24.7597 24.9034C24.6029 25.1066 24.379 25.2696 24.1136 25.3735C23.8483 25.4774 23.5525 25.5181 23.2601 25.4908C22.9677 25.4635 22.6907 25.3694 22.4609 25.2194L19.5312 23.3069L16.6016 25.2194C16.3014 25.4156 15.9231 25.5146 15.5391 25.4974C15.1551 25.4802 14.7924 25.3481 14.5203 25.1263L12.5 23.4777L10.4797 25.1263C10.2078 25.3483 9.84517 25.4806 9.46116 25.498C9.07715 25.5154 8.69877 25.4167 8.39844 25.2206L5.46875 23.3069L2.53906 25.2194C2.30933 25.3694 2.03233 25.4635 1.73994 25.4908C1.44755 25.5181 1.15167 25.4774 0.886358 25.3735C0.621047 25.2696 0.397095 25.1066 0.240285 24.9034C0.0834753 24.7002 0.000183813 24.465 0 24.2249V3.82498C0 2.81053 0.49386 1.83763 1.37294 1.12031C2.25201 0.402988 3.4443 0 4.6875 0H20.3125ZM12.5 12.7499H7.8125C7.3981 12.7499 7.00067 12.8843 6.70765 13.1234C6.41462 13.3625 6.25 13.6868 6.25 14.0249C6.25 14.3631 6.41462 14.6874 6.70765 14.9265C7.00067 15.1656 7.3981 15.2999 7.8125 15.2999H12.5C12.9144 15.2999 13.3118 15.1656 13.6049 14.9265C13.8979 14.6874 14.0625 14.3631 14.0625 14.0249C14.0625 13.6868 13.8979 13.3625 13.6049 13.1234C13.3118 12.8843 12.9144 12.7499 12.5 12.7499ZM17.1875 7.64996H7.8125C7.41425 7.65032 7.0312 7.77475 6.74161 7.99784C6.45202 8.22092 6.27776 8.52582 6.25442 8.85023C6.23108 9.17464 6.36043 9.49408 6.61604 9.74328C6.87165 9.99248 7.23423 10.1526 7.62969 10.191L7.8125 10.1999H17.1875C17.5857 10.1996 17.9688 10.0751 18.2584 9.85206C18.548 9.62898 18.7222 9.32408 18.7456 8.99967C18.7689 8.67526 18.6396 8.35582 18.384 8.10662C18.1284 7.85742 17.7658 7.69726 17.3703 7.65888L17.1875 7.64996Z"
                      fill="#F1D017"
                    />
                  </svg>
                </div>
                <div className="space-y">
                  <p className="text-xl font-semibold text-primary">
                    {thousandSeparator(overview?.transactions)}
                  </p>
                  <p className="text-xs text-gray-500">Total Transactions</p>
                </div>
              </div>
            </div>
          </CardLayout>
          {
            <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3 md:grid-rows-2">
              {balances && (
                <>
                  <CurrencyCard currency="USD" symbol="$" />
                  <CurrencyCard currency="KES" symbol="KSh" />
                  <CurrencyCard currency="NGN" symbol="₦" />
                  <CurrencyCard currency="BTC" />
                  <CurrencyCard currency="USDT" />
                  <CurrencyCard currency="ETH" />
                </>
              )}
            </div>
          }
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
          <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-2">
            <CardLayout className="px-8 py-10">
              <div className="flex h-full w-full items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200">
                  <svg
                    width="30"
                    height="28"
                    viewBox="0 0 30 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.2481 5.84113C4.2481 4.29197 4.8635 2.80625 5.95893 1.71083C7.05435 0.615403 8.54007 0 10.0892 0C11.6384 0 13.1241 0.615403 14.2195 1.71083C15.315 2.80625 15.9304 4.29197 15.9304 5.84113C15.9304 7.3903 15.315 8.87601 14.2195 9.97144C13.1241 11.0669 11.6384 11.6823 10.0892 11.6823C8.54007 11.6823 7.05435 11.0669 5.95893 9.97144C4.8635 8.87601 4.2481 7.3903 4.2481 5.84113ZM18.0544 9.02721C18.0544 8.39961 18.178 7.77815 18.4182 7.19832C18.6584 6.61849 19.0104 6.09165 19.4542 5.64787C19.898 5.20408 20.4248 4.85206 21.0046 4.61189C21.5845 4.37171 22.2059 4.2481 22.8335 4.2481C23.4611 4.2481 24.0826 4.37171 24.6624 4.61189C25.2422 4.85206 25.7691 5.20408 26.2129 5.64787C26.6567 6.09165 27.0087 6.61849 27.2488 7.19832C27.489 7.77815 27.6126 8.39961 27.6126 9.02721C27.6126 10.2947 27.1091 11.5103 26.2129 12.4065C25.3166 13.3028 24.101 13.8063 22.8335 13.8063C21.566 13.8063 20.3504 13.3028 19.4542 12.4065C18.5579 11.5103 18.0544 10.2947 18.0544 9.02721ZM0 23.8955C3.9873e-08 21.2197 1.06297 18.6535 2.95507 16.7614C4.84717 14.8693 7.4134 13.8063 10.0892 13.8063C12.7651 13.8063 15.3313 14.8693 17.2234 16.7614C19.1155 18.6535 20.1785 21.2197 20.1785 23.8955V23.8998L20.177 24.0683C20.174 24.2484 20.1253 24.4248 20.0354 24.5808C19.9455 24.7369 19.8173 24.8675 19.663 24.9604C16.7732 26.7007 13.4626 27.6178 10.0892 27.6126C6.5888 27.6126 3.3121 26.6441 0.516852 24.9604C0.362294 24.8677 0.233882 24.7371 0.143708 24.581C0.0535349 24.425 0.00456719 24.2485 0.0014161 24.0683L0 23.8955ZM22.3025 23.8998L22.3011 24.1037C22.2932 24.5757 22.1805 25.04 21.9712 25.4631C24.4431 25.6156 26.9123 25.1227 29.1363 24.0329C29.3083 23.9488 29.4544 23.8198 29.559 23.6596C29.6637 23.4993 29.7232 23.3137 29.731 23.1224C29.781 21.9347 29.5234 20.7542 28.9832 19.6952C28.4431 18.6363 27.6386 17.7348 26.6477 17.0781C25.6568 16.4213 24.5131 16.0316 23.3274 15.9466C22.1417 15.8617 20.9541 16.0843 19.8797 16.5931C21.456 18.701 22.3057 21.2635 22.3011 23.8955L22.3025 23.8998Z"
                      fill="#E0C11F"
                    />
                  </svg>
                </div>
                <div className="space-y">
                  <p className="text-xl font-semibold text-primary">
                    {thousandSeparator(overview?.totalUsers)}
                  </p>
                  <p className="text-xs text-gray-500">Total Users</p>
                </div>
              </div>
            </CardLayout>
            <CardLayout className="px-8 py-10">
              <div className="flex h-full w-full items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200">
                  <svg
                    width="26"
                    height="27"
                    viewBox="0 0 26 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.0271 5.16996C24.914 5.05366 24.7756 4.95964 24.6204 4.89377C24.4652 4.8279 24.2965 4.7916 24.125 4.78714C21.4608 4.72438 18.0896 2.1576 15.8607 1.15034C14.4839 0.530092 13.5749 0.121123 12.8923 0.0133897C12.7537 -0.00480721 12.6129 -0.00445475 12.4744 0.0144357C11.7918 0.122169 10.8828 0.531138 9.50719 1.15139C7.27829 2.1576 3.90708 4.72438 1.24285 4.78714C1.07123 4.79183 0.902519 4.82823 0.74716 4.89408C0.591801 4.95993 0.453108 5.05383 0.33968 5.16996C0.104569 5.40962 -0.0167362 5.72286 0.00186201 6.04228C0.574178 16.5259 4.74756 23.014 12.0704 26.7846C12.2608 26.8819 12.4721 26.9321 12.6822 26.9321C12.8923 26.9321 13.1036 26.8819 13.2952 26.7846C20.618 23.014 24.7902 16.5259 25.3637 6.04228C25.3834 5.72291 25.2624 5.40943 25.0271 5.16996ZM19.2041 9.29312L13.0247 17.5091C12.8029 17.8041 12.4547 17.9997 12.1099 17.9997C11.7639 17.9997 11.3797 17.8292 11.1371 17.6106L6.78143 13.6851C6.63922 13.5565 6.55938 13.3823 6.55938 13.2008C6.55938 13.0193 6.63922 12.8451 6.78143 12.7165L7.85757 11.7448C8.0006 11.6172 8.19376 11.5456 8.39506 11.5456C8.59636 11.5456 8.78952 11.6172 8.93255 11.7448L11.7651 14.297L16.6861 7.75242C16.8 7.60266 16.975 7.49957 17.1729 7.46567C17.3708 7.43177 17.5756 7.4698 17.7425 7.57147L19.0021 8.3413C19.1685 8.44372 19.2831 8.60132 19.321 8.77967C19.3588 8.95801 19.3168 9.1426 19.2041 9.29312Z"
                      fill="#E0C11D"
                    />
                  </svg>
                </div>
                <div className="space-y">
                  <p className="text-xl font-semibold text-primary">
                    {thousandSeparator(overview?.verifiedUsers)}
                  </p>
                  <p className="text-xs text-gray-500">Verified Users</p>
                </div>
              </div>
            </CardLayout>
          </div>
          {/* <CardLayout className="col-span-3 px-0 py-6">
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
                  <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p>
                </div>
                <div className="space-y px-5">
                  <p className="text-xs">TOTAL CREDIT MADE</p>
                  <p className="text-lg font-semibold text-green-600">
                    {`$ ${thousandSeparator(220.26)}`}
                  </p>
                  <p className="flex items-start text-xs font-light">
                    <span className="text-base">
                      <RiArrowUpSFill className="text-green-600" />
                    </span>{' '}
                    <span className="text-gray-400">25% since last month</span>
                  </p>
                </div>
              </div>
            </div>
          </CardLayout> */}
        </div>
      </div>
      {isCustomRole(userSession.role, [Roles.SuperAdmin]) &&<div className="mt-10">
        <div className="rounded-sm border border-gray-200 bg-neutral-100 px-4 py-6">
          <h1 className="text-base font-medium text-gray-600">
            Recent Transactions
          </h1>
        </div>
        <Table
            columns={columns}
            data={transactions}
            onRowClicked={handleRowClick}
        />
      </div>}
      <TransactionDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        transaction={selectedTransaction}
      />
    </Layout>
  )
}

export default Dashboard

Dashboard.auth = true
