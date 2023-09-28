import { FastifyRequest, FastifyReply } from 'fastify'

import { paramsSchema, searchSchema } from '../schemas/paramsSchema'
import { earningsSchema } from '../schemas/earningsSchema'
import {
  createEarnings,
  deleteEarnings,
  getEarnings,
  updateEarnings,
} from '../useCases/earnings'

class EarningsController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = earningsSchema

    const body = bodySchema.parse(req.body)

    await createEarnings({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Earnings created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { fromDate, toDate } = searchSchema.parse(req.query)

    const { earnings } = await getEarnings({
      id: req.id,
      gte: fromDate,
      lt: toDate,
    })

    return rep.status(200).send(earnings)
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = earningsSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateEarnings(id, body)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteEarnings(id)

    return rep.status(204).send()
  }
}

export default new EarningsController()
