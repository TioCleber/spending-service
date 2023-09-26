import { prisma } from '../database/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createSpending,
  deleteSpending,
  getSpending,
  updateSpending,
} from '../useCases/spending'

import { paramsSchema } from '../schemas/paramsSchema'
import { spendingSchema } from '../schemas/spendingSchema'
import { querySchema } from '../schemas/querySchema'

class SpendingController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const body = bodySchema.parse(req.body)

    await createSpending(body)

    return rep.status(201).send({ message: 'Spending created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { id } = querySchema.parse(req.query)

    const { spending } = await getSpending(id ?? req.id)

    if (!spending.length) {
      return rep.status(404).send({ message: 'No existing expenses.' })
    }

    return spending
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateSpending(id, body)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteSpending(id)

    return rep.status(204).send()
  }
}

export default new SpendingController()
