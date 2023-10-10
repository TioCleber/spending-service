import fastify, { FastifyInstance } from 'fastify'

import Routes from './routes'
import cors from '@fastify/cors'

import { handleCors } from './utils/handlerCors'
import { handleErrors } from './utils/handleErrors'

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({
      logger: true,
    })

    this.app.server.timeout = 10000
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
    this.app.setErrorHandler(handleErrors)
  }

  listen() {
    this.app.listen({
      host: '0.0.0.0',
      port: process.env?.PORT ? Number(process.env.PORT) : 3333,
    })
  }
}

export default new App()
