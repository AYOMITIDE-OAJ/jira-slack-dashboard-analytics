import CardLayout from '@/components/card-layout'
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import { Roles } from '@/lib/roles'
import React from 'react'

const Analytics = () => {
  return (
    <Layout header="Analytics" subhead="Metabase Analytics">
      <iframe
        src="http://metabase.palremit.com/public/dashboard/602f36fc-92e6-4bb1-9461-099606b5e892"
        frameBorder="0"
        allowTransparency
        style={{ minHeight: '700px', width: '100%' }}
        // style={{ height: 'calc(100vh-200px)', width: '100%' }}
      ></iframe>
    </Layout>
  )
}

export default withRole(Analytics, [
  Roles.SuperAdmin,
  Roles.Admin,
  Roles.Investor,
  Roles.Marketer,
])
