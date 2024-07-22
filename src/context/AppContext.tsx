'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [jiraIssues, setJiraIssues] = useState([])
  const [slackMessages, setSlackMessages] = useState([])
  const [patterns, setPatterns] = useState([])
  const [issueMentionData, setIssueMentionData] = useState([])

  return (
    <AppContext.Provider
      value={{
        jiraIssues,
        setJiraIssues,
        slackMessages,
        setSlackMessages,
        patterns,
        setPatterns,
        issueMentionData,
        setIssueMentionData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext }
