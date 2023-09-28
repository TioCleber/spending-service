import { z } from 'zod'

export const expensesSchema = z.object({
  name: z.string(),
  institution: z.string(),
  value: z.number(),
  date: z.string(),
})

export const updateExpensesSchema = z.object({
  name: z.string().optional(),
  institution: z.string().optional(),
  value: z.number().optional(),
  date: z.string().optional(),
})
