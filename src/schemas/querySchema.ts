import { z } from 'zod'

export const querySchema = z.object({
  id: z.string().uuid().optional(),
})

export const totalsQuerySchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
})
