import jwt, {Jwt, JwtPayload} from 'jsonwebtoken';
import Token, {IToken} from "../models/Token";
import ApiError from "../exceptions/api-error";
import token from "../models/Token";
class TokenService {
    generateTokens(payload: Object) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || '', {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY || '', {expiresIn: '60d'})
        return {
            accessToken,
            refreshToken,
        }
    }

    async saveToken({userId, refreshToken}:IToken) {
        const tokenData = await Token.findOne({userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        return await Token.create({userId, refreshToken})
    }

    async removeToken(refreshToken: string) {
        const tokenData = await Token.deleteOne({refreshToken});
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            if (!process.env.JWT_SECRET_KEY) throw new Error('server is not available now');
            return jwt.verify(token, process.env.JWT_SECRET_KEY)
        } catch (e) {
            return null
        }

    }

    validateRefreshToken(token: string):JwtPayload | string | null {
        try {
            if (!process.env.JWT_REFRESH_SECRET_KEY) throw new Error('server is not available now');
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
        } catch (e) {
            return null
        }

    }

    async findToken(refreshToken: string) {
        return token.findOne({refreshToken});
    }

    async refreshToken(refreshToken:string) {

    }

}

export default new TokenService();