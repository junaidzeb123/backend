import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";
import jwt from "jsonwebtoken";
import { JWT_THINGS } from "../config/environmentvariable";
import { JwtPayload } from "../types/types";

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const secret = JWT_THINGS.ACCESS.JWTSECRET;
    let token = req.headers["authorization"];
    token = token?.split(" ")[1];
    if (!token) {
        next(new AppError("No Token found", 401))
    }

    jwt.verify(token as string, secret, (err, decoded) => {
        if (err || !decoded || typeof (decoded) == 'string') {
            next(new AppError("Invalid Token", 498))
        }
        else {
            const user: JwtPayload = { id: decoded.id };
            req.body["user"] = user;
            next();
        }
    });    
}