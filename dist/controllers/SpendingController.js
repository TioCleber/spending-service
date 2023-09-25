"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/SpendingController.ts
var SpendingController_exports = {};
__export(SpendingController_exports, {
  default: () => SpendingController_default
});
module.exports = __toCommonJS(SpendingController_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/controllers/SpendingController.ts
var SpendingController = class {
  async create(req, rep) {
    const bodySchema = import_zod.z.object({
      userId: import_zod.z.string().uuid(),
      name: import_zod.z.string(),
      institution: import_zod.z.string(),
      value: import_zod.z.number(),
      date: import_zod.z.string()
    });
    const body = bodySchema.parse(req.body);
    try {
      await prisma.spending.create({
        data: body
      });
      return rep.status(201).send({ message: "Spending created." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }
  async get(req, rep) {
    const querySchema = import_zod.z.object({
      id: import_zod.z.string().uuid().optional()
    });
    const { id } = querySchema.parse(req.query);
    const spending = await prisma.spending.findMany({
      where: {
        userId: id ?? req.id
      },
      orderBy: {
        date: "desc"
      },
      select: {
        id: true,
        date: true,
        name: true,
        institution: true,
        value: true,
        user: {
          select: {
            email: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    if (!spending.length) {
      return rep.status(404).send({ message: "No existing expenses." });
    }
    return spending;
  }
  async put(req, rep) {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string().optional(),
      institution: import_zod.z.string().optional(),
      value: import_zod.z.number().optional(),
      date: import_zod.z.string().optional()
    });
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(req.params);
    const body = bodySchema.parse(req.body);
    try {
      await prisma.spending.update({
        where: {
          id
        },
        data: { ...body }
      });
      return rep.status(201).send({ message: "Spending updated." });
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
      await prisma.spending.delete({
        where: {
          id
        }
      });
      return rep.status(200).send({ message: "Spending deleted." });
    } catch (err) {
      return rep.status(500).send({ message: err || "Unexpected error." });
    }
  }
};
var SpendingController_default = new SpendingController();
