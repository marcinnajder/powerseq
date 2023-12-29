import * as assert from "assert";
import { union } from "../../src/index";

it('union', function () {
    assert.deepEqual([...union([1, 2, 3, 4, 2, 4], [4, 5, 6])], [1, 2, 3, 4, 5, 6]);
    assert.deepEqual([...union([4, 1, 1, 2, 4], [1, 2, 3, 4, 5, 6], x => x % 3)], [4, 2, 3]);
    assert.deepEqual([...union([4, 5, 6])([1, 2, 3, 4, 2, 4])], [1, 2, 3, 4, 5, 6]);
});

export const samples = [
    () => union([1, 2, 2], [2, 3, 3, 4]),
    () => union(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = "Union";
export const lodash = ["union", "unionBy", "unionWith"];
export const kotlin = "union~";
export const clojure = "union~";