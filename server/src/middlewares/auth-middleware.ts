import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../services/token-service";

export default (req: Request, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(ApiError.UnauthorizedError())
        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) return next(ApiError.UnauthorizedError())
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData || typeof userData === 'string') return next(ApiError.UnauthorizedError());
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}