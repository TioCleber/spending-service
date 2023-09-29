import { prisma } from '../database/prisma'
import { createCategory } from './categories'

import { IExpenses, IGetExpenses, IUpdateExpenses } from '../types/IExpenses'

export const createRecurringExpenses = async (body: IExpenses) => {
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
  } = body

  if (category) {
    const { res } = await createCategory(category)

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
        categoriesId: res.id,
      },
    })
  } else {
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
      },
    })
  }
}

export const getRecurringExpenses = async ({
  id,
  categoryId,
  gte,
  lt,
  gt,
}: IGetExpenses) => {
  const expenses = await prisma.recurringExpenses.findMany({
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
    orderBy: {
      date: 'desc',
    },
    select: {
      id: true,
      date: true,
      name: true,
      establishmentsOrServices: true,
      value: true,
      installments: true,
      missingInstallments: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  return { expenses }
}

export const updateRecurringExpenses = async (
  id: string,
  body: IUpdateExpenses
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
