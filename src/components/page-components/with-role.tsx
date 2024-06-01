import { ComponentType } from 'react'
import { Roles } from '@/lib/roles'
import { useSession } from 'next-auth/react'
import Layout from '@/components/layout'
import Link from 'next/link'
import { Routes } from '@/constants/routes'
import { PageLoader } from '@/components/loader'
import Image from 'next/image'

const withRole = (Component: ComponentType, allowedRoles: Roles[]) => {
  const WrappedComponent = (props: any) => {
    const { data: session } = useSession()
    const role = (session?.user as any)?.user?.role

    if (!role) {
      return <PageLoader />
    }

    if (!allowedRoles.includes(role)) {
      return (
        <Layout header="Permission Required">
          <div
            className="flex flex-1 items-center justify-center text-center"
            style={{ width: '100%', height: `calc(100vh - 200px)` }}
          >
            <div>
              <div className="mb-7 flex justify-center">
                <Image
                  src="/assets/svg/permission-required.svg"
                  alt="Permission Required"
                  height={150}
                  width={150}
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-primary">
                  Permission Required
                </h1>
                <p className="text-gray-400">
                  You do not have permission to view this page.
                  <br />
                  Please return to homepage or{' '}
                  <Link href={Routes.Home} className="text-primary">
                    return to homepage
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Layout>
      )
    }

    return <Component {...props} />
  }

  WrappedComponent.displayName = `withRole(${Component.displayName || Component.name || 'Component'})`

  return WrappedComponent
}

export default withRole
