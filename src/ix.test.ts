import { ix2 } from "./ix";
import { VError } from "./errors";

describe("ix2", () => {
  it("initializes correctly", () => {
    const row_ix = 1;
    const col_ix = 2;
    const ix = ix2({ row_ix, col_ix });
    expect(ix.row_ix).toBe(row_ix);
    expect(ix.col_ix).toBe(col_ix);
  });
  it("doesn't initialize incorrectly", () => {
    const row_ix = -1;
    const col_ix = 2;
    try {
      const res = ix2({ row_ix, col_ix });
      if (res) {
        throw new Error("res shouldn't exist");
      }
    } catch (e: any) {
      expect(e).toBeInstanceOf(VError);
      expect(e.message).toEqual(
        "Error constructing 2d index: row_ix cannot be negative",
      );
    }
  });
});
