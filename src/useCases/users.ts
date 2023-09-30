import { prisma } from '../database/prisma'
import { StatusCodeError } from '../utils/handleErrors'
import bcrypt from 'bcryptjs'

import { IUpdateUser, IUser } from '../types/IUser'

export const createUser = async (body: IUser) => {
  const userExists = await prisma.users.findFirst({
    where: {
      email: body.email,
    },
  })

  if (userExists) {
    throw new StatusCodeError('User already exists.', 409)
  }

  const passwordHash = await bcrypt.hash(body.password, 8)

  await prisma.users.create({
    data: { ...body, password: passwordHash },
  })
}

export const getUser = async (id: string) => {
  const date = new Date()
  const monthId = date.getMonth()
  const year = date.getFullYear()

  const toDate = new Date(`${year}/${monthId + 2}/01`)
  const fromDate = new Date(`${year}/${monthId + 1}/01`)

  const user = await prisma.users.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      moneySaved: true,
      salary: true,
      flags: {
        select: {
          flags: true,
        },
      },
      recurringExpenses: {
        where: {
          date: {
            gte: fromDate.toISOString(),
            lt: toDate.toISOString(),
          },
        },
        select: {
          id: true,
          name: true,
          establishmentsOrServices: true,
          date: true,
          value: true,
        },
        skip: 0,
        take: 3,
        orderBy: {
          date: 'desc',
        },
      },
      spending: {
        where: {
          date: {
            gte: fromDate.toISOString(),
            lt: toDate.toISOString(),
          },
        },
        select: {
          id: true,
          name: true,
          establishmentsOrServices: true,
          date: true,
          value: true,
        },
        skip: 0,
        take: 3,
        orderBy: {
          date: 'desc',
        },
      },
    },
  })

  const response = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    moneySaved: user.moneySaved,
    salary: user.salary,
    flag: user.flags?.flags ?? null,
    recurringExpenses: user.recurringExpenses,
    spending: user.spending,
  }

  return { user: response }
}

export const updateUser = async (id: string, body: IUpdateUser) => {
  await prisma.users.update({
    where: {
      id,
    },
    data: { ...body },
  })
}

export const deleteUser = async (id: string) => {
  await prisma.users.delete({
    where: {
      id,
    },
  })
}
