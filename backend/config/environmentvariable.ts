import dotenv from 'dotenv'
import { z } from "zod";


dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    MONGODB_URL: z.string().min(1, { message: "MONGODB_URL is required" }),
    HASH_SALT: z.string().default('10'),
    EMAIL_HOST: z.string().min(1, { message: "EMAIL_HOST is required" }),
    EMAIL_USERNAME: z.string().min(1, { message: "EMAIL_USERNAME is required" }),
    EMAIL_PASSWORD: z.string().min(1, { message: "EMAIL_PASSWORD is required" }),

    VERIFICATION_TOKEN_EXPIRATION: z.string().default('3600'),
    JWT_SECRET: z.string().min(1, { message: "JWT_SECRET is required" }),

    ACCESS_JWTSECRET: z.string().min(1, { message: "ACCESS_JWTSECRET is required" }),
    ACCESS_TOKEN_EXPIRATION: z.string().default('3600'),

    REFRESH_TOKEN_EXPIRATION: z.string().default('3600'),
    REFRESH_JWTSECRET: z.string().min(1, { message: "REFRESH_JWTSECRET is required" }),

    VERIFICATION_JWTSECRET: z.string().min(1, { message: "VERIFICATION_JWTSECRET is required" }),

    WEBSITE_BACKEND_ADDRESS: z.string().default('http://localhost:3000'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Environment validation failed:", parsedEnv.error.format());
    process.exit(1);
}

const env = parsedEnv.data;

export const CONFIG = {
    PORT: env.PORT,
    MONGOURL: env.MONGODB_URL
}


export const HASH_THINGS = {
    SALT: env.HASH_SALT
}

export const EMAIL_THINGS = {
    EMAIL_HOST: env.EMAIL_HOST,
    EMAIL_USERNAME: env.EMAIL_USERNAME,
    EMAIL_PASSWORD: env.EMAIL_PASSWORD
}

export const JWT_THINGS = {
    JWTSECRET: env.JWT_SECRET,
    USERVERIFICATION: {
        EXPIRATION_TIME: env.VERIFICATION_TOKEN_EXPIRATION,
        JWTSECRET: env.VERIFICATION_JWTSECRET
    },
    ACCESS: {
        EXPIRATION_TIME: env.ACCESS_TOKEN_EXPIRATION,
        JWTSECRET: env.ACCESS_JWTSECRET
    },
    REFRESH: {
        EXPIRATION_TIME: env.REFRESH_TOKEN_EXPIRATION,
        JWTSECRET: env.REFRESH_JWTSECRET
    }
}


export const BASE_ADDRESS = {
    BACKEND: env.WEBSITE_BACKEND_ADDRESS
}