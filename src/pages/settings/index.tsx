import Layout from '@/components/layout'
import React, { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Profile from '@/components/page-components/settings-tabs/profile'
import Button from '@/components/button'
import Admin from '@/components/page-components/settings-tabs/admin'
import Password from '@/components/page-components/settings-tabs/password'
import { Roles } from '@/lib/roles'
import { useSession } from 'next-auth/react'

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false)

  const tabList = [
    {
      name: 'Profile',
      allowedRoles: [
        Roles.SuperAdmin,
        Roles.Admin,
        Roles.Investor,
        Roles.Marketer,
      ],
    },
    {
      name: 'Admin',
      allowedRoles: [Roles.SuperAdmin],
    },
    {
      name: 'Password',
      allowedRoles: [
        Roles.SuperAdmin,
        Roles.Admin,
        Roles.Investor,
        Roles.Marketer,
      ],
    },
  ]

  const tabPanels = [
    { id: 1, component: <Profile /> },
    { id: 2, component: <Admin isOpen={isOpen} setIsOpen={setIsOpen} /> },
    { id: 3, component: <Password /> },
  ]
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  return (
    <Layout header="Settings">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <TabGroup onChange={(index) => setSelectedTabIndex(index)}>
          <div className="flex flex-col items-center justify-between bg-neutral-100 px-5 py-6 md:flex-row md:px-8 md:py-4">
            <TabList className="space-x-5 md:space-x-7">
              {tabList.map((tab, index) => (
                <Tab
                  key={index}
                  className="border-b-2 border-transparent py-2 text-base font-medium text-primary transition-all duration-150 focus:outline-none data-[hover]:border-primary data-[selected]:border-primary"
                >
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            {selectedTabIndex === 1 && (
              <Button
                rounded={false}
                size="md"
                className="w-max"
                onClick={() => setIsOpen(true)}
              >
                + Add Admin
              </Button>
            )}
          </div>
          <TabPanels className="bg-white">
            {tabPanels.map(({ component }, index) => (
              <TabPanel key={index}>{component}</TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </Layout>
  )
}

export default Settings

Settings.auth = true
