import Layout from '@/components/layout'
import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Profile from '@/components/page-components/settings-tabs/profile'
import Admin from '@/components/page-components/settings-tabs/admin'
import Password from '@/components/page-components/settings-tabs/password'

const Settings = () => {
  const tabList = ['Profile', 'Admin', 'Password']
  const tabPanels = [
    { id: 1, component: <Profile /> },
    { id: 2, component: <Admin /> },
    { id: 3, component: <Password /> },
  ]

  return (
    <Layout header="Settings">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10">
        <TabGroup>
          <div className="bg-neutral-100 px-5 py-6 md:px-8 md:py-4">
            <TabList className="space-x-5 md:space-x-7">
              {tabList.map((tab, index) => (
                <Tab
                  key={index}
                  className="border-b-2 border-transparent py-2 text-base font-medium text-primary transition-all duration-150 focus:outline-none data-[hover]:border-primary data-[selected]:border-primary"
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
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
