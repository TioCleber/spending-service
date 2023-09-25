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

// src/controllers/SessionsController.ts
var SessionsController_exports = {};
__export(SessionsController_exports, {
  default: () => SessionsController_default
});
module.exports = __toCommonJS(SessionsController_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_zod = require("zod");
var import_bcryptjs = __toESM(require("bcryptjs"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/config/config.ts
var SECRET = process.env.SECRET;

// src/controllers/SessionsController.ts
var SessionsController = class {
  async create(req, rep) {
    const bodySchema = import_zod.z.object({
      email: import_zod.z.string(),
      password: import_zod.z.string()
    });
    const { email, password } = bodySchema.parse(req.body);
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true
      }
    });
    if (!user) {
      return rep.status(404).send({ message: "User not found." });
    }
    const validatePassword = await import_bcryptjs.default.compare(password, user.password);
    const { id, firstName, lastName } = user;
    if (!validatePassword) {
      return rep.status(401).send({ message: "Password invalid." });
    }
    const response = {
      user: {
        id,
        email,
        firstName,
        lastName
      },
      token: import_jsonwebtoken.default.sign({ id }, SECRET, {
        expiresIn: "1h"
      })
    };
    return rep.status(200).send(response);
  }
};
var SessionsController_default = new SessionsController();
