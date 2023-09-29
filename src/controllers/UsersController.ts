import { FastifyRequest, FastifyReply } from 'fastify'

import { createUserSchema, updateUserSchema } from '../schemas/userSchemas'
import { paramsSchema } from '../schemas/paramsSchema'
import { createUser, deleteUser, getUser, updateUser } from '../useCases/users'

class UsersController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = createUserSchema

    const body = bodySchema.parse(req.body)

    await createUser(body)

    return rep.status(201).send({ message: 'User created.' })
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const { user } = await getUser(req.id)

    return rep.status(200).send(user)
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
