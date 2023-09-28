import { z } from 'zod'

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string(),
  password: z.string(),
})

export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string(),
  salary: z.number().optional(),
  moneySaved: z.number().optional(),
  totalSpent: z.number().optional(),
  totalExpenses: z.number().optional(),
  totalEarnings: z.number().optional(),
})
