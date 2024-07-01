import createAxiosInstance from '../axios'
import createVanillaAxiosInstance from '../axios-vanilla'

export const axiosInstance = createAxiosInstance()
export const axiosVanillaInstance = createVanillaAxiosInstance()

const DashboardApi = {
  async getDashBoardOverview() {
    const {
      data: { data },
    } = await axiosInstance.get('/overview')

    return data
  },

  async getAllTransactions({
    page = 1,
    limit = 200,
    type,
  }: {
    page?: number
    limit?: number
    type?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/transactions?page=${page}&limit=${limit}${type && `&filters[type]=${type}`}`
    )

    return data
  },

  async getAllUsers({
    page = 1,
    limit = 200,
    search,
  }: {
    page?: number
    limit?: number
    search?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/users?page=${page}&limit=${limit}${search && `&search=${search}`}`
    )

    return data
  },

  async getUser(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/users/${userId}`)

    return data
  },

  async deactivateUser(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.patch(`/users/${userId}/deactivate`)

    return data
  },

  async activateUser(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.patch(`/users/${userId}/activate`)

    return data
  },

  async getUsersKyc({ userId }: { userId?: string }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/kyc?${userId && `userId=${userId}`}`)

    return data
  },

  async getUserTransactions(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/transactions/user/${userId}`)

    return data
  },

  async getWallets(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(`/wallets/user/${userId}`)

    return data
  },

  async getWithdrawalsRequiringApproval(): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get('/withdrawals/requires-approval')

    return data
  },

  async approveWithdrawal(withdrawalId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/withdrawals/${withdrawalId}/approve`)

    return data
  },

  async declineWithdrawal(withdrawalId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/withdrawals/${withdrawalId}/decline`)

    return data
  },

  async adjustWalletBalance(
    walletId: string,
    payload: { amount: number; action: string; reason: string }
  ): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/wallets/${walletId}/adjust`, payload)

    return data
  },

  async changePassword(payload: {
    currentPassword: string
    newPassword: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post('/auth/change-password', payload)

    return data
  },

  async addAdmin(payload: {
    firstName: string
    lastName: string
    email: string
    role: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post('/admin-users', payload)

    return data
  },

  async getAdminUsers(): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get('/admin-users')

    return data
  },

  async activateAdminUser(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.patch(`/admin-users/${userId}/activate`)

    return data
  },

  async deactivateAdminUser(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.patch(`/admin-users/${userId}/deactivate`)

    return data
  },

  async changeAdminUserRole(userId: string, role: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.patch(`/admin-users/${userId}`, { role })

    return data
  },

  async getCards({
    cardType,
    type,
  }: {
    cardType: string
    type?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/cards/${cardType}${type && `&filters[type]=${type}`}`
    )

    return data
  },

  async getCardsByStatus({
    status,
    page = 1,
    limit = 200,
    searchValue,
  }: {
    status: string
    page?: number
    limit?: number
    searchValue?: string
  }): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.get(
      `/cards/${status}?page=${page}&limit=${limit}${searchValue && `&search=${searchValue}`}`
    )

    return data
  },

  async resetUserCredential(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/admin-users/${userId}/reset-password`)

    return data
  },

  async blockUserWithdrawal(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/users/${userId}/withdrawal/block`)

    return data
  },

  async unblockUserWithdrawal(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/users/${userId}/withdrawal/unblock`)

    return data
  },

  async retryKycSubmission(cardId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/cards/requests/${cardId}/retry`)

    return data
  },

  async resetUserTranxPin(userId: string): Promise<any> {
    const {
      data: { data },
    } = await axiosInstance.post(`/users/${userId}/pin/reset`)

    return data
  },

  async updateCardRequestSelfie(
    requestId: string,
    file: FormData
  ): Promise<any> {
    const {
      data: { data },
    } = await axiosVanillaInstance.patch(
      `/cards/requests/${requestId}/selfie`,
      file,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return data
  },
}

export default DashboardApi
