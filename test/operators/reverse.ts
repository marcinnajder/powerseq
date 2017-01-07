import * as assert from "assert";
import { Enumerable, reverse } from "../../src/index";

it('reverse', function () {
    assert.deepEqual(Array.from(reverse(["b", "c", "a"])), ["a", "c", "b"]);
    assert.deepEqual(Enumerable.from(["b", "c", "a"]).reverse().toarray(), ["a", "c", "b"]);
});

export const samples = [
    () => reverse([1, 2, 3])
];

export const jsarray = "reverse";
export const linq = "Reverse";
export const lodash = "reverse";
