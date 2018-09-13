import * as assert from "assert";
import { Enumerable, intersect } from "../../src/enumerable";

it('intersect', function () {
    assert.deepEqual(Array.from(intersect([1, 2, 3, 4, 2, 4], [4, 5, 6, 1, 1])), [4, 1]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).intersect([4, 5, 6, 1]).toarray(), [4, 1]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).intersect([4, 6], x => x % 3).toarray(), [4, 6]);
});



export const samples = [
    () => intersect([1, 2, 2, 3], [3, 3, 1]),
    () => intersect(['a', 'c', 'ddd'], ['r', 'ww', 'ttt', 'oooo'], x => x.length)
];

export const linq = "Intersect";
export const lodash = ["intersection", "intersectionBy", "intersectionWith"];