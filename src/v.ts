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
    return this.data[this._to_ix(row_ix, col_ix)];
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
    this.num_cols++;
    for (let row_ix = 0; row_ix < this.num_rows; row_ix++) {
      this.data.splice(this._to_ix(row_ix, this.num_cols), 0, col[row_ix]);
    }
  }
  get rows(): Array<Array<T>> {
    const rs: Array<Array<T>> = [];
    for (let r_ix = 0; r_ix < this.num_rows; r_ix++) {
      let r: Array<T> = this.data.slice(
        r_ix * this.num_cols,
        (r_ix + 1) * this.num_cols,
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
    return row_ix * this.num_rows + col_ix;
  }
}
