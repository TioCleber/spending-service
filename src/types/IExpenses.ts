export interface IExpenses {
  userId: string
  name: string
  institution: string
  value: number
  date: string
}

export interface IUpdateExpenses {
  name?: string
  institution?: string
  value?: number
  date?: string
}
