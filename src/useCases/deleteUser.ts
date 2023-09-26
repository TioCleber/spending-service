import { prisma } from '../database/prisma'

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      id,
    },
  })
}
