import { prisma } from '../database/prisma'

import bcrypt from 'bcryptjs'
import { IUpdateUser, IUser } from '../types/IUser'

export const createUser = async (body: IUser) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (userExists) {
    throw new Error('User already exists.')
  }

  const passwordHash = await bcrypt.hash(body.password, 8)

  await prisma.user.create({ data: { ...body, password: passwordHash } })
}

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

export const updateUser = async (id: string, body: IUpdateUser) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: { ...body },
  })
}

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  })
}
