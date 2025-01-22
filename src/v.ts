// 2d array class

import { OutOfRangeError, SizingError } from "./errors";
import { Ix2 } from "./ix";

export class V2<T> {
  private numRows: number;
  private numCols: number;
  private data: Array<T>;

  constructor(data: Array<T>, num_rows: number, num_cols: number) {
    if (num_rows * num_cols !== data.length) {
      throw new SizingError(data.length, num_rows * num_cols);
    }
    this.numRows = num_rows;
    this.numCols = num_cols;
    this.data = data;
  }

  // access by index

  atIx({ rowIx, colIx }: Ix2): T {
    if (rowIx > this.numRows) {
      throw new OutOfRangeError("rowIx");
    }
    if (colIx > this.numCols) {
      throw new OutOfRangeError("colIx");
    }
    return this._getAtIx(rowIx, colIx);
  }

  neighborsOf({ rowIx, colIx }: Ix2): Array<T> {
    const neighbors: Array<T> = [];
    for (const rmod of [-1, 0, 1]) {
      for (const cmod of [-1, 0, 1]) {
        const mr = rowIx + rmod;
        const mc = colIx + cmod;
        if (
          !(
            mr < 0 ||
            mc < 0 ||
            mr >= this.numRows ||
            mc >= this.numCols ||
            (mr === rowIx && mc === colIx)
          )
        ) {
          neighbors.push(this._getAtIx(mr, mc));
        }
      }
    }
    return neighbors;
  }

  // transformations
  mapped<U>(f: (val: T) => U): V2<U> {
    return new V2(this.data.map(f), this.numRows, this.numCols);
  }
  mappedIndexed<U>(f: (val: T, ix: Ix2) => U): V2<U> {
    const ixs = this._indices;
    const mapped: Array<U> = [];
    for (let i = 0; i < this.data.length; i++) {
      mapped.push(f(this.data[i], ixs[i]));
    }
    return new V2(mapped, this.numRows, this.numCols);
  }

  prettyPrint() {
    const pieces: Array<string> = [];
    for (let i = 0; i < this.data.length; i++) {
      if ((i + 1) % this.numCols === 0) {
        pieces.push(`${this.data[i]}\n`);
      } else if (i < this.data.length) {
        pieces.push(`${this.data[i]} `);
      } else {
        pieces.push(`${this.data[i]}`);
      }
    }
    return pieces.join("").trim();
  }
  // getters
  get rows(): Array<Array<T>> {
    const rs: Array<Array<T>> = [];
    for (let r_ix = 0; r_ix < this.numRows; ) {
      let r: Array<T> = this.data.slice(
        r_ix * this.numCols,
        ++r_ix * this.numCols,
      );
      rs.push(r);
    }
    return rs;
  }
  get columns(): Array<Array<T>> {
    const cs: Array<Array<T>> = [];
    let c_ix = 0;
    while (c_ix < this.numCols) {
      cs.push(this._column(c_ix));
      c_ix++;
    }
    return cs;
  }

  // alias for convenience
  get cols() {
    return this.columns;
  }
  // mutating functions
  pushRow(row: Array<T>) {
    if (row.length !== this.numCols) {
      throw new SizingError(this.numCols, row.length);
    }
    this.numRows++;
    this.data.push(...row);
  }
  pushCol(col: Array<T>) {
    if (col.length !== this.numRows) {
      throw new SizingError(this.numRows, col.length);
    }
    this.data.splice(this._toIx(0, this.numCols), 0, col[0]);
    for (let rowIx = 1; rowIx < this.numRows; rowIx++) {
      const ix = this._toIx(rowIx, this.numCols + rowIx);
      this.data.splice(ix, 0, col[rowIx]);
    }
    this.numCols++;
  }
  // private methods
  private _column(colIx: number): Array<T> {
    const c: Array<T> = [];
    for (let r_ix = 0; r_ix < this.numRows; r_ix++) {
      c.push(this.data[this._toIx(r_ix, colIx)]);
    }
    return c;
  }
  private _toIx(rowIx: number, colIx: number): number {
    return rowIx * this.numCols + colIx;
  }

  private _getAtIx(rowIx: number, colIx: number): T {
    return this.data[this._toIx(rowIx, colIx)];
  }
  private get _indices() {
    const ixs: Array<Ix2> = [];
    for (let rowIx = 0; rowIx < this.numRows; rowIx++) {
      for (let colIx = 0; colIx < this.numCols; colIx++) {
        ixs.push({ rowIx, colIx });
      }
    }
    return ixs;
  }
}
