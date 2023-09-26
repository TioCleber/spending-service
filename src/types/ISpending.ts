export interface ISpending {
  userId: string
  name: string
  institution: string
  paymentMethod: string
  value: number
  date: string
}

export interface IUpdateSpending {
  name?: string
  institution?: string
  paymentMethod?: string
  value?: number
  date?: string
}
