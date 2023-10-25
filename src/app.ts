import fastify, { FastifyInstance } from 'fastify'

import Routes from './routes'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'

import { handleCors } from './utils/handlerCors'
import { StatusCodeError, handleErrors } from './utils/handleErrors'

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify({
      logger: true,
      keepAliveTimeout: 10000,
      requestTimeout: 5000,
      return503OnClosing: true,
    })

    this.timeout()
    this.rateLimit()
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

  timeout() {
    this.app.addHook('onTimeout', async () => {
      throw new StatusCodeError('Timeout Error.', 504)
    })
  }

  rateLimit() {
    this.app.register(rateLimit, {
      max: 100,
      timeWindow: 60 * 1000,
    })
  }

  listen() {
    this.app.listen({
      host: '0.0.0.0',
      port: process.env?.PORT ? Number(process.env.PORT) : 3333,
    })
  }
}

export default new App()
