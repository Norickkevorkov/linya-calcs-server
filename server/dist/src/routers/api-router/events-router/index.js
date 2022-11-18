"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../../../controllers/events-controller");
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth-middleware"));
const router = (0, express_1.Router)();
router.get('/events', auth_middleware_1.default, events_controller_1.getEvents);
router.get('events/:id', auth_middleware_1.default, events_controller_1.getEvent);
router.post('/events', auth_middleware_1.default, events_controller_1.addEvent);
router.put('/events/:id', auth_middleware_1.default, events_controller_1.editEvent);
router.delete('/events/:id', auth_middleware_1.default, events_controller_1.removeEvent);
exports.default = router;
