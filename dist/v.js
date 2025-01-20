"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2 = void 0;
const errors_1 = require("./errors");
class V2 {
    constructor(data, num_rows, num_cols) {
        if (num_rows * num_cols !== data.length) {
            throw new errors_1.SizingError(data.length, num_rows * num_cols);
        }
        this.num_rows = num_rows;
        this.num_cols = num_cols;
        this.data = data;
    }
    at_ix({ row_ix, col_ix }) {
        if (row_ix > this.num_rows) {
            throw new errors_1.OutOfRangeError("row_ix");
        }
        if (col_ix > this.num_cols) {
            throw new errors_1.OutOfRangeError("col_ix");
        }
        return this._get_at_ix(row_ix, col_ix);
    }
    neighbors_of({ row_ix, col_ix }) {
        const neighbors = [];
        for (const rmod of [-1, 0, 1]) {
            for (const cmod of [-1, 0, 1]) {
                const mr = row_ix + rmod;
                const mc = col_ix + cmod;
                if (!(mr < 0 ||
                    mc < 0 ||
                    mr >= this.num_rows ||
                    mc >= this.num_cols ||
                    (mr === row_ix && mc === col_ix))) {
                    neighbors.push(this._get_at_ix(mr, mc));
                }
            }
        }
        return neighbors;
    }
    push_row(row) {
        if (row.length !== this.num_cols) {
            throw new errors_1.SizingError(this.num_cols, row.length);
        }
        this.num_rows++;
        this.data.push(...row);
    }
    push_col(col) {
        if (col.length !== this.num_rows) {
            throw new errors_1.SizingError(this.num_rows, col.length);
        }
        this.data.splice(this._to_ix(0, this.num_cols), 0, col[0]);
        for (let row_ix = 1; row_ix < this.num_rows; row_ix++) {
            const ix = this._to_ix(row_ix, this.num_cols + row_ix);
            this.data.splice(ix, 0, col[row_ix]);
        }
        this.num_cols++;
    }
    get rows() {
        const rs = [];
        for (let r_ix = 0; r_ix < this.num_rows;) {
            let r = this.data.slice(r_ix * this.num_cols, ++r_ix * this.num_cols);
            rs.push(r);
        }
        return rs;
    }
    get columns() {
        const cs = [];
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
    _column(col_ix) {
        const c = [];
        for (let r_ix = 0; r_ix < this.num_rows; r_ix++) {
            c.push(this.data[this._to_ix(r_ix, col_ix)]);
        }
        return c;
    }
    _to_ix(row_ix, col_ix) {
        return row_ix * this.num_cols + col_ix;
    }
    _get_at_ix(row_ix, col_ix) {
        return this.data[this._to_ix(row_ix, col_ix)];
    }
}
exports.V2 = V2;
