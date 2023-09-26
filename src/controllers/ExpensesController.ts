import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createExpenses,
  deleteExpenses,
  getExpenses,
  updateExpenses,
} from '../useCases/expenses'

import { expensesSchema, updateExpensesSchema } from '../schemas/expensesSchema'
import { paramsSchema } from '../schemas/paramsSchema'
import { querySchema } from '../schemas/querySchema'

class ExpensesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = expensesSchema

    const body = bodySchema.parse(req.body)

    await createExpenses(body)

    return rep.status(201).send({ message: 'Expenses created.' })
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
    const bodySchema = updateExpensesSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateExpenses(id, body, req.id)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteExpenses(id, req.id)

    return rep.status(204).send()
  }
}

export default new ExpensesController()
