import { prisma } from '../database/prisma'

import { IExpenses } from '../types/IExpenses'

export const createExpenses = async (body: IExpenses) => {
  await prisma.expenses.create({
    data: body,
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

export const updateExpenses = async (id: string, body: IExpenses) => {
  await prisma.expenses.update({
    where: {
      id,
    },
    data: { ...body },
  })
}

export const deleteExpenses = async (id: string) => {
  await prisma.expenses.delete({
    where: {
      id,
    },
  })
}
