import { prisma } from '../database/prisma'

import { IEarnings, IGetEarnings, IUpdateEarnings } from '../types/IEarnings'

export const createEarnings = async (body: IEarnings) => {
  const { date, establishmentsOrServices, name, userId, value } = body

  await prisma.earnings.create({
    data: {
      date,
      establishmentsOrServices,
      name,
      userId,
      value,
    },
  })
}

export const getEarnings = async ({ id, gte, lt }: IGetEarnings) => {
  const earnings = await prisma.earnings.findMany({
    where: {
      OR: [
        {
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
    select: {
      id: true,
      date: true,
      name: true,
      establishmentsOrServices: true,
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

  return { earnings }
}

export const updateEarnings = async (id: string, body: IUpdateEarnings) => {
  const { date, establishmentsOrServices, name, value } = body

  await prisma.earnings.update({
    where: {
      id,
    },
    data: { date, establishmentsOrServices, name, value },
  })
}

export const deleteEarnings = async (id: string) => {
  await prisma.earnings.delete({
    where: {
      id,
    },
  })
}
