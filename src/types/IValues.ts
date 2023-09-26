export interface IValues {
  spending: Spending[]
  expenses: Expenses[]
}

type Spending = {
  name: string
  institution: string
  value: number
  date: Date
  id: string
  paymentMethod: string
}

type Expenses = {
  name: string
  institution: string
  value: number
  date: Date
  id: string
}
