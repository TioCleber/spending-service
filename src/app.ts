import fastify, { FastifyInstance } from 'fastify'

import Routes from './routes'
import cors from '@fastify/cors'
import { handleCors } from './utils/handlerCors'

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({
      logger: true,
    })

    this.routes()
  }

  routes() {
    this.app.register(cors, {
      origin: handleCors,
    })

    const routes = new Routes()

    this.app.register(() => routes.init(this.app))
  }

  errors() {
    this.app.setErrorHandler(function (error, _request, reply) {
      if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
        // Log error
        this.log.error(error)
        // Send error response
        reply.status(500).send({ ok: false })
      } else {
        // fastify will use parent error handler to handle this
        reply.send(error)
      }
    })
  }

  listen() {
    this.app.listen(
      {
        host: '0.0.0.0',
        port: process.env?.PORT ? Number(process.env.PORT) : 3333,
      },
      (_err, address) => console.log(`🚀 live service on ${address}.`)
    )
  }
}

export default new App()
