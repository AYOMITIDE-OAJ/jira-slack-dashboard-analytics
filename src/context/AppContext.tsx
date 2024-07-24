'use client'

import { createContext, useContext, useState } from 'react'

const AppContext = createContext<any>(undefined)

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [jiraIssues, setJiraIssues] = useState([])
  const [slackMessages, setSlackMessages] = useState([])
  const [patterns, setPatterns] = useState([])
  const [issueMentionData, setIssueMentionData] = useState([])
  const [totalSlackMessages, setTotalSlackMessages] = useState<number>()
  const [totalJiraIssues, setTotalJiraIssues] = useState<number>()

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
        totalSlackMessages,
        setTotalSlackMessages,
        totalJiraIssues,
        setTotalJiraIssues,
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
