export interface IUser {
  firstName: string
  lastName?: string
  email: string
  password: string
  salary?: number
  moneySaved?: number
}

export interface IUpdateUser {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  salary?: number
  moneySaved?: number
  totalSpent?: number
  totalExpenses?: number
}
