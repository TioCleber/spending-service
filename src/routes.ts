import { FastifyInstance } from 'fastify'

import UsersController from './controllers/UsersController'
import SpendingController from './controllers/SpendingController'
import SessionsController from './controllers/SessionsController'
import ExpensesController from './controllers/ExpensesController'
import { tokens } from './middlewares/tokens'
import auth from './middlewares/auth'

class Routes {
  async init(app: FastifyInstance) {
    this.post(app)
    this.get(app)
    this.put(app)
    this.delete(app)
  }

  get(app: FastifyInstance) {
    app.get(
      '/v1/pvt/profile',
      { preHandler: [tokens, auth.authentication] },
      UsersController.get
    )

    app.get(
      '/v1/pvt/spending',
      { preHandler: [tokens, auth.authentication] },
      SpendingController.get
    )

    app.get(
      '/v1/pvt/expenses',
      { preHandler: [tokens, auth.authentication] },
      ExpensesController.get
    )
  }

  post(app: FastifyInstance) {
    app.post('/v1/pub/sessions', SessionsController.create)

    app.post('/v1/pub/users', UsersController.create)

    app.post(
      '/v1/pvt/spending',
      { preHandler: [tokens, auth.authentication] },
      SpendingController.create
    )

    app.post(
      '/v1/pvt/expenses',
      { preHandler: [tokens, auth.authentication] },
      ExpensesController.create
    )
  }

  put(app: FastifyInstance) {
    app.put(
      '/v1/pvt/users/:id',
      { preHandler: [tokens, auth.authentication] },
      UsersController.put
    )

    app.put(
      '/v1/pvt/spending/:id',
      { preHandler: [tokens, auth.authentication] },
      SpendingController.put
    )

    app.put(
      '/v1/pvt/expenses/:id',
      { preHandler: [tokens, auth.authentication] },
      ExpensesController.put
    )
  }

  delete(app: FastifyInstance) {
    app.delete(
      '/v1/pvt/users/:id',
      { preHandler: [tokens, auth.authentication] },
      UsersController.delete
    )

    app.delete(
      '/v1/pvt/spending/:id',
      { preHandler: [tokens, auth.authentication] },
      SpendingController.delete
    )

    app.delete(
      '/v1/pvt/expenses/:id',
      { preHandler: [tokens, auth.authentication] },
      ExpensesController.delete
    )
  }
}

export default Routes
