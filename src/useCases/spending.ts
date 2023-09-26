import { prisma } from '../database/prisma'

import { ISpending, IUpdateSpending } from '../types/ISpending'
import {
  handleSubtractValues,
  handleSumValues,
  handleUpdateValues,
} from '../utils/handleValues'
import { updateUser } from './user'

export const createSpending = async (body: ISpending) => {
  await prisma.spending.create({
    data: body,
  })

  const spentValue = await prisma.user.findUnique({
    where: {
      id: body.userId,
    },
    select: {
      totalSpent: true,
    },
  })

  const totalSpentValueUpdated = handleSumValues({
    bodyValue: body.value,
    userValue: spentValue?.totalSpent,
  })

  await updateUser(body.userId, { totalSpent: totalSpentValueUpdated })
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
      paymentMethod: true,
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

export const updateSpending = async (
  id: string,
  body: IUpdateSpending,
  userId: string
) => {
  if (body.value) {
    const spent = await prisma.spending.findFirst({
      where: {
        id,
      },
      select: {
        value: true,
      },
    })

    const userTotalSpent = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        totalSpent: true,
      },
    })

    const newTotalSpentValue = handleUpdateValues({
      bodyValue: body.value,
      userTotal: userTotalSpent?.totalSpent,
      value: spent?.value,
    })

    await updateUser(userId, { totalSpent: newTotalSpentValue })

    await prisma.spending.update({
      where: {
        id,
      },
      data: { ...body },
    })
  }

  await prisma.spending.update({
    where: {
      id,
    },
    data: { ...body },
  })
}

export const deleteSpending = async (id: string, userId: string) => {
  const spent = await prisma.spending.findFirst({
    where: {
      id,
    },
    select: {
      value: true,
    },
  })

  const userTotalSpent = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      totalSpent: true,
    },
  })

  const totalSpentValueUpdated = handleSubtractValues({
    userTotal: userTotalSpent?.totalSpent,
    value: spent?.value,
  })

  await updateUser(userId, { totalSpent: totalSpentValueUpdated })

  await prisma.spending.delete({
    where: {
      id,
    },
  })
}
