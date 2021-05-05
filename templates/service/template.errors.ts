/*
export class CustomError extends Error {
    constructor(message?: string) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.name = 'CustomError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
*/