"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_router_1 = __importDefault(require("./api-router"));
const main_router_1 = __importDefault(require("./main-router"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/api', api_router_1.default);
rootRouter.use('/', main_router_1.default);
exports.default = rootRouter;
