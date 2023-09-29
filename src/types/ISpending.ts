export interface ISpending {
  userId: string
  name: string
  establishmentsOrServices: string
  value: number
  date: string
  category?: string
}

export interface IUpdateSpending {
  name?: string
  establishmentsOrServices?: string
  value?: number
  date?: string
  categoriesId?: string
}

export interface IGetSpending {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
}
