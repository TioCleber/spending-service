import { prisma } from '../database/prisma'

export const getUser = async (id: string) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      earnings: true,
      moneySaved: true,
      salary: true,
      expenses: {
        select: {
          id: true,
          name: true,
          institution: true,
          date: true,
          value: true,
        },
        orderBy: {
          date: 'desc',
        },
      },
      spending: {
        select: {
          id: true,
          name: true,
          institution: true,
          date: true,
          value: true,
          paymentMethod: true,
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  })

  return { user }
}
