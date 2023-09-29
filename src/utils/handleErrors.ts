import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export class StatusCodeError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const handleErrors = (
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply
    .status(error.statusCode ?? 500)
    .send({ error: error.message ?? 'Internal Error.' })
}
