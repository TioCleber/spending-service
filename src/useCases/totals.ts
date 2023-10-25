import { prisma } from '../database/prisma'

const getTotalSpending = async (id: string, gte: string, lt: string) => {
  const totalsSpending = await prisma.spending.findMany({
    where: {
      userId: id,
      date: {
        gte,
        lt,
      },
    },
    select: {
      value: true,
    },
  })

  const total = totalsSpending.reduce((acc, curr) => {
    acc += curr.value

    return acc
  }, 0)

  return total
}

const getTotalRecurringExpenses = async (
  id: string,
  gte: string,
  lt: string
) => {
  const totalsRecurringExpenses = await prisma.recurringExpenses.findMany({
    where: {
      userId: id,
      date: {
        gte,
        lt,
      },
    },
    select: {
      value: true,
    },
  })

  const total = totalsRecurringExpenses.reduce((acc, curr) => {
    acc += curr.value

    return acc
  }, 0)

  return total
}

export const getTotals = async (
  id: string,
  fromDate: string,
  toDate: string
) => {
  const [totalSpending, totalRecurringExpenses] = await Promise.all([
    getTotalSpending(id, fromDate, toDate),
    getTotalRecurringExpenses(id, fromDate, toDate),
  ])

  return { totalSpending, totalRecurringExpenses }
}
