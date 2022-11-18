"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    seminarCost: {
        type: Number,
    },
    seminarIncome: {
        type: Number,
    },
    expressCost: {
        type: Number,
    },
    expressIncome: {
        type: Number,
    },
    appointmentCost: {
        type: Number,
    },
    appointmentIncome: {
        type: Number,
    }
});
exports.default = (0, mongoose_1.model)('Employee', EmployeeSchema);
