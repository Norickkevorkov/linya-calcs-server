"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_router_1 = __importDefault(require("./employees-router"));
const events_router_1 = __importDefault(require("./events-router"));
const auth_router_1 = __importDefault(require("./auth-router"));
const apiRouter = (0, express_1.Router)();
apiRouter.use(employees_router_1.default);
apiRouter.use(events_router_1.default);
apiRouter.use(auth_router_1.default);
exports.default = apiRouter;
