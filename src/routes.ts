import { FastifyInstance } from 'fastify'

import UsersController from './controllers/UsersController'
import SpendingController from './controllers/SpendingController'
import SessionsController from './controllers/SessionsController'
import ExpensesController from './controllers/ExpensesController'
import CategoriesController from './controllers/CategoriesController'
import EarningsController from './controllers/EarningsController'

import { authentication, tokens } from './middlewares/index'

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
      { preHandler: [tokens, authentication] },
      UsersController.get
    )

    app.get(
      '/v1/pvt/spending',
      { preHandler: [tokens, authentication] },
      SpendingController.get
    )

    app.get(
      '/v1/pvt/expenses',
      { preHandler: [tokens, authentication] },
      ExpensesController.get
    )

    app.get(
      '/v1/pvt/categories',
      { preHandler: [tokens, authentication] },
      CategoriesController.get
    )

    app.get(
      '/v1/pvt/earnings',
      { preHandler: [tokens, authentication] },
      EarningsController.get
    )
  }

  post(app: FastifyInstance) {
    app.post('/v1/pub/sessions', SessionsController.create)

    app.post('/v1/pub/users', UsersController.create)

    app.post(
      '/v1/pvt/spending',
      { preHandler: [tokens, authentication] },
      SpendingController.create
    )

    app.post(
      '/v1/pvt/expenses',
      { preHandler: [tokens, authentication] },
      ExpensesController.create
    )

    app.post(
      '/v1/pvt/earnings',
      { preHandler: [tokens, authentication] },
      EarningsController.create
    )
  }

  put(app: FastifyInstance) {
    app.put(
      '/v1/pvt/users/:id',
      { preHandler: [tokens, authentication] },
      UsersController.put
    )

    app.put(
      '/v1/pvt/spending/:id',
      { preHandler: [tokens, authentication] },
      SpendingController.put
    )

    app.put(
      '/v1/pvt/expenses/:id',
      { preHandler: [tokens, authentication] },
      ExpensesController.put
    )

    app.put(
      '/v1/pvt/earnings/:id',
      { preHandler: [tokens, authentication] },
      EarningsController.put
    )
  }

  delete(app: FastifyInstance) {
    app.delete(
      '/v1/pvt/users/:id',
      { preHandler: [tokens, authentication] },
      UsersController.delete
    )

    app.delete(
      '/v1/pvt/spending/:id',
      { preHandler: [tokens, authentication] },
      SpendingController.delete
    )

    app.delete(
      '/v1/pvt/expenses/:id',
      { preHandler: [tokens, authentication] },
      ExpensesController.delete
    )

    app.delete(
      '/v1/pvt/categories/:id',
      { preHandler: [tokens, authentication] },
      CategoriesController.delete
    )

    app.delete(
      '/v1/pvt/earnings/:id',
      { preHandler: [tokens, authentication] },
      EarningsController.delete
    )
  }
}

export default Routes
