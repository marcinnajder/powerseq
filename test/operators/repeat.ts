import * as assert from "assert";
import { repeat, take } from "../../src/index";

it('repeat', function () {
    assert.deepEqual(Array.from(repeat([1, 2, 3], 2)), [1, 2, 3, 1, 2, 3]);
    assert.deepEqual([...take(repeat([1, 2, 3]), 10)], [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]);
    assert.deepEqual([...repeat([1, 2, 3], 0)], []);
    assert.deepEqual([...repeat(2)([1, 2, 3])], [1, 2, 3, 1, 2, 3]);
});

export const samples = [
    () => repeat([1, 2, 3], 2),
    () => take(repeat([1, 2, 3]), 5)
];

export const rxjs = "repeat";
export const clojure = "cycle";