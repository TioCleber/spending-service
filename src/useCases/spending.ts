import { prisma } from '../database/prisma'

import { ISpending } from '../types/ISpending'

export const createSpending = async (body: ISpending) => {
  await prisma.spending.create({
    data: body,
  })
}

export const getSpending = async (id: string) => {
  const spending = await prisma.spending.findMany({
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

  return { spending }
}

export const updateSpending = async (id: string, body: ISpending) => {
  await prisma.spending.update({
    where: {
      id,
    },
    data: { ...body },
  })
}

export const deleteSpending = async (id: string) => {
  await prisma.spending.delete({
    where: {
      id,
    },
  })
}
