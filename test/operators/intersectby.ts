import * as assert from "assert";
import { intersectby } from "../../src/index";

it('intersectby', function () {
    assert.deepEqual([...intersectby([1, 2, 3, 4, 2, 4], [4, 6], x => x % 3)], [4, 6]);
});

export const samples = [
    () => intersectby(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = "IntersectBy";
export const lodash = ["intersectionBy", "intersectionWith"];
