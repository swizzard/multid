import { Ix2 } from "./ix";
export declare class V2<T> {
    private num_rows;
    private num_cols;
    private data;
    constructor(data: Array<T>, num_rows: number, num_cols: number);
    at_ix({ row_ix, col_ix }: Ix2): T;
    neighbors_of({ row_ix, col_ix }: Ix2): Array<T>;
    mapped<U>(f: (val: T) => U): V2<U>;
    mapped_indexed<U>(f: (val: T, ix: Ix2) => U): V2<U>;
    push_row(row: Array<T>): void;
    push_col(col: Array<T>): void;
    pretty_print(): string;
    get rows(): Array<Array<T>>;
    get columns(): Array<Array<T>>;
    get cols(): T[][];
    private _column;
    private _to_ix;
    private _get_at_ix;
    private get _indices();
}
