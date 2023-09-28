import { prisma } from '../database/prisma'
import { ICategories } from '../types/ICategories'

export const createCategory = async (name: string) => {
  const res = await prisma.categories.create({
    data: {
      name,
    },
  })

  return { res }
}

export const getSpendingCategory = async (id: string) => {
  const spendingCategories = await prisma.categories.findMany({
    where: {
      spending: {
        some: {
          userId: id,
        },
      },
    },
  })

  return { spendingCategories }
}

export const getExpensesCategory = async (id: string) => {
  const expensesCategories = await prisma.categories.findMany({
    where: {
      expenses: {
        some: {
          userId: id,
        },
      },
    },
  })

  return { expensesCategories }
}

export const updateCategory = async (id: string, { name }: ICategories) => {
  await prisma.categories.update({
    where: { id },
    data: {
      name,
    },
  })
}

export const deleteCategory = async (id: string) => {
  await prisma.categories.delete({
    where: {
      id,
    },
  })
}
