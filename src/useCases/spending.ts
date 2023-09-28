import { prisma } from '../database/prisma'

import { ISpending, IUpdateSpending } from '../types/ISpending'
import {
  handleSubtractValues,
  handleSumValues,
  handleUpdateValues,
} from '../utils/handleValues'
import { createCategory } from './categories'
import { updateUser } from './user'

export const createSpending = async (body: ISpending) => {
  const { date, institution, name, paymentMethod, userId, value, category } =
    body

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

  if (category) {
    const { res } = await createCategory(category)

    console.log(res, category)

    await prisma.spending.create({
      data: {
        date,
        institution,
        name,
        paymentMethod,
        userId,
        value,
        categoriesId: res.id,
      },
    })
  } else {
    console.log('caiu aqui')

    await prisma.spending.create({
      data: {
        date,
        institution,
        name,
        paymentMethod,
        userId,
        value,
      },
    })
  }
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
  const { date, institution, name, paymentMethod, value } = body

  if (value) {
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
      bodyValue: value,
      userTotal: userTotalSpent?.totalSpent,
      value: spent?.value,
    })

    await updateUser(userId, { totalSpent: newTotalSpentValue })

    await prisma.spending.update({
      where: {
        id,
      },
      data: {
        date,
        institution,
        name,
        paymentMethod,
        userId,
        value,
      },
    })
  }

  await prisma.spending.update({
    where: {
      id,
    },
    data: {
      date,
      institution,
      name,
      paymentMethod,
      userId,
      value,
    },
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
