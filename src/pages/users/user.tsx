import Button from '@/components/button'
import Layout from '@/components/layout'
import StatusPill from '@/components/status-pill'
import Table from '@/components/table'
import TransactionDetailsModal from '@/components/transaction-details-modal'
import { cn } from '@/lib/utils'
import DashboardApi from '@/utils/api/dashboard-api'
import { formatCurrency } from '@/utils/helper'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TableColumn } from 'react-data-table-component'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { useSession } from 'next-auth/react'
import { isCRM, isCustomRole, isSuperAdmin } from '@/lib/roles'
import { Roles } from '@/lib/roles'
import withRole from '@/components/page-components/with-role'
import CreditWalletModal from '@/components/page-components/credit-wallet-modal'
import DebitWalletModal from '@/components/page-components/debit-wallet-modal'
import DisableUserModal from '@/components/disable-user-modal'

const User = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user
  const router = useRouter()
  const { id: userId } = router.query

  const [loading, setLoading] = useState(false)
  const [reqLoading, setReqLoading] = useState(false)
  const [user, setUser] = useState<any>()
  const [transactions, setTransactions] = useState([])
  const [balances, setBalances] = useState<any[]>([])
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<
    Record<string, any>
  >({})
  const [creditModalIsOpen, setCreditModalIsOpen] = useState(false)
  const [debitModalIsOpen, setDebitModalIsOpen] = useState(false)
  const [disableModalIsOpen, setDisableModalIsOpen] = useState(false)

  const columns: TableColumn<any>[] = [
    {
      name: 'Amount',
      selector: (row: any) => row,
      cell: (row: any) => (
        <p
          className={cn(
            'flex items-center space-x-1',
            row.direction === 'credit' ? 'text-green-500' : 'text-red-500'
          )}
        >
          {row.direction === 'credit' ? <GoArrowLeft /> : <GoArrowRight />}
          <span>
            {row?.sourceAmount} {row?.sourceCurrency}
          </span>
        </p>
      ),
      minWidth: '200px',
    },
    {
      name: 'Type',
      selector: (row: any) => row?.type,
      cell: (row: any) => <p className="capitalize">{row?.type}</p>,
      minWidth: '150px',
    },
    {
      name: 'Status',
      selector: (row: any) => row?.isActive,
      cell: (row: any) => <StatusPill status={row?.status} />,
      minWidth: '150px',
    },
    {
      name: 'Date / Ref',
      selector: (row: any) => row,
      cell: (row: any) => (
        <div className="flex flex-col space-y-1">
          <p className="text-xs text-neutral-400">
            {moment(row?.createdAt).format('LLL')}
          </p>
          <p className="">{row?.reference}</p>
        </div>
      ),
      width: '300px',
    },
  ]

  const handleRowClick = (row: any) => {
    setSelectedTransaction(row)
    setIsTransactionModalOpen(true)
  }

  const activateUser = async () => {
    setReqLoading(true)
    try {
      const res = await DashboardApi.activateUser(String(userId))
      if (res) {
        handleGenericSuccess('User Activated')
        router.reload()
      }
    } catch (e: any) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  const deactivateUser = async () => {
    setReqLoading(true)
    try {
      const res = await DashboardApi.deactivateUser(String(userId))

      if (res) {
        handleGenericSuccess('User Deactivated')
        router.reload()
      }
    } catch (e: any) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (userId) {
        setLoading(true)
        try {
          const [userRes, transactionsRes, walletsRes] = await Promise.all([
            DashboardApi.getUser(String(userId)),
            DashboardApi.getUserTransactions(String(userId)),
            DashboardApi.getWallets(String(userId)),
          ])
          setUser(userRes)
          setTransactions(transactionsRes)
          setBalances(walletsRes)
        } catch (e: any) {
          handleError(e)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [router.isReady, userId])

  return (
    <Layout header="User Profile" loading={loading}>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-5 md:gap-x-4">
        {user && (
          <div className="col-span-2 rounded-lg bg-transparent">
            <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
              <div className="flex items-center space-x-4 px-3 py-3 md:px-6 md:py-6">
                <div className="relative h-20 w-20 overflow-hidden rounded-full border border-neutral-200">
                  <Image src="/assets/images/avatar.png" alt="Profile" fill />
                </div>
                <div className="space-y">
                  <p className="text-xl font-semibold text-primary">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm font-light">{user?.email}</p>
                </div>
              </div>
              <TabGroup className="px-3 py-3 md:px-6 md:py-6">
                <TabList className="flex gap-4">
                  {['Profile Details', 'Verification'].map((name) => (
                    <Tab
                      key={name}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm/6 font-normal text-gray-700 focus:outline-none data-[hover]:bg-gray-200 data-[selected]:bg-primary data-[selected]:data-[hover]:bg-primary data-[selected]:text-white data-[focus]:outline-1 data-[focus]:outline-primary"
                    >
                      {name}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="mt-3">
                  <TabPanel className="divide-y divide-neutral-200">
                    <div className="space-y-1 py-4">
                      <p>{user?.username}</p>
                      <p className="text-xs font-medium text-neutral-400">
                        Username / User ID
                      </p>
                    </div>
                    <div className="space-y py-4">
                      <p>{user?.phone}</p>
                      <p className="text-xs font-medium text-neutral-400">
                        Phone Number
                      </p>
                    </div>
                    <div className="space-y py-4">
                      <p>{user?.country}</p>
                      <p className="text-xs font-medium text-neutral-400">
                        Country
                      </p>
                    </div>
                    <div className="space-y py-4">
                      <p>{user?.address}</p>
                      <p className="text-xs font-medium text-neutral-400">
                        Address
                      </p>
                    </div>
                    {isSuperAdmin(userSession.role) && (
                      <div className="space-y py-4">
                        <p>
                          {user?.dob
                            ? moment(user?.dob).format('DD/MM/yyyy')
                            : 'Not Provided'}
                        </p>
                        <p className="text-xs font-medium text-neutral-400">
                          Date of Birth
                        </p>
                      </div>
                    )}
                    <div className="space-y py-4">
                      <p>{moment(user?.createdAt).format('LLL')}</p>
                      <p className="text-xs font-medium text-neutral-400">
                        Registration
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel className="divide-y divide-neutral-200">
                    <div className="space-y-2 py-4">
                      <StatusPill
                        status={user?.isActive ? 'active' : 'inactive'}
                        size="sm"
                      />
                      <p className="text-xs font-medium text-neutral-400">
                        Active Status
                      </p>
                    </div>
                    <div className="space-y-2 py-4">
                      <StatusPill
                        status={user?.isVerified ? 'verified' : 'unverified'}
                        size="sm"
                      />
                      <p className="text-xs font-medium text-neutral-400">
                        Verification Status
                      </p>
                    </div>
                    <div className="space-y-2 py-4">
                      <StatusPill
                        status={user?.isKYCVerified ? 'verified' : 'unverified'}
                        size="sm"
                      />
                      <p className="text-xs font-medium text-neutral-400">
                        KYC Status
                      </p>
                    </div>
                    <div className="space-y-2 py-4">
                      <StatusPill
                        status={user?.isBVNVerified ? 'verified' : 'unverified'}
                        size="sm"
                      />
                      <p className="text-xs font-medium text-neutral-400">
                        BVN Status
                      </p>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
            {isCustomRole(userSession.role, [Roles.SuperAdmin, Roles.CRM]) && (
              <>
                {user?.isActive ? (
                  <Button
                    variant="danger"
                    size="md"
                    className="mt-4"
                    rounded={false}
                    onClick={() => setDisableModalIsOpen(true)}
                    loading={reqLoading}
                  >
                    Disable User
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="md"
                    className="mt-4"
                    rounded={false}
                    onClick={activateUser}
                    loading={reqLoading}
                  >
                    Enable User
                  </Button>
                )}
              </>
            )}
          </div>
        )}
        <div className="col-span-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200">
          {isSuperAdmin(userSession?.role) && (
            <div className="px-4 py-4">
              <div className="ml-auto grid w-full grid-cols-2 gap-4 lg:w-2/3">
                <Button
                  variant="success"
                  size="md"
                  rounded={false}
                  onClick={() => setCreditModalIsOpen(true)}
                  loading={reqLoading}
                >
                  Credit Wallet
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  rounded={false}
                  onClick={() => setDebitModalIsOpen(true)}
                  loading={reqLoading}
                >
                  Debit Wallet
                </Button>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 px-3 py-3 md:grid-cols-3">
            {balances.map((balance, index) => (
              <div
                className="flex items-center space-x-2 rounded-lg border border-neutral-200 bg-white p-3"
                key={index}
              >
                <div className="h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={`/assets/svg/currencies/${balance.currency.toLowerCase()}.svg`}
                    alt="Flag"
                    height={40}
                    width={40}
                  />
                </div>
                <div>
                  <p className="text-gray-600">
                    {formatCurrency(
                      balance.availableBalance.split(',').join('')
                    )}{' '}
                    {balance.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Table
              columns={columns}
              data={transactions}
              onRowClicked={handleRowClick}
            />
          </div>
        </div>
      </div>
      <TransactionDetailsModal
        isOpen={isTransactionModalOpen}
        setIsOpen={setIsTransactionModalOpen}
        transaction={selectedTransaction}
      />
      <CreditWalletModal
        isOpen={creditModalIsOpen}
        setIsOpen={setCreditModalIsOpen}
        wallets={balances.map(({ _id, currency }) => ({
          name: currency,
          value: _id,
        }))}
      />
      <DebitWalletModal
        isOpen={debitModalIsOpen}
        setIsOpen={setDebitModalIsOpen}
        wallets={balances.map(({ _id, currency }) => ({
          name: currency,
          value: _id,
        }))}
      />
      <DisableUserModal
        isOpen={disableModalIsOpen}
        setIsOpen={setDisableModalIsOpen}
        user={user}
        deactivateUser={deactivateUser}
      />
    </Layout>
  )
}

export default withRole(User, [Roles.SuperAdmin, Roles.CRM])

User.auth = true
