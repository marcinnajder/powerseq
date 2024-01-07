import * as assert from "assert";
import { intersect } from "../../src/index";

it('intersect', function () {
    assert.deepEqual(Array.from(intersect([1, 2, 3, 4, 2, 4], [4, 5, 6, 1, 1])), [4, 1]);
    assert.deepEqual(Array.from(intersect([4, 5, 6, 1, 1])([1, 2, 3, 4, 2, 4])), [4, 1]);
});



export const samples = [
    () => intersect([1, 2, 2, 3], [3, 3, 1]),
];

export const linq = "Intersect";
export const lodash = "intersection";
export const kotlin = "intersect~";
export const clojure = "intersection~";