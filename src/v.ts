import { OutOfRangeError, SizingError } from "./errors";
import { Ix2 } from "./ix";

export class V2<T> {
  private num_rows: number;
  private num_cols: number;
  private data: Array<T>;

  constructor(data: Array<T>, num_rows: number, num_cols: number) {
    if (num_rows * num_cols !== data.length) {
      throw new SizingError(data.length, num_rows * num_cols);
    }
    this.num_rows = num_rows;
    this.num_cols = num_cols;
    this.data = data;
  }

  at_ix({ row_ix, col_ix }: Ix2): T {
    if (row_ix > this.num_rows) {
      throw new OutOfRangeError("row_ix");
    }
    if (col_ix > this.num_cols) {
      throw new OutOfRangeError("col_ix");
    }
    return this._get_at_ix(row_ix, col_ix);
  }

  neighbors_of({ row_ix, col_ix }: Ix2): Array<T> {
    const neighbors: Array<T> = [];
    for (const rmod of [-1, 0, 1]) {
      for (const cmod of [-1, 0, 1]) {
        const mr = row_ix + rmod;
        const mc = col_ix + cmod;
        if (
          !(
            mr < 0 ||
            mc < 0 ||
            mr >= this.num_rows ||
            mc >= this.num_cols ||
            (mr === row_ix && mc === col_ix)
          )
        ) {
          neighbors.push(this._get_at_ix(mr, mc));
        }
      }
    }
    return neighbors;
  }

  push_row(row: Array<T>) {
    if (row.length !== this.num_cols) {
      throw new SizingError(this.num_cols, row.length);
    }
    this.num_rows++;
    this.data.push(...row);
  }
  push_col(col: Array<T>) {
    if (col.length !== this.num_rows) {
      throw new SizingError(this.num_rows, col.length);
    }
    this.data.splice(this._to_ix(0, this.num_cols), 0, col[0]);
    for (let row_ix = 1; row_ix < this.num_rows; row_ix++) {
      const ix = this._to_ix(row_ix, this.num_cols + row_ix);
      this.data.splice(ix, 0, col[row_ix]);
    }
    this.num_cols++;
  }
  get rows(): Array<Array<T>> {
    const rs: Array<Array<T>> = [];
    for (let r_ix = 0; r_ix < this.num_rows; ) {
      let r: Array<T> = this.data.slice(
        r_ix * this.num_cols,
        ++r_ix * this.num_cols,
      );
      rs.push(r);
    }
    return rs;
  }
  get columns(): Array<Array<T>> {
    const cs: Array<Array<T>> = [];
    let c_ix = 0;
    while (c_ix < this.num_cols) {
      cs.push(this._column(c_ix));
      c_ix++;
    }
    return cs;
  }

  get cols() {
    return this.columns;
  }
  private _column(col_ix: number): Array<T> {
    const c: Array<T> = [];
    for (let r_ix = 0; r_ix < this.num_rows; r_ix++) {
      c.push(this.data[this._to_ix(r_ix, col_ix)]);
    }
    return c;
  }
  private _to_ix(row_ix: number, col_ix: number): number {
    return row_ix * this.num_cols + col_ix;
  }

  private _get_at_ix(row_ix: number, col_ix: number): T {
    return this.data[this._to_ix(row_ix, col_ix)];
  }
}
