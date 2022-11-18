"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login');
router.post('logout');
router.get('/refresh-token');
exports.default = router;
