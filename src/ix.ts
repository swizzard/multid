// 2d index type
// use the `ix2` function, don't construct the type directly
import { Ix2Error } from "./errors";

export function ix2({ rowIx, colIx }: { rowIx: number; colIx: number }): Ix2 {
  if (rowIx < 0) {
    throw new Ix2Error("rowIx");
  }
  if (colIx < 0) {
    throw new Ix2Error("colIx");
  }
  return { rowIx: rowIx, colIx };
}

export type Ix2 = {
  rowIx: number;
  colIx: number;
};
