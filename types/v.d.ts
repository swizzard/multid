import { Ix2 } from "./ix";
export declare class V2<T> {
    private _numRows;
    private _numCols;
    private data;
    constructor(data: Array<T>, numRows: number, numCols: number);
    atIx({ rowIx, colIx }: Ix2): T;
    neighborsOf({ rowIx, colIx }: Ix2): Array<T>;
    map<U>(f: (val: T, ix: Ix2, v2: V2<T>) => U): V2<U>;
    forEach(f: (val: T, ix: Ix2, v2: V2<T>) => void): void;
    prettyPrint(): string;
    get numRows(): number;
    get numCols(): number;
    get length(): number;
    get rows(): Array<Array<T>>;
    get columns(): Array<Array<T>>;
    pushRow(row: Array<T>): void;
    pushCol(col: Array<T>): void;
    get cols(): T[][];
    private _column;
    private _toIx;
    private _getAtIx;
    private get _indices();
}
