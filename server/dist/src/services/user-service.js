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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = __importDefault(require("./token-service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserService {
    registration({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const candidate = yield User_1.default.findOne({ username });
                if (candidate) {
                    throw api_error_1.default.BadRequest('Пользователь с таким ником уже существует');
                }
                const hashPassword = yield bcrypt_1.default.hash(password, 5);
                const user = yield User_1.default.create({
                    username,
                    password: hashPassword
                });
                const userDto = new user_dto_1.default(user);
                const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
                yield token_service_1.default.saveToken({
                    userId: user.id,
                    refreshToken: tokens.refreshToken
                });
                return Object.assign(Object.assign({}, tokens), { user: userDto });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    login({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield User_1.default.findOne({ username });
            if (!candidate)
                throw api_error_1.default.BadRequest('Пользователя с таким ником не существует');
            const isPassEquals = yield bcrypt_1.default.compare(password, candidate.password);
            if (!isPassEquals)
                throw api_error_1.default.BadRequest('Неверный пароль');
            const userDto = new user_dto_1.default(candidate);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken({
                userId: candidate.id,
                refreshToken: tokens.refreshToken
            });
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield token_service_1.default.removeToken(refreshToken);
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken)
                throw api_error_1.default.UnauthorizedError();
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb)
                throw api_error_1.default.UnauthorizedError();
            if (typeof userData === "string")
                throw new Error('Error: userData is ' + userData);
            const user = yield User_1.default.findById(userData.id);
            if (user === null)
                throw api_error_1.default.UnauthorizedError();
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken({
                userId: user.id,
                refreshToken: tokens.refreshToken
            });
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
}
exports.default = new UserService();
