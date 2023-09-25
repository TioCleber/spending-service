import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import Routes from "./routes";
import auth from "./middlewares/auth";

class App {
  private app: FastifyInstance;

  constructor() {
    this.app = fastify();
    this.routes();
  }

  routes() {
    const routes = new Routes();

    this.app.register(() => routes.init(this.app));
  }

  listen() {
    this.app
      .listen({
        port: 3333,
      })
      .then(() => console.log(`server listen on localhost:${3333}`));
  }
}

export default new App();
