import { ReactNode, useState } from 'react'
import { FcMenu } from 'react-icons/fc'
import Sidebar from './sidebar'
import Loader from './loader'
import { cn } from '@/lib/utils'
import { TfiClose } from 'react-icons/tfi'

interface Props {
  header: string
  subhead?: string
  children: ReactNode
  loading?: boolean
}

export default function Layout({ header, subhead, children, loading }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="h-screen w-screen">
      <div
        className={cn(
          'fixed z-10 block h-screen w-full backdrop-blur-sm transition-all duration-300 xl:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="relative h-screen w-[335px]">
          <Sidebar />
          <div className="absolute right-0 top-5">
            <TfiClose size={24} onClick={toggleOpen} />
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-5 xl:px-10">
          <div className="flex items-center gap-4 xl:pl-[300px]">
            <div className="xl:hidden">
              <FcMenu size={24} className="text-primary" onClick={toggleOpen} />
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
        <div className="px-5 py-5 md:pr-10 xl:pl-[340px]">
          {loading ? <Loader /> : children}
        </div>
      </div>
    </div>
  )
}
