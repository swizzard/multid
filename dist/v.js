"use strict";
// 2d array class
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2 = void 0;
const errors_1 = require("./errors");
class V2 {
    constructor(data, numRows, numCols) {
        if (numRows * numCols !== data.length) {
            throw new errors_1.SizingError(data.length, numRows * numCols);
        }
        this._numRows = numRows;
        this._numCols = numCols;
        this.data = data;
    }
    // access by index
    atIx({ rowIx, colIx }) {
        if (rowIx > this._numRows) {
            throw new errors_1.OutOfRangeError("rowIx");
        }
        if (colIx > this._numCols) {
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
                    mr >= this._numRows ||
                    mc >= this._numCols ||
                    (mr === rowIx && mc === colIx))) {
                    neighbors.push(this._getAtIx(mr, mc));
                }
            }
        }
        return neighbors;
    }
    // transformations
    map(f) {
        const ixs = this._indices;
        const mapped = [];
        for (let i = 0; i < this.data.length; i++) {
            mapped.push(f(this.data[i], ixs[i], this));
        }
        return new V2(mapped, this._numRows, this._numCols);
    }
    forEach(f) {
        const ixs = this._indices;
        for (let i = 0; i < this.data.length; i++) {
            f(this.data[i], ixs[i], this);
        }
    }
    prettyPrint() {
        const pieces = [];
        for (let i = 0; i < this.data.length; i++) {
            if ((i + 1) % this._numCols === 0) {
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
    get numRows() {
        return this._numRows;
    }
    get numCols() {
        return this._numRows;
    }
    get length() {
        return this.data.length;
    }
    get rows() {
        const rs = [];
        for (let rIx = 0; rIx < this._numRows;) {
            let r = this.data.slice(rIx * this._numCols, ++rIx * this._numCols);
            rs.push(r);
        }
        return rs;
    }
    get columns() {
        const cs = [];
        let cIx = 0;
        while (cIx < this._numCols) {
            cs.push(this._column(cIx));
            cIx++;
        }
        return cs;
    }
    // mutating functions
    pushRow(row) {
        if (row.length !== this._numCols) {
            throw new errors_1.SizingError(this._numCols, row.length);
        }
        this._numRows++;
        this.data.push(...row);
    }
    pushCol(col) {
        if (col.length !== this._numRows) {
            throw new errors_1.SizingError(this._numRows, col.length);
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
    _column(colIx) {
        const c = [];
        for (let rIx = 0; rIx < this._numRows; rIx++) {
            c.push(this.data[this._toIx(rIx, colIx)]);
        }
        return c;
    }
    _toIx(rowIx, colIx) {
        return rowIx * this._numCols + colIx;
    }
    _getAtIx(rowIx, colIx) {
        return this.data[this._toIx(rowIx, colIx)];
    }
    get _indices() {
        const ixs = [];
        for (let rowIx = 0; rowIx < this._numRows; rowIx++) {
            for (let colIx = 0; colIx < this._numCols; colIx++) {
                ixs.push({ rowIx, colIx });
            }
        }
        return ixs;
    }
}
exports.V2 = V2;
