import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/types";
import { JWT_THINGS } from "../config/environmentvariable";

export const generateToken = async (payload: JwtPayload, expiresIn: string, secret: string): Promise<string> => {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
}

export const getAccessorRefreshToken = async (type: 'access' | 'refresh', payload: JwtPayload): Promise<string> => {
    if (type === 'access') {
        return generateToken(payload, JWT_THINGS.ACCESS.EXPIRATION_TIME, JWT_THINGS.ACCESS.JWTSECRET);
    }
    return generateToken(payload, JWT_THINGS.REFRESH.EXPIRATION_TIME, JWT_THINGS.REFRESH.JWTSECRET);

}   