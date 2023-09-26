import { prisma } from '../database/prisma'

interface User {
  firstName: string
  lastName?: string
  email: string
  salary?: number
  moneySaved?: number
  earnings?: number
}

export const updateUser = async (id: string, body: User) => {
  await prisma.user.update({
    where: {
      id,
    },
    data: { ...body },
  })
}
