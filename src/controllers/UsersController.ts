import { z } from "zod";
import bcrypt from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

class UsersController {
  async create(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string().nullable(),
      password: z.string(),
    });

    const body = bodySchema.parse(req.body);
    const passwordHash = await bcrypt.hash(body.password, 8);

    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      return rep.status(400).send({ message: "User already exists." });
    }

    try {
      await prisma.user.create({ data: { ...body, password: passwordHash } });

      return rep.status(201).send({ message: "User created." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }

  async get(req: FastifyRequest, rep: FastifyReply) {
    const querySchema = z.object({
      id: z.string().uuid().optional(),
    });

    const { id } = querySchema.parse(req.query);

    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id ?? req.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        spending: {
          select: {
            id: true,
            name: true,
            institution: true,
            date: true,
            value: true,
          },
        },
      },
    });

    if (!user) {
      return rep.status(404).send({ message: "User don't exists." });
    }

    return user;
  }

  async put(req: FastifyRequest, rep: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    });

    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);
    const body = bodySchema.parse(req.body);

    try {
      await prisma.user.update({
        where: {
          id,
        },
        data: { ...body },
      });

      return rep.status(200).send({ message: "User updated." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      return rep.status(200).send({ message: "User deleted." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }
}

export default new UsersController();
