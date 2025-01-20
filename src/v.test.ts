import { V2 } from "./v";
import { VError } from "./errors";
import { ix2 } from "./ix";

const v2 = () => new V2([0, 1, 2, 3, 4, 5, 6, 7, 8], 3, 3);

describe("V2", () => {
  describe("initialization", () => {
    it("ok", () => {
      const v = new V2([0, 1, 2, 3, 4, 5, 6, 7, 8], 3, 3);
      expect(v).toBeInstanceOf(V2);
    });
    it("not ok", () => {
      try {
        const v = new V2([0, 1, 2, 3, 4, 5, 6, 7, 8], 2, 2);
        if (v) {
          throw new Error("v shouldn't exist");
        }
      } catch (e: any) {
        expect(e).toBeInstanceOf(VError);
        expect(e.message).toEqual("Size mismatch error: expected 9, got 4");
      }
    });
  });
  describe("at_ix", () => {
    const V = v2();
    describe("errors", () => {
      it("row_ix", () => {
        try {
          const res = V.at_ix(ix2({ row_ix: 4, col_ix: 0 }));
          if (res) {
            throw new Error("res shouldn't exist");
          }
        } catch (e: any) {
          expect(e).toBeInstanceOf(VError);
          expect(e.message).toEqual("Error: row_ix out of range");
        }
      });
      it("col_ix", () => {
        try {
          const res = V.at_ix(ix2({ row_ix: 0, col_ix: 4 }));
          if (res) {
            throw new Error("res shouldn't exist");
          }
        } catch (e: any) {
          expect(e).toBeInstanceOf(VError);
          expect(e.message).toEqual("Error: col_ix out of range");
        }
      });
    });
    describe("success", () => {
      it("succeeds", () => {
        const ix = ix2({ row_ix: 2, col_ix: 1 });
        const res = V.at_ix(ix);
        expect(res).toEqual(7);
      });
    });
  });
  describe("push_row", () => {
    it("succeeds", () => {
      const V = v2();
      const new_row = [9, 10, 11];
      V.push_row(new_row);
      const expected_rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [9, 10, 11],
      ];
      expect(V.rows).toEqual(expected_rows);
    });
    it("fails", () => {
      const V = v2();
      const new_row = [9, 10, 11, 12];
      try {
        V.push_row(new_row);
      } catch (e: any) {
        expect(e).toBeInstanceOf(VError);
        expect(e.message).toEqual("Size mismatch error: expected 3, got 4");
      }
    });
  });
  describe("push_col", () => {
    it("success", () => {
      const V = v2();
      const new_col = [9, 10, 11];
      V.push_col(new_col);
      const expected_rows = [
        [0, 1, 2, 9],
        [3, 4, 5, 10],
        [6, 7, 8, 11],
      ];
      expect(V.rows).toEqual(expected_rows);
    });
    it("fails", () => {
      const V = v2();
      const new_col = [9, 10, 11, 12];
      try {
        V.push_col(new_col);
      } catch (e: any) {
        expect(e).toBeInstanceOf(VError);
        expect(e.message).toEqual("Size mismatch error: expected 3, got 4");
      }
    });
  });
  describe("neighbors", () => {
    const V = v2();
    it("top left corner", () => {
      const ix = ix2({ row_ix: 0, col_ix: 0 });
      const expected = [1, 3, 4];
      expect(V.neighbors_of(ix)).toEqual(expected);
    });
    it("center", () => {
      const ix = ix2({ row_ix: 1, col_ix: 1 });
      const expected = [0, 1, 2, 3, 5, 6, 7, 8];
      expect(V.neighbors_of(ix)).toEqual(expected);
    });
    it("bottom middle", () => {
      const ix = ix2({ row_ix: 2, col_ix: 1 });
      const expected = [3, 4, 5, 6, 8];
      expect(V.neighbors_of(ix)).toEqual(expected);
    });
    it("right middle", () => {
      const ix = ix2({ row_ix: 1, col_ix: 2 });
      const expected = [1, 2, 4, 7, 8];
      expect(V.neighbors_of(ix)).toEqual(expected);
    });
  });
  describe("getters", () => {
    const V = v2();
    it("rows", () => {
      const expected = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ];
      expect(V.rows).toEqual(expected);
    });
    it("columns", () => {
      const expected = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ];
      expect(V.columns).toEqual(expected);
    });
  });
});
