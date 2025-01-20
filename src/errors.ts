export function isVError<E extends Error>(err: E): boolean {
  return err instanceof VError;
}

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
  constructor(field_name: string) {
    const m = `Error constructing 2d index: ${field_name} cannot be negative`;
    super(m);
  }
}

export class OutOfRangeError extends VError {
  constructor(field_name: string) {
    const m = `Error: ${field_name} out of range`;
    super(m);
  }
}
