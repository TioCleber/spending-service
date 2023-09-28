import { prisma } from '../database/prisma'
import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createSpending,
  deleteSpending,
  getSpending,
  updateSpending,
} from '../useCases/spending'

import { paramsSchema } from '../schemas/paramsSchema'
import {
  paramsSpendingSchema,
  spendingSchema,
  updateSpendingSchema,
} from '../schemas/spendingSchema'

class SpendingController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const body = bodySchema.parse(req.body)

    await createSpending({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Spending created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { categoriesId } = paramsSpendingSchema.parse(req.query)

    const { spending } = await getSpending(req.id, categoriesId)

    if (!spending.length) {
      return rep.status(404).send({ message: 'No existing expenses.' })
    }

    return rep.status(200).send(spending)
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = updateSpendingSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateSpending(id, body, req.id)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteSpending(id, req.id)

    return rep.status(204).send()
  }
}

export default new SpendingController()
