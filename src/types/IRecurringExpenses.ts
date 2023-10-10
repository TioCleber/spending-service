export interface IRecurringExpenses {
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

export interface IUpdateRecurringExpenses {
  name?: string
  installments?: number
  missingInstallments?: number
  payday?: string
  establishmentsOrServices?: string
  value?: number
  date?: string
  categoriesId?: string
}

export interface IGetRecurringExpenses {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
  gt?: number
  perPage?: number
  page?: number
  fields?: string
}
