import {Request, Response} from "express";
import Employee from "../models/Employee";
const getEmployees = async (req: Request, res: Response) => {
    const employees = await Employee.find()
    res.status(200).json(employees);
}

const getEmployee = () => {
    console.log('getEmployee')
}

const addEmployee = async (req: Request, res: Response) => {
    try {
        const {name, seminarCost, seminarIncome, expressCost, expressIncome, appointmentCost, appointmentIncome} = req.body;
        await Employee.create({
            name,
            seminarCost,
            seminarIncome,
            expressCost,
            expressIncome,
            appointmentCost,
            appointmentIncome,
        })
        res.status(200).json('сотрудник создан');
        console.log('addEmployee')
    } catch (e) {
        console.error(e)
    }
}

const editEmployee = () => {
    console.log('editEmployee')
}

const removeEmployee = () => {
    console.log('removeEmployee')
}

export {
    getEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee,
}