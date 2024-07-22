import Layout from '@/components/layout'
import React, { useState } from 'react'

const Settings = () => {
  return (
    <Layout header="Settings">
      <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 md:mt-10"></div>
    </Layout>
  )
}

export default Settings

Settings.auth = true
