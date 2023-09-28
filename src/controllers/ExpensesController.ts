import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createExpenses,
  deleteExpenses,
  getExpenses,
  updateExpenses,
} from '../useCases/expenses'

import { expensesSchema, updateExpensesSchema } from '../schemas/expensesSchema'
import { paramsSchema } from '../schemas/paramsSchema'

class ExpensesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = expensesSchema

    const body = bodySchema.parse(req.body)

    await createExpenses({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Expenses created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { expenses } = await getExpenses(req.id)

    if (!expenses.length) {
      return rep.status(404).send({ message: 'No existing expenses.' })
    }

    return rep.status(200).send(expenses)
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
