import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../database/prisma'

class SpendingController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = z.object({
      userId: z.string().uuid(),
      name: z.string(),
      institution: z.string(),
      value: z.number(),
      date: z.string(),
    })

    const body = bodySchema.parse(req.body)

    try {
      await prisma.spending.create({
        data: body,
      })

      return rep.status(201).send({ message: 'Spending created.' })
    } catch (err) {
      return rep.status(500).send({ message: err || 'Unexpected error.' })
    }
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const querySchema = z.object({
      id: z.string().uuid().optional(),
    })

    const { id } = querySchema.parse(req.query)

    const spending = await prisma.spending.findMany({
      where: {
        userId: id ?? req.id,
      },
      orderBy: {
        date: 'desc',
      },
      select: {
        id: true,
        date: true,
        name: true,
        institution: true,
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

    if (!spending.length) {
      return rep.status(404).send({ message: 'No existing expenses.' })
    }

    return spending
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = z.object({
      name: z.string().optional(),
      institution: z.string().optional(),
      value: z.number().optional(),
      date: z.string().optional(),
    })

    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    try {
      await prisma.spending.update({
        where: {
          id,
        },
        data: { ...body },
      })

      return rep.status(201).send({ message: 'Spending updated.' })
    } catch (err) {
      return rep.status(500).send({ message: err || 'Unexpected error.' })
    }
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    try {
      await prisma.spending.delete({
        where: {
          id,
        },
      })

      return rep.status(200).send({ message: 'Spending deleted.' })
    } catch (err) {
      return rep.status(500).send({ message: err || 'Unexpected error.' })
    }
  }
}

export default new SpendingController()
