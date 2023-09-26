import { prisma } from '../database/prisma'
import { updateUser } from './user'

import { IExpenses, IUpdateExpenses } from '../types/IExpenses'

export const createExpenses = async (body: IExpenses) => {
  await prisma.expenses.create({
    data: body,
  })

  const expensesValue = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
    select: {
      totalExpenses: true,
    },
  })

  const totalExpenses = Number(expensesValue?.totalExpenses ?? 0)

  const totalExpensesValueUpdated = totalExpenses + body.value

  await updateUser(body.userId, { totalExpenses: totalExpensesValueUpdated })
}

export const getExpenses = async (id: string) => {
  const expenses = await prisma.expenses.findMany({
    where: {
      userId: id,
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
  if (body.value) {
    const expenses = await prisma.expenses.findFirst({
      where: {
        id,
      },
      select: {
        value: true,
      },
    })

    const expensesValue = Number(expenses?.value ?? 0)

    const userTotalExpenses = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        totalExpenses: true,
      },
    })

    const totalSpent = Number(userTotalExpenses?.totalExpenses ?? 0)

    const newTotalExpensesValue = totalSpent - expensesValue + body.value

    await updateUser(userId, { totalExpenses: newTotalExpensesValue })

    await prisma.expenses.update({
      where: {
        id,
      },
      data: { ...body },
    })
  }

  await prisma.expenses.update({
    where: {
      id,
    },
    data: { ...body },
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

  const expensesValue = Number(expenses?.value ?? 0)

  const userTotalExpenses = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      totalExpenses: true,
    },
  })

  const totalExpenses = Number(userTotalExpenses?.totalExpenses ?? 0)

  const totalExpensesValueUpdated = totalExpenses - expensesValue

  await updateUser(userId, { totalExpenses: totalExpensesValueUpdated })

  await prisma.spending.delete({
    where: {
      id,
    },
  })
}
