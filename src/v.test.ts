import { V2 } from "./v";
import { VError } from "./errors";
import { ix2, Ix2 } from "./ix";

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
  describe("atIx", () => {
    const V = v2();
    describe("errors", () => {
      it("rowIx", () => {
        try {
          const res = V.atIx(ix2({ rowIx: 4, colIx: 0 }));
          if (res) {
            throw new Error("res shouldn't exist");
          }
        } catch (e: any) {
          expect(e).toBeInstanceOf(VError);
          expect(e.message).toEqual("Error: rowIx out of range");
        }
      });
      it("colIx", () => {
        try {
          const res = V.atIx(ix2({ rowIx: 0, colIx: 4 }));
          if (res) {
            throw new Error("res shouldn't exist");
          }
        } catch (e: any) {
          expect(e).toBeInstanceOf(VError);
          expect(e.message).toEqual("Error: colIx out of range");
        }
      });
    });
    describe("success", () => {
      it("succeeds", () => {
        const ix = ix2({ rowIx: 2, colIx: 1 });
        const res = V.atIx(ix);
        expect(res).toEqual(7);
      });
    });
  });
  describe("neighborsOf", () => {
    const V = v2();
    it("top left corner", () => {
      const ix = ix2({ rowIx: 0, colIx: 0 });
      const expected = [1, 3, 4];
      expect(V.neighborsOf(ix)).toEqual(expected);
    });
    it("center", () => {
      const ix = ix2({ rowIx: 1, colIx: 1 });
      const expected = [0, 1, 2, 3, 5, 6, 7, 8];
      expect(V.neighborsOf(ix)).toEqual(expected);
    });
    it("bottom middle", () => {
      const ix = ix2({ rowIx: 2, colIx: 1 });
      const expected = [3, 4, 5, 6, 8];
      expect(V.neighborsOf(ix)).toEqual(expected);
    });
    it("right middle", () => {
      const ix = ix2({ rowIx: 1, colIx: 2 });
      const expected = [1, 2, 4, 7, 8];
      expect(V.neighborsOf(ix)).toEqual(expected);
    });
  });
  describe("map", () => {
    const V = v2();
    const expected = [
      ["0 0 0", "1 0 1", "2 0 2"],
      ["3 1 0", "4 1 1", "5 1 2"],
      ["6 2 0", "7 2 1", "8 2 2"],
    ];
    const m = V.map(
      (val: number, { rowIx, colIx }: Ix2, _v: V2<number>) =>
        `${val} ${rowIx} ${colIx}`,
    );
    expect(m.rows).toEqual(expected);
  });
  describe("forEach", () => {
    const V = v2();
    const expected = [
      "0 0 0",
      "1 0 1",
      "2 0 2",
      "3 1 0",
      "4 1 1",
      "5 1 2",
      "6 2 0",
      "7 2 1",
      "8 2 2",
    ];
    const a: Array<string> = [];
    V.forEach((val: number, { rowIx, colIx }: Ix2, _v: V2<number>) => {
      a.push(`${val} ${rowIx} ${colIx}`);
    });
    expect(a).toEqual(expected);
  });
  describe("pushRow", () => {
    it("succeeds", () => {
      const V = v2();
      const new_row = [9, 10, 11];
      V.pushRow(new_row);
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
        V.pushRow(new_row);
      } catch (e: any) {
        expect(e).toBeInstanceOf(VError);
        expect(e.message).toEqual("Size mismatch error: expected 3, got 4");
      }
    });
  });
  describe("pushCol", () => {
    it("success", () => {
      const V = v2();
      const new_col = [9, 10, 11];
      V.pushCol(new_col);
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
        V.pushCol(new_col);
      } catch (e: any) {
        expect(e).toBeInstanceOf(VError);
        expect(e.message).toEqual("Size mismatch error: expected 3, got 4");
      }
    });
  });
  describe("pretty print", () => {
    const V = v2();
    const expected = "0 1 2\n3 4 5\n6 7 8";
    expect(V.prettyPrint()).toEqual(expected);
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
