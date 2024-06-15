import Layout from '@/components/layout'
import withRole from '@/components/page-components/with-role'
import { Roles } from '@/lib/roles'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [iframeSrc, setIframeSrc] = useState<string>()
  const [iframeUserSrc, setIframeUserSrc] = useState<string>()

  const userAnalyticsUrl =
    'https://metabase.palremit.com/public/dashboard/602f36fc-92e6-4bb1-9461-099606b5e892'

  const transactionAnalyticsUrl =
    'https://metabase.palremit.com/public/dashboard/6eec00ec-6e5e-4718-afc1-24716d29eba5'

  useEffect(() => {
    setIframeSrc(userAnalyticsUrl)
    setIframeUserSrc(transactionAnalyticsUrl)
  }, [])

  return (
    <Layout header="Analytics" subhead="Metabase Analytics">
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          allowTransparency
          style={{ minHeight: '650px', width: '100%', overflow: 'auto' }}
          // style={{ width: '100%', height: `calc(100vh - 200px)` }}
        />
      )}{' '}
      <br />
      {iframeUserSrc && (
        <iframe
          src={iframeUserSrc}
          allowTransparency
          style={{ minHeight: '600px', width: '100%' }}
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
