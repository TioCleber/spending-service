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
  if (error instanceof Error && error.code === 'FST_ERR_ID_GEN_TIMED_OUT') {
    reply.status(504).send({ error: 'Error Timeout.' })
  }

  return reply
    .status(error.statusCode ?? 500)
    .send({ error: error.message ?? 'Internal Error.' })
}
