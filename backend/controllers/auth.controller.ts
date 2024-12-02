import { createUser, checkEmailAndPassword } from "../services/user.service";
import { Request, Response, NextFunction } from 'express';
import { User } from "../types/entities.interface";
import { validationResult } from 'express-validator';  // To handle validation errors
import { AppError } from "../error/AppError";
import { generateToken } from "../services/generateJwt";
import { JwtPayload } from "../types/types"
import { BASE_ADDRESS, HASH_THINGS, JWT_THINGS } from "../config/environmentvariable";



export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError(errors.array().map(error => error.msg).join('. '), 400,);
        }

        const { userName, password } = req.body;
        const user: User | null = await checkEmailAndPassword(userName, password);
        if (!user) {
            throw new AppError("Incorrect Credentials", 401);
        }
        const accessSecret = JWT_THINGS.ACCESS.JWTSECRET;
        const accessExp = JWT_THINGS.ACCESS.EXPIRATION_TIME;
        const refreshSecret = JWT_THINGS.REFRESH.EXPIRATION_TIME;
        const refreshExp = JWT_THINGS.REFRESH.EXPIRATION_TIME;
        
        const accessToken = await generateToken({ id: user.id }, accessExp, accessSecret);
        const refreshToken = await generateToken({ id: user.id }, refreshExp, refreshSecret);
       
        res.send({
            accessToken,
            refreshToken,
            user:{
                email : user.email,
                id : user.id,
                userName : user.userName,
                pic : user.pic
            }
        });

    } catch (error) {
        next(error)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError(errors.array().map(error => error.msg).join('. '), 400,);
        }
        res.send(await createUser(user));
    } catch (error) {
        next(error)
    }
}


export const verifyUser = () => {

} 