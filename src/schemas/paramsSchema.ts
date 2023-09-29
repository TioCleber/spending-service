import { z } from 'zod'

export const paramsSchema = z.object({
  id: z.string().uuid(),
})

export const searchSchema = z.object({
  categoriesId: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  gt: z.string().optional(),
})
