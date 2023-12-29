import * as assert from "assert";
import { entries } from "../../src/index";

it('entries', function () {
    assert.deepEqual([...entries({ "a": 123, "b": 123123 })], [["a", 123], ["b", 123123]]);
    assert.deepEqual([...entries([1, 2, 3])], [[0, 1], [1, 2], [2, 3]]);
});

export const samples = [
    () => entries({ 'a': 1, b: 2 }),
    () => entries([1, 2, 3]),
];

export const jsarray = "entries";
export const rxjs = "pairs";
