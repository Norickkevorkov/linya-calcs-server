"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_route_1 = __importDefault(require("./employees-route"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/api', employees_route_1.default);
// rootRouter.use('/api', apiRouter);
exports.default = apiRouter;
