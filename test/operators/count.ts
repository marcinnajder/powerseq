import * as assert from "assert";
import { Enumerable, count } from "../../src/enumerable";

it('count', function () {
    assert.deepEqual(count([]), 0);
    assert.deepEqual(count([1, 2, 3]), 3);
    assert.deepEqual(Enumerable.from([]).count(), 0);
    assert.deepEqual(Enumerable.from([1, 2, 3]).count(), 3);
    assert.deepEqual(Enumerable.from([1, 2, 3]).count(x => x > 1), 2);

    assert.deepEqual(count(x => x > 1)([1, 2, 3]), 2);
});

export const samples = [
    () => count([2, 2, 2]),
    () => count([2, 4, 6], x => x > 2)
];

export const linq = "Count";
export const lodash = "size";
export const rxjs = "count";
export const fsharp = "length";
export const kotlin = "count";
export const clojure = "count";
export const java = ["count", "C.counting", "C.summarizing*"];