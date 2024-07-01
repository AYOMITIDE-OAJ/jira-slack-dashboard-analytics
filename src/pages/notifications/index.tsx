import Layout from '@/components/layout'
import React, { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Button from '@/components/button'
import { Roles, isSuperAdmin } from '@/lib/roles'
import { useSession } from 'next-auth/react'

const Notifications = () => {
  const { data: session } = useSession()
  const userSession = (session?.user as any)?.user

  return (
    <Layout header="Notifications">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10"></div>
    </Layout>
  )
}

export default Notifications

Notifications.auth = true
