import CardLayout from '@/components/card-layout'
import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import { Roles } from '@/lib/roles'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [iframeSrc, setIframeSrc] = useState<string>()

  useEffect(() => {
    setIframeSrc(
      'http://metabase.palremit.com/public/dashboard/602f36fc-92e6-4bb1-9461-099606b5e892'
    )
  }, [])

  return (
    <Layout header="Analytics" subhead="Metabase Analytics">
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          frameBorder="0"
          allowTransparency
          style={{ minHeight: '700px', width: '100%' }}
          // style={{ height: 'calc(100vh-200px)', width: '100%' }}
        />
      )}
    </Layout>
  )
}

export default withRole(Analytics, [
  Roles.SuperAdmin,
  Roles.Admin,
  Roles.Investor,
  Roles.Marketer,
])
