export interface IExpenses {
  userId: string
  name: string
  institution: string
  value: number
  date: string
  category?: string
}

export interface IUpdateExpenses {
  name?: string
  institution?: string
  value?: number
  date?: string
  categoriesId?: string
}

export interface IGetExpenses {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
}
