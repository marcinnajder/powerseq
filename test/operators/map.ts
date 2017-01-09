import * as assert from "assert";
import { Enumerable, map } from "../../src/index";

it('map', function () {
    assert.deepEqual(Array.from(map([1, 2, 3], x => x + 1)), [2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).map(x => x + 1).toarray(), [2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3]).map((x, index) => x + index).toarray(), [1, 3, 5]);
});

export const samples = [
    () => map([1, 2, 3], x => x * 10),
    () => map([1, 2, 3], (x, index) => x * 10 + index)
];

export const jsarray = "map";
export const linq = "Select";
export const lodash = "map";
export const rxjs = "map";
export const fsharp = "map";
