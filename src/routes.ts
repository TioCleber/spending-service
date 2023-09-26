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

      instance.get('/v1/pvt/profile', UsersController.get)

      instance.get('/v1/pvt/spending', SpendingController.get)

      instance.get('/v1/pvt/expenses', ExpensesController.get)
    })
  }

  post(app: FastifyInstance) {
    app.post('/v1/pub/sessions', SessionsController.create)

    app.post('/v1/pub/users', UsersController.create)

    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.post('/v1/pvt/spending', SpendingController.create)

      instance.post('/v1/pvt/expenses', ExpensesController.create)
    })
  }

  put(app: FastifyInstance) {
    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.put('/v1/pvt/users/:id', UsersController.put)

      instance.put('/v1/pvt/spending/:id', SpendingController.put)

      instance.put('/v1/pvt/expenses/:id', ExpensesController.put)
    })
  }

  delete(app: FastifyInstance) {
    app.register(async (instance) => {
      handleAuthMiddleware(instance, 'preHandler')

      instance.delete('/v1/pvt/users/:id', UsersController.delete)

      instance.delete('/v1/pvt/spending/:id', SpendingController.delete)

      instance.delete('/v1/pvt/expenses/:id', ExpensesController.delete)
    })
  }
}

export default Routes
