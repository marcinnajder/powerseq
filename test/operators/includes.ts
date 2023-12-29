import * as assert from "assert";
import { includes, includesp } from "../../src/index";

it('includes', function () {
    assert.deepEqual(includes([1, 2, 3], 2), true);
    assert.deepEqual(includes([], 1), false);
    assert.deepEqual(includes([1, 2, 3, 4, 5], 4), true);
    assert.deepEqual(includes([1, 2, 3, 4, 5], 10), false);
    assert.deepEqual(includes([0, 1, 2, 3, 4], 3, 3), true);        //fromIndex
    assert.deepEqual(includes([0, 1, 2, 3, 4], 3, 4), false);
    assert.deepEqual(includes([0, 1, 2, 3, 4], 0, 0), true);
    assert.deepEqual(includes([0, 1, 2, 3, 4], 4, 4), true);

    assert.deepEqual(includesp(4)([1, 2, 3, 4, 5]), true);
});

export const samples = [
    () => includes([1, 2, 3], 2),
    () => includes([1, 2, 3], 5),
    () => includes([1, 2, 3], 3, /*fromIndex*/ 4)
];

export const jsarray = "includes";
export const linq = "Contains";
export const lodash = "includes";
export const fsharp = "contains";
export const kotlin = "contains";
export const clojure = "contains?";