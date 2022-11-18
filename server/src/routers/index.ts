import { Router } from "express";
import apiRouter from "./api-router";
import mainRouter from "./main-router";

const rootRouter = Router();

rootRouter.use('/api', apiRouter);
rootRouter.use('/', mainRouter)

export default rootRouter;

