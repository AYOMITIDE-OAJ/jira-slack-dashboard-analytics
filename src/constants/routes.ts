export enum Routes {
  Login = '/auth/login',
  Logout = '/auth/logout',
  Home = '/',
  Dashboard = '/dashboard',
  Users = '/users',
  User = '/users/user',
  Analytics = '/analytics',
  // TRANSACTIONS
  Transactions = '/transactions',
  AllTransactions = '/transactions/all',
  Deposit = '/transactions/deposit',
  Send = '/transactions/send',
  Swap = '/transactions/swap',
  Withdrawal = '/transactions/withdrawal',
  ApproveWithdrawal = '/transactions/approve-withdrawal',
  // CARD
  Card = '/card',
  Issued = '/card/issued',
  Request = '/card/request',

  Kyc = '/kyc',
  FeeManagement = '/fee-management',
  Settings = '/settings',
}
