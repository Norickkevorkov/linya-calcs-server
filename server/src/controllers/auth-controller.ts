import {NextFunction, Request, Response} from "express";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
const registration = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { username, password } = req.body;
        const userData = await userService.registration({username, password})
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*3600*1000, httpOnly: true});
        res.json(userData);
    } catch (e) {
        next(e)
    }

}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { username, password } = req.body;
        const userData = await userService.login({username, password});
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*3600*1000, httpOnly: true});
        res.json(userData);
    } catch (e) {
        next(e)
    }


}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        res.status(200).json(token);

    } catch (e) {
        next(e)
    }
}

const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30*24*3600*1000, httpOnly: true});
        res.json(userData);
    } catch (e) {
        next(e)
    }
}

export {
    registration,
    login,
    logout,
    refresh
}