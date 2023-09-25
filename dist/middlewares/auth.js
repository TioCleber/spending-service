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

// src/middlewares/auth.ts
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_zod = require("zod");

// src/config/config.ts
var SECRET = process.env.SECRET;

// src/middlewares/auth.ts
var Auth = class {
  async authentication(req, rep, done) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return rep.status(401).send({
        message: "Token not present."
      });
    }
    try {
      const decoded = import_jsonwebtoken.default.verify(authHeader, SECRET);
      const paramsDecoded = import_zod.z.object({
        id: import_zod.z.string().uuid()
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
