export interface IEarnings {
  userId: string
  name: string
  institution: string
  value: number
  date: string
}

export interface IUpdateEarnings {
  name?: string
  institution?: string
  value: number
  date?: string
}

export interface IGetEarnings {
  id: string
  categoryId?: string | null
  lt?: string
  gte?: string
}
