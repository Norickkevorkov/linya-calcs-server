"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../../middlewares/auth-middleware"));
const employee_controller_1 = require("../../../controllers/employee-controller");
const router = (0, express_1.Router)();
router.get('/employees', auth_middleware_1.default, employee_controller_1.getEmployees);
router.get('/employees/:id', auth_middleware_1.default, employee_controller_1.getEmployee);
router.post('/employees', auth_middleware_1.default, employee_controller_1.addEmployee);
router.put('/employees/:id', auth_middleware_1.default, employee_controller_1.editEmployee);
router.delete('employees/:id', auth_middleware_1.default, employee_controller_1.removeEmployee);
exports.default = router;
