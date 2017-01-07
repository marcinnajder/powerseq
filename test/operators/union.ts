import * as assert from "assert";
import { Enumerable, union } from "../../src/index";

it('union', function () {
    assert.deepEqual(Array.from(union([1, 2, 3, 4, 2, 4], [4, 5, 6])), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).union([4, 5, 6]).toarray(), [1, 2, 3, 4, 5, 6]);
    assert.deepEqual(Enumerable.from([4, 1, 1, 2, 4]).union([1, 2, 3, 4, 5, 6], x => x % 3).toarray(), [4, 2, 3]);
});

export const samples = [
    () => union([1, 2, 2], [2, 3, 3, 4]),
    () => union(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = "Union";
export const lodash = ["union", "unionBy", "unionWith"];