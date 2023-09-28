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
  categoriesId?: string
}

export interface IGetSpending {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
}
