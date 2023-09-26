import { prisma } from '../database/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { SECRET } from '../config/config'
import { ISessions } from '../types/ISessions'

export const createSessions = async ({ email, password }: ISessions) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      password: true,
    },
  })

  if (!user) {
    throw new Error('User not found.')
  }

  const validatePassword = await bcrypt.compare(password, user.password)

  const { id, firstName, lastName } = user

  if (!validatePassword) {
    throw new Error('Password invalid.')
  }

  const response = {
    user: {
      id,
      email,
      firstName,
      lastName,
    },
    token: jwt.sign({ id }, SECRET, {
      expiresIn: '1h',
    }),
  }

  return { response }
}
