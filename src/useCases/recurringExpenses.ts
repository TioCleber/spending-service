import { prisma } from '../database/prisma'
import { createCategory } from './categories'
import { handleFields } from '../utils/handleFields'

import {
  IRecurringExpenses,
  IGetRecurringExpenses,
  IUpdateRecurringExpenses,
} from '../types/IRecurringExpenses'

export const createRecurringExpenses = async (body: IRecurringExpenses) => {
  const {
    date,
    establishmentsOrServices,
    installments,
    missingInstallments,
    payday,
    name,
    userId,
    value,
    category,
    categoriesId,
  } = body

  const resCategory = category && (await createCategory(category))

  await prisma.recurringExpenses.create({
    data: {
      date,
      establishmentsOrServices,
      installments,
      missingInstallments,
      payday,
      name,
      userId,
      value,
      categoriesId: resCategory ? resCategory.res.id : categoriesId,
    },
  })
}

export const getRecurringExpenses = async ({
  id,
  categoryId,
  gte,
  lt,
  gt,
  page,
  perPage,
  fields,
}: IGetRecurringExpenses) => {
  const totalItems = await prisma.recurringExpenses.count({
    where: {
      OR: [
        {
          categoriesId: categoryId,
          userId: id,
          missingInstallments: {
            gt,
          },
          date: {
            gte,
            lt,
          },
        },
        {
          missingInstallments: null,
        },
      ],
    },
  })

  const totalItemsPerPage = perPage ?? totalItems

  const currentPage = page ?? 1

  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  const skip = (currentPage - 1) * totalItemsPerPage

  const select = handleFields(fields)

  const recurringExpenses = await prisma.recurringExpenses.findMany({
    where: {
      OR: [
        {
          categoriesId: categoryId,
          userId: id,
          missingInstallments: {
            gt,
          },
          date: {
            gte,
            lt,
          },
        },
        {
          missingInstallments: null,
        },
      ],
    },
    take: perPage,
    skip,
    orderBy: {
      date: 'desc',
    },
    select,
  })

  return { recurringExpenses, currentPage, pages: totalPages, totalItems }
}

export const updateRecurringExpenses = async (
  id: string,
  body: IUpdateRecurringExpenses
) => {
  const {
    date,
    establishmentsOrServices,
    name,
    value,
    categoriesId,
    installments,
    missingInstallments,
    payday,
  } = body

  await prisma.recurringExpenses.update({
    where: {
      id,
    },
    data: {
      date,
      establishmentsOrServices,
      name,
      value,
      categoriesId,
      installments,
      missingInstallments,
      payday,
    },
  })
}

export const deleteRecurringExpenses = async (id: string) => {
  await prisma.recurringExpenses.delete({
    where: {
      id,
    },
  })
}
