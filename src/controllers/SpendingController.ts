import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createSpending,
  deleteSpending,
  getSpending,
  updateSpending,
} from '../useCases/spending'

import { paramsSchema, searchSchema } from '../schemas/paramsSchema'
import { spendingSchema, updateSpendingSchema } from '../schemas/spendingSchema'

class SpendingController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const body = bodySchema.parse(req.body)

    await createSpending({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Spending created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { categoriesId, fromDate, toDate, page, perPage } =
      searchSchema.parse(req.query)

    const { spending, currentPage, pages, totalItems } = await getSpending({
      id: req.id,
      categoryId: categoriesId,
      gte: fromDate,
      lt: toDate,
      page: page ? Number(page) : undefined,
      perPage: perPage ? Number(perPage) : undefined,
    })

    return rep.status(200).send({ spending, currentPage, pages, totalItems })
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = updateSpendingSchema

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
