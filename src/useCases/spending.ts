import { prisma } from '../database/prisma'
import { createCategory } from './categories'

import { IGetSpending, ISpending, IUpdateSpending } from '../types/ISpending'

export const createSpending = async (body: ISpending) => {
  const { date, establishmentsOrServices, name, userId, value, category } = body

  if (category) {
    const { res } = await createCategory(category)

    await prisma.spending.create({
      data: {
        date,
        establishmentsOrServices,
        name,
        userId,
        value,
        categoriesId: res.id,
      },
    })
  } else {
    await prisma.spending.create({
      data: {
        date,
        establishmentsOrServices,
        name,
        userId,
        value,
      },
    })
  }
}

export const getSpending = async ({
  id,
  categoryId,
  gte,
  lt,
  page,
  perPage,
}: IGetSpending) => {
  const totalItems = await prisma.spending.count({
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
  })

  const totalItemsPerPage = perPage ?? totalItems

  const currentPage = page ?? 1

  const totalPages = Math.ceil(totalItems / totalItemsPerPage)

  const skip = (currentPage - 1) * totalItemsPerPage

  const spending = await prisma.spending.findMany({
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
    take: perPage,
    skip,
    select: {
      id: true,
      date: true,
      name: true,
      establishmentsOrServices: true,
      value: true,
      categoriesId: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })

  return { spending, currentPage, pages: totalPages, totalItems }
}

export const updateSpending = async (id: string, body: IUpdateSpending) => {
  const { date, establishmentsOrServices, name, value, categoriesId } = body

  await prisma.spending.update({
    where: {
      id,
    },
    data: {
      date,
      establishmentsOrServices,
      name,
      value,
      categoriesId,
    },
  })
}

export const deleteSpending = async (id: string) => {
  await prisma.spending.delete({
    where: {
      id,
    },
  })
}
