import jwt from "jsonwebtoken";
import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

class Auth {
  async authentication(
    req: FastifyRequest,
    rep: FastifyReply,
    done: () => void
  ) {
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      return rep.status(401).send({
        message: "Token not present.",
      });
    }

    try {
      const decoded = jwt.verify(authHeader, "1234") as TokenPayload;

      const paramsDecoded = z.object({
        id: z.string().uuid(),
      });

      const { id } = paramsDecoded.parse(decoded);

      req.id = id;

      done();
    } catch (err) {
      return rep.status(401).send({
        message: "Token not valid.",
      });
    }
  }
}

export default new Auth();
