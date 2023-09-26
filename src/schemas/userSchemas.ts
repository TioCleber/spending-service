import { z } from 'zod'

export const createUSerSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string(),
  password: z.string(),
  salary: z.number().optional(),
  moneySaved: z.number().optional(),
  earnings: z.number().optional(),
})

export const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string(),
  salary: z.number().optional(),
  moneySaved: z.number().optional(),
  earnings: z.number().optional(),
})
