import * as assert from "assert";
import { filter, Enumerable } from "../../src/enumerable";

it('filter', function () {
    assert.deepEqual(Array.from(filter([1, 2, 3, 4], x => x % 2 === 0)), [2, 4]);

    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).filter(x => x % 2 === 0).toarray(), [2, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).filter((x, index) => index % 2 === 0).toarray(), [1, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).filter(x => x % 2 === 0).toarray(), [2, 4]);

    assert.deepEqual(Array.from(filter<number>(x => x % 2 === 0)([1, 2, 3, 4])), [2, 4]);
});

export const samples = [
    () => filter([1, 2, 2, 3, 4], x => x > 2),
    () => filter([1, 2, 2, 3, 4], (x, index) => x - 1 === index),
];

export const jsarray = "filter";
export const linq = "Where";
export const lodash = "filter";
export const rxjs = "filter";
export const fsharp = ["filter", "where"];
export const kotlin = ["filter", "filterIndexed"];
export const clojure = "filter";
export const java = "filter";