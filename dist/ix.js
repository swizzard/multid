"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ix2 = ix2;
// 2d index type
// use the `ix2` function, don't construct the type directly
const errors_1 = require("./errors");
function ix2({ rowIx, colIx }) {
    if (rowIx < 0) {
        throw new errors_1.Ix2Error("rowIx");
    }
    if (colIx < 0) {
        throw new errors_1.Ix2Error("colIx");
    }
    return { rowIx: rowIx, colIx };
}
