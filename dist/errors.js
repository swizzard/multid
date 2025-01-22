"use strict";
// Custom errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfRangeError = exports.Ix2Error = exports.SizingError = exports.VError = void 0;
exports.isVError = isVError;
class VError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, VError.prototype);
    }
}
exports.VError = VError;
class SizingError extends VError {
    constructor(expected, actual) {
        const m = `Size mismatch error: expected ${expected}, got ${actual}`;
        super(m);
    }
}
exports.SizingError = SizingError;
class Ix2Error extends VError {
    constructor(fieldName) {
        const m = `Error constructing 2d index: ${fieldName} cannot be negative`;
        super(m);
    }
}
exports.Ix2Error = Ix2Error;
class OutOfRangeError extends VError {
    constructor(fieldName) {
        const m = `Error: ${fieldName} out of range`;
        super(m);
    }
}
exports.OutOfRangeError = OutOfRangeError;
function isVError(err) {
    return err instanceof VError;
}
