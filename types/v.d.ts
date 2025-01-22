import { Ix2 } from "./ix";
export declare class V2<T> {
    private numRows;
    private numCols;
    private data;
    constructor(data: Array<T>, num_rows: number, num_cols: number);
    atIx({ rowIx, colIx }: Ix2): T;
    neighborsOf({ rowIx, colIx }: Ix2): Array<T>;
    map<U>(f: (val: T, ix: Ix2, v2: V2<T>) => U): V2<U>;
    forEach(f: (val: T, ix: Ix2, v2: V2<T>) => void): void;
    prettyPrint(): string;
    get rows(): Array<Array<T>>;
    get columns(): Array<Array<T>>;
    get cols(): T[][];
    pushRow(row: Array<T>): void;
    pushCol(col: Array<T>): void;
    private _column;
    private _toIx;
    private _getAtIx;
    private get _indices();
}
