interface MentionedIssue {
  issue: string
  count: number
}

interface Pattern {
  id: number
  userId: string
  message: string
  timestamp: string
  mentionedIssues: string[]
}

interface ApiResponse {
  data: {
    patterns: Pattern[]
    issueMentionData: MentionedIssue[]
  }
  status: number
  message: string
}
