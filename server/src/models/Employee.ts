import {Schema, Types, model} from "mongoose";
interface IEmployee {
    name: string,
    id: Types.ObjectId,
    seminarCost?: number,
    seminarIncome?: number,
    expressCost?: number,
    expressIncome?: number,
    appointmentCost?: number,
    appointmentIncome?: number,
}
const EmployeeSchema = new Schema<IEmployee>({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Schema.Types.ObjectId,
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
})

export default model<IEmployee>('Employee', EmployeeSchema)