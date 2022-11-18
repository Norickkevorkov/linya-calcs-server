import { Router } from 'express';
import employeesRouter from "./employees-router";
import eventsRouter from "./events-router";
import authRouter from "./auth-router";
import authMiddleware from "../../middlewares/auth-middleware";
const apiRouter = Router();


apiRouter.use(employeesRouter);
apiRouter.use(eventsRouter);
apiRouter.use(authRouter);

export default apiRouter;