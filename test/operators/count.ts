import * as assert from "assert";
import { count } from "../../src/index";

it('count', function () {
    assert.deepEqual(count([]), 0);
    assert.deepEqual(count([1, 2, 3]), 3);
    assert.deepEqual(count([1, 2, 3], x => x > 1), 2);

    assert.deepEqual(count((x: number) => x > 1)([1, 2, 3]), 2);
});

export const samples = [
    () => count([2, 2, 2]),
    () => count([2, 4, 6], x => x > 2),
    () => count([2, 4, 6], (x, index) => index >= 2)
];

export const linq = "Count";
export const lodash = "size";
export const rxjs = "count";
export const fsharp = "length";
export const kotlin = "count";
export const clojure = "count";
export const java = ["count", "C.counting", "C.summarizing*"];