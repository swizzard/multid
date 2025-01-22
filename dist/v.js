"use strict";
// 2d array class
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2 = void 0;
const errors_1 = require("./errors");
class V2 {
    constructor(data, num_rows, num_cols) {
        if (num_rows * num_cols !== data.length) {
            throw new errors_1.SizingError(data.length, num_rows * num_cols);
        }
        this.numRows = num_rows;
        this.numCols = num_cols;
        this.data = data;
    }
    // access by index
    atIx({ rowIx, colIx }) {
        if (rowIx > this.numRows) {
            throw new errors_1.OutOfRangeError("rowIx");
        }
        if (colIx > this.numCols) {
            throw new errors_1.OutOfRangeError("colIx");
        }
        return this._getAtIx(rowIx, colIx);
    }
    neighborsOf({ rowIx, colIx }) {
        const neighbors = [];
        for (const rmod of [-1, 0, 1]) {
            for (const cmod of [-1, 0, 1]) {
                const mr = rowIx + rmod;
                const mc = colIx + cmod;
                if (!(mr < 0 ||
                    mc < 0 ||
                    mr >= this.numRows ||
                    mc >= this.numCols ||
                    (mr === rowIx && mc === colIx))) {
                    neighbors.push(this._getAtIx(mr, mc));
                }
            }
        }
        return neighbors;
    }
    // transformations
    mapped(f) {
        return new V2(this.data.map(f), this.numRows, this.numCols);
    }
    mappedIndexed(f) {
        const ixs = this._indices;
        const mapped = [];
        for (let i = 0; i < this.data.length; i++) {
            mapped.push(f(this.data[i], ixs[i]));
        }
        return new V2(mapped, this.numRows, this.numCols);
    }
    prettyPrint() {
        const pieces = [];
        for (let i = 0; i < this.data.length; i++) {
            if ((i + 1) % this.numCols === 0) {
                pieces.push(`${this.data[i]}\n`);
            }
            else if (i < this.data.length) {
                pieces.push(`${this.data[i]} `);
            }
            else {
                pieces.push(`${this.data[i]}`);
            }
        }
        return pieces.join("").trim();
    }
    // getters
    get rows() {
        const rs = [];
        for (let r_ix = 0; r_ix < this.numRows;) {
            let r = this.data.slice(r_ix * this.numCols, ++r_ix * this.numCols);
            rs.push(r);
        }
        return rs;
    }
    get columns() {
        const cs = [];
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
    pushRow(row) {
        if (row.length !== this.numCols) {
            throw new errors_1.SizingError(this.numCols, row.length);
        }
        this.numRows++;
        this.data.push(...row);
    }
    pushCol(col) {
        if (col.length !== this.numRows) {
            throw new errors_1.SizingError(this.numRows, col.length);
        }
        this.data.splice(this._toIx(0, this.numCols), 0, col[0]);
        for (let rowIx = 1; rowIx < this.numRows; rowIx++) {
            const ix = this._toIx(rowIx, this.numCols + rowIx);
            this.data.splice(ix, 0, col[rowIx]);
        }
        this.numCols++;
    }
    // private methods
    _column(colIx) {
        const c = [];
        for (let r_ix = 0; r_ix < this.numRows; r_ix++) {
            c.push(this.data[this._toIx(r_ix, colIx)]);
        }
        return c;
    }
    _toIx(rowIx, colIx) {
        return rowIx * this.numCols + colIx;
    }
    _getAtIx(rowIx, colIx) {
        return this.data[this._toIx(rowIx, colIx)];
    }
    get _indices() {
        const ixs = [];
        for (let rowIx = 0; rowIx < this.numRows; rowIx++) {
            for (let colIx = 0; colIx < this.numCols; colIx++) {
                ixs.push({ rowIx, colIx });
            }
        }
        return ixs;
    }
}
exports.V2 = V2;
