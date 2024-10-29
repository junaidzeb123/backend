import { AppError } from '../error/AppError';
import { Request, Response, NextFunction } from 'express'


export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);  // Log error message for debugging

    const statusCode : number = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({ message });
};