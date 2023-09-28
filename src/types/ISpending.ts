export interface ISpending {
  userId: string
  name: string
  institution: string
  paymentMethod: string
  value: number
  date: string
  category?: string
}

export interface IUpdateSpending {
  name?: string
  institution?: string
  paymentMethod?: string
  value?: number
  date?: string
  category?: string
}
