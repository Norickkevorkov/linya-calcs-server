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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_1 = __importDefault(require("../models/Token"));
const Token_2 = __importDefault(require("../models/Token"));
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY || '', { expiresIn: '30m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET_KEY || '', { expiresIn: '60d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    saveToken({ userId, refreshToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield Token_1.default.findOne({ userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return tokenData.save();
            }
            return yield Token_1.default.create({ userId, refreshToken });
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield Token_1.default.deleteOne({ refreshToken });
            return tokenData;
        });
    }
    validateAccessToken(token) {
        try {
            if (!process.env.JWT_SECRET_KEY)
                throw new Error('server is not available now');
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        }
        catch (e) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            if (!process.env.JWT_REFRESH_SECRET_KEY)
                throw new Error('server is not available now');
            return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
        }
        catch (e) {
            return null;
        }
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return Token_2.default.findOne({ refreshToken });
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new TokenService();
