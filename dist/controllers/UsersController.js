"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/UsersController.ts
var UsersController_exports = {};
__export(UsersController_exports, {
  default: () => UsersController_default
});
module.exports = __toCommonJS(UsersController_exports);
var import_zod = require("zod");
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/UsersController.ts
var UsersController = class {
  async create(req, rep) {
    const bodySchema = import_zod.z.object({
      email: import_zod.z.string(),
      firstName: import_zod.z.string(),
      lastName: import_zod.z.string().nullable(),
      password: import_zod.z.string()
    });
    const body = bodySchema.parse(req.body);
    const passwordHash = await import_bcryptjs.default.hash(body.password, 8);
    const userExists = await prisma.user.findFirst({
      where: {
        email: body.email
      }
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
  async get(req, rep) {
    const querySchema = import_zod.z.object({
      id: import_zod.z.string().uuid().optional()
    });
    const { id } = querySchema.parse(req.query);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id ?? req.id
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
            value: true
          },
          orderBy: {
            date: "desc"
          }
        }
      }
    });
    if (!user) {
      return rep.status(404).send({ message: "User don't exists." });
    }
    return user;
  }
  async put(req, rep) {
    const bodySchema = import_zod.z.object({
      email: import_zod.z.string().optional(),
      firstName: import_zod.z.string().optional(),
      lastName: import_zod.z.string().optional()
    });
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(req.params);
    const body = bodySchema.parse(req.body);
    try {
      await prisma.user.update({
        where: {
          id
        },
        data: { ...body }
      });
      return rep.status(200).send({ message: "User updated." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }
  async delete(req, rep) {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(req.params);
    try {
      await prisma.user.delete({
        where: {
          id
        }
      });
      return rep.status(200).send({ message: "User deleted." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }
};
var UsersController_default = new UsersController();
