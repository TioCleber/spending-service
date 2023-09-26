import { FastifyRequest, FastifyReply } from 'fastify'

import { createUSerSchema, updateUserSchema } from '../schemas/userSchemas'
import { paramsSchema } from '../schemas/paramsSchema'
import { querySchema } from '../schemas/querySchema'
import { createUser, deleteUser, getUser, updateUser } from '../useCases/user'

class UsersController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = createUSerSchema

    const body = bodySchema.parse(req.body)

    await createUser(body)

    return rep.status(201).send({ message: 'User created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { id } = querySchema.parse(req.query)

    const { user } = await getUser(id ?? req.id)

    if (!user) {
      return rep.status(404).send({ message: "User don't exists." })
    }

    return user
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = updateUserSchema

    const { id } = paramsSchema.parse(req.params)
    const body = bodySchema.parse(req.body)

    await updateUser(id, body)

    return rep.status(204).send()
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteUser(id)

    return rep.status(204).send()
  }
}

export default new UsersController()
