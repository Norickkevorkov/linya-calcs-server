import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import errorMiddleware from "./src/middlewares/error-middleware";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import rootRouter from "./src/routers";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo_db_uri = process.env.MONGO_DB_URI || '';
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(cookieParser());
app.use(cors());

app.use('/', rootRouter);
app.use(errorMiddleware);

async function startApp(){
    try {
        mongoose.connect(mongo_db_uri,()=>console.log('Mongoose is connected'));
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
        });
    } catch (e) {
        console.error(e)
    }
}

startApp();