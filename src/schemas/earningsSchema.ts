import { z } from 'zod'

export const earningsSchema = z.object({
  name: z.string(),
  establishmentsOrServices: z.string(),
  value: z.number(),
  date: z.string(),
})
