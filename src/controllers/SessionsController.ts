import { FastifyRequest, FastifyReply } from 'fastify'

import { sessionsSchema } from '../schemas/sessionsSchema'
import { getSession } from '../useCases/sessions'

class SessionsController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = sessionsSchema

    const { email, password } = bodySchema.parse(req.body)

    const { response } = await getSession({ email, password })

    return rep.status(200).send(response)
  }
}

export default new SessionsController()
