import { z } from 'zod'

export const spendingSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  institution: z.string(),
  paymentMethod: z.string(),
  value: z.number(),
  date: z.string(),
})

export const updateSpendingSchema = z.object({
  name: z.string().optional(),
  institution: z.string().optional(),
  paymentMethod: z.string().optional(),
  value: z.number().optional(),
  date: z.string().optional(),
})
