import { z } from 'zod'

export const sessionsSchema = z.object({
  email: z.string(),
  password: z.string(),
})
