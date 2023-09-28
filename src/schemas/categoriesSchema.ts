import { z } from 'zod'

export const categoriesSchema = z.object({
  name: z.string(),
})