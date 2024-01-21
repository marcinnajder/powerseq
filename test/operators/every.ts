import * as assert from "assert";
import { every } from "../../src/index";

it('every', function () {
    assert.deepEqual(every([1, 2], x => x > 0), true);
    assert.deepEqual(every([1, 2], x => x > 1), false);
    assert.deepEqual(every((x: number) => x > 0)([1, 2]), true);
});


export const samples = [
    () => every([1, 2, 12, 15], x => x > 0),
    () => every([1, 2, 12, 15], x => x < 10),
    () => every([0, 1, 3, 3], (x, index) => x === index),
];

export const linq = "All";
export const jsarray = "every";
export const lodash = "every";
export const rxjs = "every";
export const fsharp = "forall";
export const kotlin = "all";
export const clojure = "every?";
export const java = "allMatch";