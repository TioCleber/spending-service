import { prisma } from '../database/prisma'
import { updateUser } from './user'

import { IExpenses, IGetExpenses, IUpdateExpenses } from '../types/IExpenses'
import {
  handleSubtractValues,
  handleSumValues,
  handleUpdateValues,
} from '../utils/handleValues'
import { createCategory } from './categories'

export const createExpenses = async (body: IExpenses) => {
  const { date, institution, name, userId, value, category } = body

  const expensesValue = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
    select: {
      totalExpenses: true,
    },
  })

  const totalExpensesValueUpdated = handleSumValues({
    bodyValue: body.value,
    userValue: expensesValue?.totalExpenses,
  })

  await updateUser(body.userId, { totalExpenses: totalExpensesValueUpdated })

  if (category) {
    const { res } = await createCategory(category)

    await prisma.expenses.create({
      data: {
        date,
        institution,
        name,
        userId,
        value,
        categoriesId: res.id,
      },
    })
  } else {
    await prisma.expenses.create({
      data: {
        date,
        institution,
        name,
        userId,
        value,
      },
    })
  }
}

export const getExpenses = async ({
  id,
  categoryId,
  gte,
  lt,
}: IGetExpenses) => {
  const expenses = await prisma.expenses.findMany({
    where: {
      OR: [
        {
          categoriesId: categoryId,
          userId: id,
          date: {
            gte,
            lt,
          },
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
      institution: true,
      value: true,
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

export const updateExpenses = async (
  id: string,
  body: IUpdateExpenses,
  userId: string
) => {
  const { date, institution, name, value, categoriesId } = body

  if (value) {
    const expenses = await prisma.expenses.findFirst({
      where: {
        id,
      },
      select: {
        value: true,
      },
    })

    const userTotalExpenses = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        totalExpenses: true,
      },
    })

    const newTotalExpensesValue = handleUpdateValues({
      bodyValue: value,
      userTotal: userTotalExpenses?.totalExpenses,
      value: expenses?.value,
    })

    await updateUser(userId, { totalExpenses: newTotalExpensesValue })

    await prisma.expenses.update({
      where: {
        id,
      },
      data: { date, institution, name, value, categoriesId },
    })
  }

  await prisma.expenses.update({
    where: {
      id,
    },
    data: { date, institution, name, value, categoriesId },
  })
}

export const deleteExpenses = async (id: string, userId: string) => {
  const expenses = await prisma.expenses.findFirst({
    where: {
      id,
    },
    select: {
      value: true,
    },
  })

  const userTotalExpenses = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      totalExpenses: true,
    },
  })

  const totalExpensesValueUpdated = handleSubtractValues({
    userTotal: userTotalExpenses?.totalExpenses,
    value: expenses?.value,
  })

  await updateUser(userId, { totalExpenses: totalExpensesValueUpdated })

  await prisma.spending.delete({
    where: {
      id,
    },
  })
}
