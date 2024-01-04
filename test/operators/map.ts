import * as assert from "assert";
import { map } from "../../src/index";

it('map', function () {
    assert.deepEqual([...map([1, 2, 3], x => x + 1)], [2, 3, 4]);
    assert.deepEqual([...map([1, 2, 3], (x, index) => x + index)], [1, 3, 5]);
    assert.deepEqual([...map((x: number) => x + 1)([1, 2, 3])], [2, 3, 4]);
});

export const samples = [
    () => map([1, 2, 3], x => x * 10),
    () => map([1, 2, 3], (x, index) => x * 10 + index)
];

export const jsarray = "map";
export const linq = "Select";
export const lodash = "map";
export const rxjs = "map";
export const fsharp = ["map", "mapi"];
export const kotlin = ["map", "mapIndexed"];
export const clojure = "map";
export const java = "map";



