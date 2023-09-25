import fastify, { FastifyInstance } from 'fastify'

import Routes from './routes'

class App {
  private app: FastifyInstance

  constructor() {
    this.app = fastify()
    this.routes()
  }

  routes() {
    const routes = new Routes()

    this.app.register(() => routes.init(this.app))
  }

  listen() {
    this.app
      .listen({
        host: '0.0.0.0',
        port: process.env?.PORT ? Number(process.env.PORT) : 3333,
      })
      .then(() => console.log(`🚀 live service.`))
  }
}

export default new App()
