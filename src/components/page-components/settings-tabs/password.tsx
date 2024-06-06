// import React, { ChangeEvent, FormEvent, useState } from 'react'
// import Input from '../../input'
// import Button from '../../button'
// import { handleError, handleGenericSuccess } from '@/utils/notify'
// import DashboardApi from '@/utils/api/dashboard-api'

// export default function Password() {
//   const [formData, setFormData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   })

//   const [setReqLoading, setSetReqLoading] = useState(false)

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setSetReqLoading(true)

//     handleGenericSuccess('Password Changed Successfully')
//     try {
//       await DashboardApi.changePassword({
//         currentPassword: formData.currentPassword,
//         newPassword: formData.newPassword,
//       })
//     } catch (e) {
//       handleError(e)
//     } finally {
//       setSetReqLoading(false)
//     }
//   }

//   return (
//     <div className="flex w-full justify-center">
//       <div className="min-h-[600px] w-full p-4 md:w-[600px] md:p-8">
//         <form className="mt-4 w-full md:mt-10" onSubmit={handleSubmit}>
//           <div className="space-y-4 md:space-y-6">
//             <Input
//               name="currentPassword"
//               value={formData.currentPassword}
//               placeholder="********"
//               label="Old Password"
//               type="password"
//               onChange={handleChange}
//               variant="dark"
//             />
//             <Input
//               name="newPassword"
//               value={formData.newPassword}
//               placeholder="********"
//               label="New Password"
//               type="password"
//               onChange={handleChange}
//               variant="dark"
//             />
//             <Input
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               placeholder="********"
//               label="Confirm Password"
//               type="password"
//               onChange={handleChange}
//               variant="dark"
//             />
//           </div>
//           <Button
//             loading={setReqLoading}
//             className="mt-7 w-full md:w-max md:px-8"
//             rounded={false}
//           >
//             Change Password
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import Input from '../../input'
import Button from '../../button'
import { handleError, handleGenericSuccess } from '@/utils/notify'
import DashboardApi from '@/utils/api/dashboard-api'

export default function Password() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [reqLoading, setReqLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const { currentPassword, newPassword, confirmPassword } = formData

    if (
      currentPassword.trim() === '' ||
      newPassword.trim() === '' ||
      confirmPassword.trim() === ''
    ) {
      handleError('All fields are required.')
      return false
    }

    if (newPassword !== confirmPassword) {
      handleError('New password and confirm password do not match.')
      return false
    }

    if (currentPassword === newPassword) {
      handleError('New password must be different from the current password.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setReqLoading(true)

    try {
      await DashboardApi.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
      handleGenericSuccess('Password Changed Successfully')
    } catch (e) {
      handleError(e)
    } finally {
      setReqLoading(false)
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-[600px] w-full p-4 md:w-[600px] md:p-8">
        <form className="mt-4 w-full md:mt-10" onSubmit={handleSubmit}>
          <div className="space-y-4 md:space-y-6">
            <Input
              name="currentPassword"
              value={formData.currentPassword}
              placeholder="********"
              label="Old Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="newPassword"
              value={formData.newPassword}
              placeholder="********"
              label="New Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
            <Input
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="********"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              variant="dark"
            />
          </div>
          <Button
            loading={reqLoading}
            className="mt-7 w-full md:w-max md:px-8"
            rounded={false}
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  )
}
