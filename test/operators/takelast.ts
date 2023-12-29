import * as assert from "assert";
import { takelast } from "../../src/index";

it('takelast', function () {
    assert.deepEqual(Array.from(takelast([1, 2, 3], 2)), [2, 3]);
    assert.deepEqual([...takelast([1, 2, 3, 4], 0)], []);
    assert.deepEqual([...takelast([1, 2, 3, 4], 1)], [4]);
    assert.deepEqual([...takelast([1, 2, 3, 4], 5)], [1, 2, 3, 4]);
    assert.deepEqual([...takelast([], 5)], []);

    assert.deepEqual(Array.from(takelast(2)([1, 2, 3])), [2, 3]);
});

export const samples = [
    () => takelast([1, 2, 3], 2),
    () => takelast([1, 2, 3], 0),
    () => takelast([1, 2, 3], 5)
];

export const lodash = ["last", "takeRight"];
export const rxjs = "takeLast";
export const clojure = "take-last";
