import { FastifyRequest, FastifyReply } from 'fastify'

import {
  createRecurringExpenses,
  deleteRecurringExpenses,
  getRecurringExpenses,
  updateRecurringExpenses,
} from '../useCases/expenses'

import { expensesSchema, updateExpensesSchema } from '../schemas/expensesSchema'
import { paramsSchema, searchSchema } from '../schemas/paramsSchema'

class ExpensesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = expensesSchema

    const body = bodySchema.parse(req.body)

    await createRecurringExpenses({ ...body, userId: req.id })

    return rep.status(201).send({ message: 'Expenses created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { categoriesId, fromDate, toDate, gt } = searchSchema.parse(req.query)

    const { expenses } = await getRecurringExpenses({
      id: req.id,
      categoryId: categoriesId,
      gte: fromDate,
      lt: toDate,
      gt: gt ? Number(gt) : undefined,
    })

    return rep.status(200).send(expenses)
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = updateExpensesSchema

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

export default new ExpensesController()
