import { prisma } from '../database/prisma'
import { SECRET } from '../config/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { ISessions } from '../types/ISessions'
import { StatusCodeError } from '../utils/handleErrors'

export const createSessions = async ({ email, password }: ISessions) => {
  const user = await prisma.users.findFirst({
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
    throw new StatusCodeError('User not found.', 404)
  }

  const validatePassword = await bcrypt.compare(password, user.password)

  const { id } = user

  if (!validatePassword) {
    throw new StatusCodeError('Password invalid.', 401)
  }

  const response = {
    token: jwt.sign({ id }, SECRET, {
      expiresIn: '1h',
    }),
  }

  return { response }
}
