import { Routes } from '@/constants/routes'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { SlArrowDown, SlArrowUp } from 'react-icons/sl'

interface Props {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({ setOpen }: Props) {
  const router = useRouter()
  const [selectedAccordion, setSelectedAccordion] = useState<string | null>(
    null
  )

  const toggledAccordion = (name: string) => {
    if (name === selectedAccordion) {
      setSelectedAccordion(null)
      return
    }
    setSelectedAccordion(name)
  }
  const isSelected = (name: string) => name === selectedAccordion

  interface Routes {
    name: string
    route?: string
    subRoutes?: Omit<Routes, 'subRoutes'>[]
  }

  const routes: Routes[] = [
    {
      name: 'Dashboard',
      route: Routes.Dashboard,
    },
    {
      name: 'Jira Issues',
      route: Routes.JiraIssues,
    },
    {
      name: 'Slack Messages',
      route: Routes.SlackMessages,
    },
    {
      name: 'Settings',
      route: Routes.Settings,
    },
  ]

  const joinString = (name: string) => name.split(' ').join('-').toLowerCase()

  return (
    <aside className="fixed z-10 h-screen w-[300px] border-r border-gray-200 bg-white py-6">
      {/*LOGO*/}

      {/*SIDE NAVS*/}
      <div className="mt-8 md:mt-14">
        <div className="w-full">
          {routes.map(({ name, route, subRoutes }, index) => {
            const Wrapper = ({
              href,
              children,
            }: {
              href?: string
              children: JSX.Element
            }) =>
              href ? (
                <Link
                  href={href}
                  onClick={() => {
                    setOpen && setOpen(false)
                  }}
                >
                  {children}
                </Link>
              ) : (
                <div
                  onClick={() => toggledAccordion(name)}
                  className="cursor-pointer"
                >
                  {children}
                </div>
              )
            return (
              <div className="w-full xl:mb-2" key={index}>
                <Wrapper href={route} key={index}>
                  <div
                    className={cn(
                      'group flex w-full items-center justify-between px-9 py-4 text-base font-medium text-neutral-500 transition-all duration-150 hover:bg-[#F8F3AF] hover:text-primary',
                      router.pathname === route && 'bg-[#F8F3AF]'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div>
                        <Image
                          src={`/assets/svg/sidebar-icons/${joinString(name)}.svg`}
                          alt={name}
                          height={20}
                          width={20}
                          style={{ color: 'red' }}
                        />
                      </div>
                      <div>{name}</div>
                    </div>
                    {subRoutes && (
                      <div>
                        {isSelected(name) ? <SlArrowUp /> : <SlArrowDown />}
                      </div>
                    )}
                  </div>
                </Wrapper>
                {subRoutes && (
                  <div
                    style={{
                      height: isSelected(name) ? `180px` : '0px',
                    }}
                    className="overflow-y-hidden transition-all duration-150"
                  >
                    {subRoutes.map(({ name, route }, index) => {
                      return (
                        <Wrapper key={index} href={route}>
                          <div
                            className={cn(
                              'group flex h-12 w-full items-center justify-between pl-[72px] pr-9 text-base font-medium text-neutral-500 transition-all duration-150 hover:bg-[#F8F3AF] hover:text-primary',
                              router.pathname === route && 'bg-[#F8F3AF]'
                            )}
                          >
                            <div>{name}</div>
                          </div>
                        </Wrapper>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
