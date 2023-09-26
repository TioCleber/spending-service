import { prisma } from '../database/prisma'
import { updateUser } from './user'

import { IExpenses, IUpdateExpenses } from '../types/IExpenses'
import {
  handleSubtractValues,
  handleSumValues,
  handleUpdateValues,
} from '../utils/handleValues'

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

  const totalExpensesValueUpdated = handleSumValues({
    bodyValue: body.value,
    userValue: expensesValue?.totalExpenses,
  })

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

    const userTotalExpenses = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        totalExpenses: true,
      },
    })

    const newTotalExpensesValue = handleUpdateValues({
      bodyValue: body.value,
      userTotal: userTotalExpenses?.totalExpenses,
      value: expenses?.value,
    })

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
