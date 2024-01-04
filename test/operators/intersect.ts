import * as assert from "assert";
import { intersect } from "../../src/index";

it('intersect', function () {
    assert.deepEqual(Array.from(intersect([1, 2, 3, 4, 2, 4], [4, 5, 6, 1, 1])), [4, 1]);
    assert.deepEqual([...intersect([1, 2, 3, 4, 2, 4], [4, 6], x => x % 3)], [4, 6]);
    assert.deepEqual(Array.from(intersect([4, 5, 6, 1, 1])([1, 2, 3, 4, 2, 4])), [4, 1]);
});



export const samples = [
    () => intersect([1, 2, 2, 3], [3, 3, 1]),
    () => intersect(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = ["Intersect", "IntersectBy"];
export const lodash = ["intersection", "intersectionBy", "intersectionWith"];
export const kotlin = "intersect~";
export const clojure = "intersection~";