import { FastifyInstance } from 'fastify'

import UsersController from './controllers/UsersController'
import SpendingController from './controllers/SpendingController'
import SessionsController from './controllers/SessionsController'
import { handleAuthMiddleware } from './utils/handleAuthMiddleware'
import ExpensesController from './controllers/ExpensesController'

class Routes {
  async init(app: FastifyInstance) {
    this.post(app)
    this.get(app)
    this.put(app)
    this.delete(app)
  }

  get(app: FastifyInstance) {
    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.get('/profile', UsersController.get)

      instance.get('/spending', SpendingController.get)

      instance.get('/expenses', ExpensesController.get)
    })
  }

  post(app: FastifyInstance) {
    app.post('/sessions', SessionsController.create)

    app.post('/users', UsersController.create)

    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.post('/spending', SpendingController.create)

      instance.post('/expenses', ExpensesController.create)
    })
  }

  put(app: FastifyInstance) {
    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.put('/users/:id', UsersController.put)

      instance.put('/spending/:id', SpendingController.put)

      instance.put('/expenses/:id', ExpensesController.put)
    })
  }

  delete(app: FastifyInstance) {
    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.delete('/users/:id', UsersController.delete)

      instance.delete('/spending/:id', SpendingController.delete)

      instance.delete('/expenses/:id', ExpensesController.delete)
    })
  }
}

export default Routes
