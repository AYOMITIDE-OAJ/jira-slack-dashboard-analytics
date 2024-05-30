import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import { Roles } from '@/lib/roles'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [iframeSrc, setIframeSrc] = useState<string>()

  const url =
    'https://metabase.palremit.com/public/dashboard/602f36fc-92e6-4bb1-9461-099606b5e892'

  useEffect(() => {
    setIframeSrc(url)
  }, [])

  return (
    <Layout header="Analytics" subhead="Metabase Analytics">
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          allowTransparency
          style={{ minHeight: '600px', width: '100%' }}
          // style={{ width: '100%', height: `calc(100vh - 200px)` }}
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
