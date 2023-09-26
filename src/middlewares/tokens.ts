import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const tokens = async (
  req: FastifyRequest,
  rep: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const headers = req.headers

  const apiToken = process.env.API_TOKEN
  const apiKey = process.env.API_KEY

  if (!headers['x-api-token'] || headers['x-api-token'] !== apiToken) {
    return rep.status(401).send({
      message: 'Token invalid.',
    })
  }

  if (!headers['x-api-key'] || headers['x-api-key'] !== apiKey) {
    return rep.status(401).send({
      message: 'Key invalid.',
    })
  }

  done()
}
