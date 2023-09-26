import { z } from 'zod'

export const spendingSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  institution: z.string(),
  paymentMethod: z.string(),
  value: z.number(),
  date: z.string(),
})
