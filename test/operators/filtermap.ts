import * as assert from "assert";
import { filtermap, pipe } from "../../src/index";

it('filtermap', function () {
    assert.deepEqual([...filtermap([1, 2, 3, 4], x => x % 2 === 0 ? (x * 10).toString() : null)], ["20", "40"]);
    assert.deepEqual([...filtermap([1, 2, 3, 4], (x, i) => i % 2 === 0 ? (x * 10).toString() : null)], ["10", "30"]);

    assert.deepEqual([...pipe([1, 2, 3, 4], filtermap(x => x % 2 === 0 ? (x * 10).toString() : null))], ["20", "40"]);
});

export const samples = [
    () => filtermap([1, 2, 3, 4], x => x % 2 === 0 ? (x * 10).toString() : null),
    () => filtermap([1, 2, 3, 4], (x, i) => i % 2 === 0 ? (x * 10).toString() : null)
];

export const fsharp = "choose";
export const kotlin = ["mapNotNull", "mapIndexedNotNull"];
export const clojure = "keep";




