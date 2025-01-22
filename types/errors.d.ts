export declare class VError extends Error {
    constructor(message: string);
}
export declare class SizingError extends VError {
    constructor(expected: number, actual: number);
}
export declare class Ix2Error extends VError {
    constructor(fieldName: string);
}
export declare class OutOfRangeError extends VError {
    constructor(fieldName: string);
}
export declare function isVError<E extends Error>(err: E): boolean;
