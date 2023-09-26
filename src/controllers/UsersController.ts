import { FastifyRequest, FastifyReply } from 'fastify'

import { getUser } from '../useCases/getUser'
import { createUser } from '../useCases/createUser'
import { updateUser } from '../useCases/updateUser'
import { deleteUser } from '../useCases/deleteUser'

import { createUSerSchema, updateUserSchema } from '../schemas/userSchemas'
import { paramsSchema } from '../schemas/paramsSchema'
import { querySchema } from '../schemas/querySchema'

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

    return rep.status(200).send({ message: 'User updated.' })
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = paramsSchema.parse(req.params)

    await deleteUser(id)

    return rep.status(200).send({ message: 'User deleted.' })
  }
}

export default new UsersController()
