import { z } from 'zod'

export const spendingSchema = z.object({
  name: z.string(),
  institution: z.string(),
  paymentMethod: z.string(),
  value: z.number(),
  date: z.string(),
  category: z.string().optional(),
})

export const updateSpendingSchema = z.object({
  name: z.string().optional(),
  institution: z.string().optional(),
  paymentMethod: z.string().optional(),
  value: z.number().optional(),
  date: z.string().optional(),
  category: z.string().optional(),
})

export const paramsSpendingSchema = z.object({
  categoriesId: z.string().optional(),
})
