import { z } from 'zod'

export const earningsSchema = z.object({
  name: z.string(),
  institution: z.string(),
  value: z.number(),
  date: z.string(),
})
