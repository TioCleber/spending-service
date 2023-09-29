import { z } from 'zod'

export const spendingSchema = z.object({
  name: z.string(),
  establishmentsOrServices: z.string(),
  value: z.number(),
  date: z.string(),
  category: z.string().optional(),
})

export const updateSpendingSchema = z.object({
  name: z.string().optional(),
  establishmentsOrServices: z.string().optional(),
  value: z.number().optional(),
  date: z.string().optional(),
  categoriesId: z.string().optional(),
})
