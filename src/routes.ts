import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import auth from "./middlewares/auth";

import UsersController from "./controllers/UsersController";
import SpendingController from "./controllers/SpendingController";
import SessionsController from "./controllers/SessionsController";

class Routes {
  async init(app: FastifyInstance) {
    this.post(app);
    this.get(app);
    this.put(app);
    this.delete(app);
  }

  get(app: FastifyInstance) {
    app.register(async (instance) => {
      instance.addHook(
        "preHandler",
        (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
          auth.authentication(req, reply, done);
        }
      );

      instance.get("/profile", UsersController.get);

      instance.get("/spending", SpendingController.get);
    });
  }

  post(app: FastifyInstance) {
    app.post("/sessions", SessionsController.create);

    app.post("/users", UsersController.create);

    app.register(async (instance) => {
      instance.addHook(
        "preHandler",
        (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
          auth.authentication(req, reply, done);
        }
      );

      instance.post("/spending", SpendingController.create);
    });
  }

  put(app: FastifyInstance) {
    app.register(async (instance) => {
      instance.addHook(
        "preHandler",
        (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
          auth.authentication(req, reply, done);
        }
      );

      instance.put("/users/:id", UsersController.put);

      instance.put("/spending/:id", SpendingController.put);
    });
  }

  delete(app: FastifyInstance) {
    app.register(async (instance) => {
      instance.addHook(
        "preHandler",
        (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
          auth.authentication(req, reply, done);
        }
      );

      instance.delete("/users/:id", UsersController.delete);

      instance.delete("/spending/:id", SpendingController.delete);
    });
  }
}

export default Routes;
