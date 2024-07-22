'use client'

import DashboardApi from '@/utils/api/dashboard-api'
import { handleError } from '@/utils/notify'
import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState([])
  const [isJiraIssuesLoading, setIsJiraIssuesLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        isJiraIssuesLoading,
        setIsJiraIssuesLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalModalContext = () => {
  return useContext(AppContext)
}

export { AppContext }
