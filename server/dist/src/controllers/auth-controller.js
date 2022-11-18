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
exports.refresh = exports.logout = exports.login = exports.registration = void 0;
const user_service_1 = __importDefault(require("../services/user-service"));
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userData = yield user_service_1.default.registration({ username, password });
        res.cookie('refreshToken', userData === null || userData === void 0 ? void 0 : userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
        res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
exports.registration = registration;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const userData = yield user_service_1.default.login({ username, password });
        res.cookie('refreshToken', userData === null || userData === void 0 ? void 0 : userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
        res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const token = yield user_service_1.default.logout(refreshToken);
        res.clearCookie('refreshToken');
        res.status(200).json(token);
    }
    catch (e) {
        next(e);
    }
});
exports.logout = logout;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const userData = yield user_service_1.default.refresh(refreshToken);
        res.cookie('refreshToken', userData === null || userData === void 0 ? void 0 : userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
        res.json(userData);
    }
    catch (e) {
        next(e);
    }
});
exports.refresh = refresh;
