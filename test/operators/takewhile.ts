import * as assert from "assert";
import { Enumerable, takewhile } from "../../src/enumerable";

it('takewhile', function () {
    assert.deepEqual(Array.from(takewhile([1, 2, 3, 4], x => x < 3)), [1, 2]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).takewhile(x => true).toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).takewhile(x => false).toarray(), []);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).takewhile(x => x < 3).toarray(), [1, 2]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).takewhile((x, index) => index < 3).toarray(), [1, 2, 3]);

    assert.deepEqual(Array.from(takewhile(x => x < 3)([1, 2, 3, 4])), [1, 2]);
});

export const samples = [
    () => takewhile([1, 2, 2, 3, 3, 4, 5], x => x < 3)
];

export const linq = "TakeWhile";
export const lodash = "takeWhile";
export const rxjs = "takeWhile";
export const fsharp = "takeWhile";
export const kotlin = "takeWhile";
export const clojure = "take-while";
export const java = "takeWhile";