// Custom errors

export class VError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, VError.prototype);
  }
}

export class SizingError extends VError {
  constructor(expected: number, actual: number) {
    const m = `Size mismatch error: expected ${expected}, got ${actual}`;
    super(m);
  }
}

export class Ix2Error extends VError {
  constructor(fieldName: string) {
    const m = `Error constructing 2d index: ${fieldName} cannot be negative`;
    super(m);
  }
}

export class OutOfRangeError extends VError {
  constructor(fieldName: string) {
    const m = `Error: ${fieldName} out of range`;
    super(m);
  }
}
export function isVError<E extends Error>(err: E): boolean {
  return err instanceof VError;
}
