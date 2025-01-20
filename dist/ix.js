"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ix2 = ix2;
const errors_1 = require("./errors");
function ix2({ row_ix, col_ix, }) {
    if (row_ix < 0) {
        throw new errors_1.Ix2Error("row_ix");
    }
    if (col_ix < 0) {
        throw new errors_1.Ix2Error("col_ix");
    }
    return { row_ix, col_ix };
}
