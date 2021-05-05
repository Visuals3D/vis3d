export class InvalideWorldError extends Error {
    constructor(message?: string) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalideWorldError)
        }
        this.name = 'InvalideWorldError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}