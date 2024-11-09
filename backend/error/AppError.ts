export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';  // Optional: specify error name for clarity
        Error.captureStackTrace(this, this.constructor);
    }
}
