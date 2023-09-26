import { prisma } from '../database/prisma'

import { IExpenses, IUpdateExpenses } from '../types/IExpenses'
import { updateUser } from './user'

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

  await prisma.user.update({
    where: {
      id: body.userId,
    },
    data: {
      totalExpenses: totalExpensesValueUpdated,
    },
  })
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

export const updateExpenses = async (id: string, body: IUpdateExpenses) => {
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
        id,
      },
      select: {
        totalExpenses: true,
      },
    })

    const totalExpenses = Number(userTotalExpenses?.totalExpenses ?? 0)

    const newTotalExpensesValue = expensesValue - totalExpenses + body.value

    await updateUser(id, { totalExpenses: newTotalExpensesValue })

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

export const deleteExpenses = async (id: string) => {
  const expenses = await prisma.expenses.findFirst({
    where: {
      id,
    },
    select: {
      value: true,
    },
  })

  const spentValue = Number(expenses?.value ?? 0)

  const userTotalExpenses = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      totalExpenses: true,
    },
  })

  const totalExpenses = Number(userTotalExpenses?.totalExpenses ?? 0)

  const totalExpensesValueUpdated = totalExpenses - spentValue

  await updateUser(id, { totalExpenses: totalExpensesValueUpdated })

  await prisma.expenses.delete({
    where: {
      id,
    },
  })
}
