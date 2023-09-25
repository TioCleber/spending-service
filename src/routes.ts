import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

import auth from './middlewares/auth'

import UsersController from './controllers/UsersController'
import SpendingController from './controllers/SpendingController'
import SessionsController from './controllers/SessionsController'
import { addNewHook } from './utils/hooks'

class Routes {
  async init(app: FastifyInstance) {
    this.post(app)
    this.get(app)
    this.put(app)
    this.delete(app)
  }

  get(app: FastifyInstance) {
    app.register(async (instance) => {
      addNewHook(instance, 'preHandler')

      instance.get('/profile', UsersController.get)

      instance.get('/spending', SpendingController.get)
    })
  }

  post(app: FastifyInstance) {
    app.post('/sessions', SessionsController.create)

    app.post('/users', UsersController.create)

    app.register(async (instance) => {
      addNewHook(instance, 'preHandler')

      instance.post('/spending', SpendingController.create)
    })
  }

  put(app: FastifyInstance) {
    app.register(async (instance) => {
      addNewHook(instance, 'preHandler')

      instance.put('/users/:id', UsersController.put)

      instance.put('/spending/:id', SpendingController.put)
    })
  }

  delete(app: FastifyInstance) {
    app.register(async (instance) => {
      addNewHook(instance, 'preHandler')

      instance.delete('/users/:id', UsersController.delete)

      instance.delete('/spending/:id', SpendingController.delete)
    })
  }
}

export default Routes
