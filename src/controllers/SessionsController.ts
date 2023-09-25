import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { SECRET } from '../config/config'

class SessionsController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = bodySchema.parse(req.body)

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
      return rep.status(404).send({ message: 'User not found.' })
    }

    const validatePassword = await bcrypt.compare(password, user.password)

    const { id, firstName, lastName } = user

    if (!validatePassword) {
      return rep.status(401).send({ message: 'Password invalid.' })
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

    return rep.status(200).send(response)
  }
}

export default new SessionsController()
