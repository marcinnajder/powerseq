import * as assert from "assert";
import { skiplast } from "../../src/index";

it('skiplast', function () {
    assert.deepEqual(Array.from(skiplast([1, 2, 3, 4], 2)), [1, 2]);
    assert.deepEqual([...skiplast([1, 2, 3, 4], 0)], [1, 2, 3, 4]);
    assert.deepEqual([...skiplast([1, 2, 3, 4], 1)], [1, 2, 3]);
    assert.deepEqual([...skiplast([1, 2, 3, 4], 5)], []);
    assert.deepEqual([...skiplast([1, 2, 3, 4], 4)], []);
    assert.deepEqual([...skiplast([], 5)], []);

    assert.deepEqual([...skiplast(2)([1, 2, 3, 4])], [1, 2]);
});

export const samples = [
    () => skiplast([1, 2, 3, 4], 2),
    () => skiplast([1, 2, 3, 4], 0),
    () => skiplast([1, 2, 3, 4], 5)
];

export const lodash = ["dropRight", "initial"];
export const clojure = "drop-last";