import * as assert from "assert";
import { zip, zipp } from "../../src/index";

it('zip', function () {
    assert.deepEqual([...zip(["a", "b", "c"], [1, 2], (s, n) => s + n)], ["a1", "b2"]);
    assert.deepEqual([...zip(["a", "b", "c"], [1, 2, 3, 4, 5], [false, true], (s, n, b) => s + n + b)], ["a1false", "b2true"]);
    assert.deepEqual([...zipp<string, number, string>([1, 2], (s, n) => s + n)(["a", "b", "c"])], ["a1", "b2"]);
});

export const samples = [
    () => zip(['a', 'b', 'c'], [1, 2], (s, n) => s + n),
    () => zip(['a', 'b', 'c'], [1, 2], [false], (s, n, b) => s + n + b),
];

export const linq = "Zip";
export const lodash = ["zip", "zipWith"];
export const rxjs = "zip";
export const fsharp = ["zip", "zip3"];
export const kotlin = "zip";
export const clojure = "map";