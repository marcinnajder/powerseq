import * as assert from "assert";
import { concat, concatp } from "../../src/index";

it('concat', function () {
    assert.deepEqual([...concat([1, 2, 3], [4, 5], [6, 7])], [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual([...concat([1, 2, 3])], [1, 2, 3]);
    assert.deepEqual([...concatp([4, 5], [6, 7])([1, 2, 3])], [1, 2, 3, 4, 5, 6, 7]);
});

export const samples = [
    () => concat([1, 2], [3, 5], [6])
];

export const linq = "Concat";
export const jsarray = "concat";
export const lodash = "concat";
export const rxjs = "concat";
export const fsharp = "append";
export const kotlin = ["plus", "plusElement"];
export const clojure = "concat";
export const java = "concat";