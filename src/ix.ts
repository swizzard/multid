import { Ix2Error } from "./errors";
export function ix2({
  row_ix,
  col_ix,
}: {
  row_ix: number;
  col_ix: number;
}): Ix2 {
  if (row_ix < 0) {
    throw new Ix2Error("row_ix");
  }
  if (col_ix < 0) {
    throw new Ix2Error("col_ix");
  }
  return { row_ix, col_ix };
}

export type Ix2 = {
  row_ix: number;
  col_ix: number;
};
