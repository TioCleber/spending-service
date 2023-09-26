import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma'

interface User {
  firstName: string
  lastName?: string
  email: string
  password: string
  salary?: number
  moneySaved?: number
  earnings?: number
}

export const createUser = async (body: User) => {
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
