export interface IUser {
  firstName: string
  lastName?: string
  email: string
  password: string
  salary?: number
  moneySaved?: number
  earnings?: number
}

export interface IUpdateUser {
  firstName: string
  lastName?: string
  email: string
  password?: string
  salary?: number
  moneySaved?: number
  earnings?: number
}