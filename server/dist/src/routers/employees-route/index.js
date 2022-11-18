"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../../controllers/employee-controller");
const router = (0, express_1.Router)();
router.get('/employees', employee_controller_1.getEmployees);
router.get('/employees/:id', employee_controller_1.getEmployee);
router.post('/employees', employee_controller_1.addEmployee);
router.put('employees/:id', employee_controller_1.editEmployee);
router.delete('employees/:id', employee_controller_1.removeEmployee);
exports.default = router;