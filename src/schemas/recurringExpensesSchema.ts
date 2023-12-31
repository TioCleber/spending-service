import { z } from 'zod'

export const recurringExpensesSchema = z.object({
  name: z.string(),
  installments: z.number().optional(),
  missingInstallments: z.number().optional(),
  payday: z.string().optional(),
  establishmentsOrServices: z.string(),
  value: z.number(),
  date: z.string(),
  category: z.string().optional(),
  categoriesId: z.string().optional(),
})

export const updateRecurringExpensesSchema = z.object({
  name: z.string().optional(),
  installments: z.number().optional(),
  missingInstallments: z.number().optional(),
  payday: z.string().optional(),
  establishmentsOrServices: z.string().optional(),
  value: z.number().optional(),
  date: z.string().optional(),
  categoriesId: z.string().optional(),
})
