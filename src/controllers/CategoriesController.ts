import { FastifyRequest, FastifyReply } from 'fastify'
import { categoriesSchema } from '../schemas/categoriesSchema'
import {
  createCategory,
  deleteCategory,
  getExpensesCategory,
  getSpendingCategory,
  updateCategory,
} from '../useCases/categories'
import { paramsSchema } from '../schemas/paramsSchema'

class CategoriesController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = categoriesSchema

    const { name } = bodySchema.parse(req.body)

    await createCategory(name)

    return rep.status(201).send({ message: 'Category created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { spendingCategories } = await getSpendingCategory(req.id)
    const { expensesCategories } = await getExpensesCategory(req.id)

    return rep.status(200).send({ spendingCategories, expensesCategories })
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    const bodySchema = categoriesSchema

    const { name } = bodySchema.parse(req.body)

    await updateCategory(id, { name })

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteCategory(id)

    return rep.status(204).send()
  }
}

export default new CategoriesController()
