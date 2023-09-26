import { z } from 'zod'

export const querySchema = z.object({
  id: z.string().uuid().optional(),
})
