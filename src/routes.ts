import { FastifyInstance } from 'fastify'

import UsersController from './controllers/UsersController'
import SpendingController from './controllers/SpendingController'
import SessionsController from './controllers/SessionsController'
import RecurringExpensesController from './controllers/RecurringExpensesController'
import CategoriesController from './controllers/CategoriesController'

import { authentication } from './middlewares/'

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
      { preHandler: [authentication] },
      UsersController.get
    )

    app.get(
      '/v1/pvt/spending',
      { preHandler: [authentication] },
      SpendingController.get
    )

    app.get(
      '/v1/pvt/recurring-expenses',
      { preHandler: [authentication] },
      RecurringExpensesController.get
    )

    app.get(
      '/v1/pvt/categories',
      { preHandler: [authentication] },
      CategoriesController.get
    )

    app.get('/', (_res, rep) => {
      return rep.status(200).send('Hello 🚀!')
    })
  }

  post(app: FastifyInstance) {
    app.post('/v1/pub/sessions', SessionsController.create)

    app.post('/v1/pub/users', UsersController.create)

    app.post(
      '/v1/pvt/spending',
      { preHandler: [authentication] },
      SpendingController.create
    )

    app.post(
      '/v1/pvt/recurring-expenses',
      { preHandler: [authentication] },
      RecurringExpensesController.create
    )
  }

  put(app: FastifyInstance) {
    app.put(
      '/v1/pvt/users/:id',
      { preHandler: [authentication] },
      UsersController.put
    )

    app.put(
      '/v1/pvt/spending/:id',
      { preHandler: [authentication] },
      SpendingController.put
    )

    app.put(
      '/v1/pvt/recurring-expenses/:id',
      { preHandler: [authentication] },
      RecurringExpensesController.put
    )
  }

  delete(app: FastifyInstance) {
    app.delete(
      '/v1/pvt/users/:id',
      { preHandler: [authentication] },
      UsersController.delete
    )

    app.delete(
      '/v1/pvt/spending/:id',
      { preHandler: [authentication] },
      SpendingController.delete
    )

    app.delete(
      '/v1/pvt/recurring-expenses/:id',
      { preHandler: [authentication] },
      RecurringExpensesController.delete
    )

    app.delete(
      '/v1/pvt/categories/:id',
      { preHandler: [authentication] },
      CategoriesController.delete
    )
  }
}

export default Routes
