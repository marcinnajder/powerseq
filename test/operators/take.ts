import * as assert from "assert";
import { take } from "../../src/index";

it('take', function () {
    assert.deepEqual([...take([1, 2, 3, 4], 2)], [1, 2]);
    assert.deepEqual([...take([1, 2, 3, 4], 0)], []);
    assert.deepEqual([...take([1, 2, 3, 4], 2)], [1, 2]);
    assert.deepEqual([...take([1, 2, 3, 4], 10)], [1, 2, 3, 4]);

    assert.deepEqual(Array.from(take(2)([1, 2, 3, 4])), [1, 2]);
});

export const samples = [
    () => take([1, 2, 3, 4, 5], 2)
];

export const linq = "Take";
export const lodash = "take";
export const rxjs = "take";
export const fsharp = ["truncate", "~take"];
export const kotlin = "take";
export const clojure = "take";
export const java = "limit";
