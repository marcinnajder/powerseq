import * as assert from "assert";
import { Enumerable, entries } from "../../src/index";

it('entries', function () {
    assert.deepEqual(Enumerable.entries<number>({ "a": 123, "b": 123123 }).toarray(), [["a", 123], ["b", 123123]]);
    assert.deepEqual(Enumerable.entries([1, 2, 3]).toarray(), [[0, 1], [1, 2], [2, 3]]);
});

export const samples = [
    () => entries({ 'a': 1, b: 2 }),
    () => entries([1, 2, 3]),
];

export const jsarray = "entries";