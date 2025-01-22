# multid

a completely unnecessary multidimensional arrays implementation  
sometimes you just want to reinvent the wheel badly just to see if you can

## API

currently only 2d arrays are supported

```typescript
import { V2, ix2 } from "multid";

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const v = new V2(data, 3, 3); // 3 rows, 3 columns
const mapper = (_val, { rowIx, colIx }, _v2) =>
  rowIx % 2 !== 0 && colIx % 2 !== 0 ? "X" : "O";
console.log(v.map(mapper).prettyPrint());
// prints out:
// O O O
// O X O
// O O O
```
