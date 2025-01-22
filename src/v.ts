// 2d array class

import { OutOfRangeError, SizingError } from "./errors";
import { Ix2 } from "./ix";

export class V2<T> {
  private _numRows: number;
  private _numCols: number;
  private data: Array<T>;

  constructor(data: Array<T>, numRows: number, numCols: number) {
    if (numRows * numCols !== data.length) {
      throw new SizingError(data.length, numRows * numCols);
    }
    this._numRows = numRows;
    this._numCols = numCols;
    this.data = data;
  }

  // access by index

  atIx({ rowIx, colIx }: Ix2): T {
    if (rowIx > this._numRows) {
      throw new OutOfRangeError("rowIx");
    }
    if (colIx > this._numCols) {
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
            mr >= this._numRows ||
            mc >= this._numCols ||
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
  map<U>(f: (val: T, ix: Ix2, v2: V2<T>) => U): V2<U> {
    const ixs = this._indices;
    const mapped: Array<U> = [];
    for (let i = 0; i < this.data.length; i++) {
      mapped.push(f(this.data[i], ixs[i], this));
    }
    return new V2(mapped, this._numRows, this._numCols);
  }

  forEach(f: (val: T, ix: Ix2, v2: V2<T>) => void): void {
    const ixs = this._indices;
    for (let i = 0; i < this.data.length; i++) {
      f(this.data[i], ixs[i], this);
    }
  }

  prettyPrint() {
    const pieces: Array<string> = [];
    for (let i = 0; i < this.data.length; i++) {
      if ((i + 1) % this._numCols === 0) {
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
  get numRows(): number {
    return this._numRows;
  }

  get numCols(): number {
    return this._numRows;
  }

  get length(): number {
    return this.data.length;
  }
  get rows(): Array<Array<T>> {
    const rs: Array<Array<T>> = [];
    for (let rIx = 0; rIx < this._numRows; ) {
      let r: Array<T> = this.data.slice(
        rIx * this._numCols,
        ++rIx * this._numCols,
      );
      rs.push(r);
    }
    return rs;
  }
  get columns(): Array<Array<T>> {
    const cs: Array<Array<T>> = [];
    let cIx = 0;
    while (cIx < this._numCols) {
      cs.push(this._column(cIx));
      cIx++;
    }
    return cs;
  }

  // mutating functions
  pushRow(row: Array<T>) {
    if (row.length !== this._numCols) {
      throw new SizingError(this._numCols, row.length);
    }
    this._numRows++;
    this.data.push(...row);
  }
  pushCol(col: Array<T>) {
    if (col.length !== this._numRows) {
      throw new SizingError(this._numRows, col.length);
    }
    this.data.splice(this._toIx(0, this._numCols), 0, col[0]);
    for (let rowIx = 1; rowIx < this._numRows; rowIx++) {
      const ix = this._toIx(rowIx, this._numCols + rowIx);
      this.data.splice(ix, 0, col[rowIx]);
    }
    this._numCols++;
  }

  // alias for convenience
  get cols() {
    return this.columns;
  }
  // private methods
  private _column(colIx: number): Array<T> {
    const c: Array<T> = [];
    for (let rIx = 0; rIx < this._numRows; rIx++) {
      c.push(this.data[this._toIx(rIx, colIx)]);
    }
    return c;
  }
  private _toIx(rowIx: number, colIx: number): number {
    return rowIx * this._numCols + colIx;
  }

  private _getAtIx(rowIx: number, colIx: number): T {
    return this.data[this._toIx(rowIx, colIx)];
  }
  private get _indices() {
    const ixs: Array<Ix2> = [];
    for (let rowIx = 0; rowIx < this._numRows; rowIx++) {
      for (let colIx = 0; colIx < this._numCols; colIx++) {
        ixs.push({ rowIx, colIx });
      }
    }
    return ixs;
  }
}
