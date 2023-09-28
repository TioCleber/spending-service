import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const handleErrors = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.status(error.statusCode ?? 500).send({ error: error.message })
}
