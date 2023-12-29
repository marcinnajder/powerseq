import * as assert from "assert";
import { skip } from "../../src/index";

it('skip', function () {
    assert.deepEqual(Array.from(skip([1, 2, 3, 4], 1)), [2, 3, 4]);
    assert.deepEqual([...skip([1, 2, 3, 4], 0)], [1, 2, 3, 4]);
    assert.deepEqual([...skip([1, 2, 3, 4], 1)], [2, 3, 4]);
    assert.deepEqual([...skip([1, 2, 3, 4], 5)], []);

    assert.deepEqual([...skip(1)([1, 2, 3, 4])], [2, 3, 4]);
});

export const samples = [
    () => skip([1, 2, 3, 4, 5], 2)
];

export const linq = "Skip";
export const lodash = ["drop", "tail"];
export const rxjs = "skip";
export const fsharp = "skip~";
export const kotlin = "drop";
export const clojure = "drop";
export const java = "skip";

