import { Router } from "express";
import {login, logout, refresh, registration} from "../../../controllers/auth-controller";

const router = Router();

router.post('/login', login);
router.post('/registration', registration)
router.post('/logout', logout);
router.get('/refresh-token', refresh);

export default router;