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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);

// src/controllers/UsersController.ts
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

// src/controllers/SpendingController.ts
var import_zod2 = require("zod");
var SpendingController = class {
  async create(req, rep) {
    const bodySchema = import_zod2.z.object({
      userId: import_zod2.z.string().uuid(),
      name: import_zod2.z.string(),
      institution: import_zod2.z.string(),
      value: import_zod2.z.number(),
      date: import_zod2.z.string()
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
    const querySchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid().optional()
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
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string().optional(),
      institution: import_zod2.z.string().optional(),
      value: import_zod2.z.number().optional(),
      date: import_zod2.z.string().optional()
    });
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
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
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
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

// src/controllers/SessionsController.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_zod3 = require("zod");
var import_bcryptjs2 = __toESM(require("bcryptjs"));

// src/config/config.ts
var SECRET = process.env.SECRET;

// src/controllers/SessionsController.ts
var SessionsController = class {
  async create(req, rep) {
    const bodySchema = import_zod3.z.object({
      email: import_zod3.z.string(),
      password: import_zod3.z.string()
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
    const validatePassword = await import_bcryptjs2.default.compare(password, user.password);
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

// src/middlewares/auth.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_zod4 = require("zod");
var Auth = class {
  async authentication(req, rep, done) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return rep.status(401).send({
        message: "Token not present."
      });
    }
    try {
      const decoded = import_jsonwebtoken2.default.verify(authHeader, SECRET);
      const paramsDecoded = import_zod4.z.object({
        id: import_zod4.z.string().uuid()
      });
      const { id } = paramsDecoded.parse(decoded);
      req.id = id;
      done();
    } catch (err) {
      return rep.status(401).send({
        message: "Token not valid."
      });
    }
  }
};
var auth_default = new Auth();

// src/utils/hooks.ts
function addNewHook(instance, hook) {
  return instance.addHook(
    hook,
    (req, reply, done) => {
      auth_default.authentication(req, reply, done);
    }
  );
}

// src/routes.ts
var Routes = class {
  async init(app) {
    this.post(app);
    this.get(app);
    this.put(app);
    this.delete(app);
  }
  get(app) {
    app.register(async (instance) => {
      addNewHook(instance, "preHandler");
      instance.get("/profile", UsersController_default.get);
      instance.get("/spending", SpendingController_default.get);
    });
  }
  post(app) {
    app.post("/sessions", SessionsController_default.create);
    app.post("/users", UsersController_default.create);
    app.register(async (instance) => {
      addNewHook(instance, "preHandler");
      instance.post("/spending", SpendingController_default.create);
    });
  }
  put(app) {
    app.register(async (instance) => {
      addNewHook(instance, "preHandler");
      instance.put("/users/:id", UsersController_default.put);
      instance.put("/spending/:id", SpendingController_default.put);
    });
  }
  delete(app) {
    app.register(async (instance) => {
      addNewHook(instance, "preHandler");
      instance.delete("/users/:id", UsersController_default.delete);
      instance.delete("/spending/:id", SpendingController_default.delete);
    });
  }
};
var routes_default = Routes;
