"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./src/middlewares/error-middleware"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./src/routers"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongo_db_uri = process.env.MONGO_DB_URI || '';
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/', routers_1.default);
app.use(error_middleware_1.default);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mongoose_1.default.connect(mongo_db_uri, () => console.log('Mongoose is connected'));
            app.listen(port, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
startApp();
