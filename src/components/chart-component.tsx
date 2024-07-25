import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

interface ChartComponentProps {
  patterns: Pattern[]
  issueMentionData: MentionedIssue[]
}

const ChartComponent: React.FC<ChartComponentProps> = ({ patterns, issueMentionData }) => {
  // Prepare data for the chart
  const issueData = issueMentionData?.map(issue => ({
    ...issue,
    issue: issue?.issue,
    count: issue?.count,
  }));

  // Example processing for patterns if needed (you can customize this part)
  const patternData = patterns?.map(pattern => ({
    issue: pattern?.mentionedIssues?.join(', '),
    count: pattern?.mentionedIssues?.length, // This is just an example; adjust based on your needs
  }));

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...issueData, ...patternData]} // Combine issue data and pattern data
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="issue" />
          <YAxis tickFormatter={(value) => Math.floor(value).toString()} />
          <Tooltip />
          <Legend />
          <Bar className='px-8' dataKey="count" fill="#255c57" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartComponent
