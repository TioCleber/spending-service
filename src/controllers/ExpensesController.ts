import { FastifyRequest, FastifyReply } from 'fastify'

import { paramsSchema } from '../schemas/paramsSchema'
import { spendingSchema } from '../schemas/spendingSchema'
import { querySchema } from '../schemas/querySchema'
import {
  createExpenses,
  deleteExpenses,
  getExpenses,
  updateExpenses,
} from '../useCases/expenses'

class ExpensesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const body = bodySchema.parse(req.body)

    await createExpenses(body)

    return rep.status(201).send({ message: 'Spending created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { id } = querySchema.parse(req.query)

    const { expenses } = await getExpenses(id ?? req.id)

    if (!expenses.length) {
      return rep.status(404).send({ message: 'No existing expenses.' })
    }

    return expenses
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = spendingSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateExpenses(id, body)

    return rep.status(204)
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteExpenses(id)

    return rep.status(204)
  }
}

export default new ExpensesController()
