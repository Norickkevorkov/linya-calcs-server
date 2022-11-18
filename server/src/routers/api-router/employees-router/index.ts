import {Router} from 'express';
import authMiddleware from "../../../middlewares/auth-middleware";
import {getEmployees, getEmployee, addEmployee, removeEmployee, editEmployee} from '../../../controllers/employee-controller'
const router = Router();

router.get('/employees', authMiddleware, getEmployees);
router.get('/employees/:id',authMiddleware,  getEmployee);
router.post('/employees', authMiddleware, addEmployee);
router.put('/employees/:id', authMiddleware, editEmployee);
router.delete('employees/:id', authMiddleware, removeEmployee);

export default router;