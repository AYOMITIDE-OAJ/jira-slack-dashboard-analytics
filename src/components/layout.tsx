import { ReactNode } from 'react'
import { FcMenu } from 'react-icons/fc'
import Sidebar from './sidebar'
import Loader from './loader'

interface Props {
  header: string
  subhead?: string
  children: ReactNode
  loading?: boolean
}

export default function Layout({ header, subhead, children, loading }: Props) {
  return (
    <div className="h-screen w-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-5 md:px-10">
          <div className="flex items-center gap-4 md:pl-[300px]">
            <div className="xl:hidden">
              <FcMenu size={24} className="text-primary" />
            </div>
            <div className="block">
              <h1 className="text-xl font-medium text-primary">{header}</h1>
              {subhead && <p className="text-sm text-gray-500">{subhead}</p>}
            </div>
          </div>
          <div className="flex">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-400"></div>
          </div>
        </div>
        <div className="px-5 py-5 md:pl-[340px] md:pr-10">
          {loading ? <Loader /> : children}
        </div>
      </div>
    </div>
  )
}
