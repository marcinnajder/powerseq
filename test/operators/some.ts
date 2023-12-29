import * as assert from "assert";
import { some } from "../../src/index";

it('some', function () {
    assert.deepEqual(some([1, 2]), true);
    assert.deepEqual(some([]), false);
    assert.deepEqual(some([1, 2], x => x > 1), true);
    assert.deepEqual(some()([1, 2]), true);
});

export const samples = [
    () => some([1]),
    () => some([]),
    () => some([1, 2, 3], x => x > 2),
    () => some([1, 2, 3], x => x > 3),
];

export const jsarray = "some";
export const linq = "Any";
export const lodash = "some";
export const fsharp = "exists";
export const kotlin = "any";
export const clojure = "some";
export const java = "anyMatch";