export interface IExpenses {
  userId: string
  name: string
  installments?: number
  missingInstallments?: number
  payday?: string
  establishmentsOrServices: string
  value: number
  date: string
  category?: string
}

export interface IUpdateExpenses {
  name?: string
  installments?: number
  missingInstallments?: number
  payday?: string
  establishmentsOrServices?: string
  value?: number
  date?: string
  categoriesId?: string
}

export interface IGetExpenses {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
  gt?: number
}
