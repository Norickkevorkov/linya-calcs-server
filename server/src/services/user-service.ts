import User, {IUser} from "../models/User";
import bcrypt from 'bcrypt';
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";
class UserService {
    async registration({username, password}: IUser){
        try{
            const candidate = await User.findOne({username});
            if (candidate){
                throw ApiError.BadRequest('Пользователь с таким ником уже существует');
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                username,
                password: hashPassword
            });
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})
            await tokenService.saveToken({
                userId: user.id,
                refreshToken: tokens.refreshToken
            });

            return {
                ...tokens,
                user: userDto,
            }
        } catch (e){
            console.log(e)
        }

    }
    async  login({username, password}:IUser){
        const candidate = await User.findOne({username});
        if (!candidate) throw ApiError.BadRequest('Пользователя с таким ником не существует');
        const isPassEquals = await bcrypt.compare(password, candidate.password);
        if (!isPassEquals) throw ApiError.BadRequest('Неверный пароль');
        const userDto = new UserDto(candidate);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken({
            userId: candidate.id,
            refreshToken: tokens.refreshToken})
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError();
        if (typeof userData === "string") throw new Error('Error: userData is ' + userData)
        const user = await User.findById(userData.id)
        if (user === null) throw ApiError.UnauthorizedError();
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken({
            userId: user.id,
            refreshToken: tokens.refreshToken})
        return {
            ...tokens,
            user: userDto
        }

    }
}

export default new UserService();