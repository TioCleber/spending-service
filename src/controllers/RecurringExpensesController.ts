import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createRecurringExpenses,
  deleteRecurringExpenses,
  getRecurringExpenses,
  updateRecurringExpenses,
} from '../useCases/recurringExpenses'

import {
  recurringExpensesSchema,
  updateRecurringExpensesSchema,
} from '../schemas/recurringExpensesSchema'
import { paramsSchema, searchSchema } from '../schemas/paramsSchema'

class RecurringExpensesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = recurringExpensesSchema

    const body = bodySchema.parse(req.body)

    await createRecurringExpenses({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Expenses created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { categoriesId, fromDate, toDate, gt, page, perPage, fields } =
      searchSchema.parse(req.query)

    const { recurringExpenses, currentPage, pages, totalItems } =
      await getRecurringExpenses({
        id: req.id,
        categoryId: categoriesId,
        gte: fromDate,
        lt: toDate,
        gt: gt ? Number(gt) : undefined,
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        fields,
      })

    return rep
      .status(200)
      .send({ recurringExpenses, currentPage, pages, totalItems })
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = updateRecurringExpensesSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateRecurringExpenses(id, body)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteRecurringExpenses(id)

    return rep.status(204).send()
  }
}

export default new RecurringExpensesController()
