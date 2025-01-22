import { ix2 } from "./ix";
import { VError } from "./errors";

describe("ix2", () => {
  it("initializes correctly", () => {
    const rowIx = 1;
    const colIx = 2;
    const ix = ix2({ rowIx, colIx });
    expect(ix.rowIx).toBe(rowIx);
    expect(ix.colIx).toBe(colIx);
  });
  it("doesn't initialize incorrectly", () => {
    const rowIx = -1;
    const colIx = 2;
    try {
      const res = ix2({ rowIx, colIx });
      if (res) {
        throw new Error("res shouldn't exist");
      }
    } catch (e: any) {
      expect(e).toBeInstanceOf(VError);
      expect(e.message).toEqual(
        "Error constructing 2d index: rowIx cannot be negative",
      );
    }
  });
});
