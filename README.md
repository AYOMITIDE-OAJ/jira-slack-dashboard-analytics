# Project Documentation

## Table of Contents

1. [Installation and Configuration](#installation-and-configuration)
2. [Component Structure](#component-structure)
3. [State Management](#state-management)
4. [User Flow](#user-flow)

---

## Installation and Configuration

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or higher).
- **Git**: Ensure you have Git installed.

### Steps to Install

1. **Clone the Repository**

   ```bash
   git clone <repository_url>
   cd jira-slack-dashboard-analytics
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env.local` file in the root directory and add the following:

   ```bash
   API_BASE_URL=<YOUR_API_BASE_URL>
   API_MISC_URL=<YOUR_API_MISC_URL>
   HOST_URL=<YOUR_HOST_URL>
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Production Build**
   To create an optimized production build, run:
   ```bash
   npm run build
   npm start
   ```

### Linting and Formatting

This project uses **ESLint** for linting and **Prettier** for code formatting.

- **Linting**:

  ```bash
  npm run lint
  ```

- **Formatting**:
  ```bash
  npm run format
  ```

### Pre-commit Hook

The project uses **Husky** to set up a pre-commit hook that runs linting and build checks before commits are made:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged && npm run build
```

## Component Structure

### Overview

The project adopts a component-based structure. Below is a detailed breakdown of the key components used in the project.

### Key Components

**Dashboard**

- **Path**: `src/pages/dashboard/index.tsx`
- **Usage**: Displays analytical data
- **Dependencies**: Uses subcomponents such as `CardLayout`, `ChartComponent`, etc.

**Jira Issues**

- **Path**: `src/pages/jira-issues/index.tsx`
- **Usage**: Displays and manages Jira issues
- **Dependencies**: Uses `Layout`, `StatusPill`, `Table`, etc.

**Slack Messages**

- **Path**: `src/pages/slack-messages/index.tsx`
- **Usage**: Displays and manages Slack messages
- **Dependencies**: Uses `Layout`, `Button`, `CreateSlackMessageModal`, `Table`, etc.

### Common Components

- **Modal**: Used for creating modals.

  - **Path**: `src/components/modal.tsx`
  - **Dependencies**: Uses `Dialog`, `Transition`, etc.

- **Button**: Standard button component.
  - **Path**: `src/components/button.tsx`
  - **TypeScript Props**:
    ```typescript
    interface Props {
      rounded?: boolean
      onClick?(): void
      children: React.ReactNode
    }
    ```

## State Management

### Context API

The project uses **React Context API** for state management. The main context is defined as `AppContext`.

- **Context File Path**: `src/context/AppContext.tsx`

```tsx
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
```

### Using Context in Components

To use the global state inside a component:

```tsx
import { useGlobalContext } from '@/context/AppContext'

// Example component using global context
const ExampleComponent = () => {
  const { jiraIssues, setJiraIssues } = useGlobalContext()

  return (
    <div>
      {jiraIssues.map((issue) => (
        <div key={issue.id}>{issue.summary}</div>
      ))}
    </div>
  )
}
```

## User Flow

### Authentication

- The application depends on session management provided by `next-auth`.
- **Session Context**: Wrapped inside `SessionProvider` in `_app.tsx`.

### Navigation

- **Sidebar**: Provides links to different sections of the dashboard like "Dashboard", "Jira Issues", "Slack Messages", and "Settings".
  - **Path**: `src/components/sidebar.tsx`

### Dashboard

- Users are redirected to the Dashboard upon successful login.
- **Redirection Logic**:

  ```tsx
  import { useEffect } from 'react'
  import { useRouter } from 'next/router'
  import { Routes } from '@/constants/routes'
  import { PageLoader } from '@/components/loader'

  const Home = () => {
    const router = useRouter()
    useEffect(() => {
      router.push(Routes.Dashboard)
    }, [router])

    return <PageLoader />
  }

  export default Home
  ```

### Data Fetching

- **Data Fetching**: Typically done using Axios instance configured in `src/utils/axios.ts`.

### Form Handling

- **Form Handling**: Managed through `useState` and context API.
- Example:

  ```tsx
  const [formData, setFormData] = useState({ message: '' })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!formData.message) {
        handleGenericError('Message is required')
        return
      }
      await DashboardApi.createSlackMessage(formData.message)
      handleGenericSuccess('Slack Message Created Successfully')
      setIsOpen(false)
    } catch (error) {
      handleError(error)
    }
  }
  ```

### Notifications

- Notifications are managed using `react-toastify`.
- Notification Utility Functions:

  - **File Path**: `src/utils/notify.tsx`

    ```typescript
    import { toast, ToastOptions } from 'react-toastify'

    export const notify = (message: string, options: ToastOptions) => {
      return toast(message, options)
    }

    export const handleError = (error: any) => {
      const e =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        error
      notify(e, { type: 'error' })
    }

    export const handleGenericError = (error: string = 'An error occurred') => {
      toast.error(error)
    }

    export const handleGenericSuccess = (message: string = 'Success') => {
      toast.success(message)
    }

    export const handleGenericInfo = (message: string = 'Heads up!') => {
      toast.info(message)
    }
    ```

### Conclusion

This documentation provides an extensive guide to installing, configuring, understanding the component structure, state management, and user flow in the project. Follow the steps and structures outlined to maintain and extend the project successfully.
