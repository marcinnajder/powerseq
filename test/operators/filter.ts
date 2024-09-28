import * as assert from "assert";
import { filter, pipe } from "../../src/index";

it('filter', function () {
    assert.deepEqual(Array.from(filter([1, 2, 3, 4], x => x % 2 === 0)), [2, 4]);
    assert.deepEqual([...filter([1, 2, 3, 4], (x, index) => index % 2 === 0)], [1, 3]);
    assert.deepEqual([...filter([1, 2, 3, 4], x => x % 2 === 0)], [2, 4]);
    assert.deepEqual([...filter((x: number) => x % 2 === 0)([1, 2, 3, 4])], [2, 4]);

    const stringsOrNumbers = ["1", 2, "3", 4];
    const strings1 = filter(stringsOrNumbers, x => typeof x === "string");
    assert.deepEqual([...strings1], ["1", "3"]);

    const strings2 = pipe(stringsOrNumbers, filter(x => typeof x === "string"));
    assert.deepEqual([...strings2], ["1", "3"]);
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