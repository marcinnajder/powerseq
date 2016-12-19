import * as assert from "assert";
import { Enumerable, includes } from "../../src/index";

it('includes', function () {
    assert.deepEqual(includes([1, 2, 3], 2), true);
    assert.deepEqual(Enumerable.from([]).includes(1), false);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 5]).includes(4), true);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 5]).includes(10), false);
    assert.deepEqual(Enumerable.from([0, 1, 2, 3, 4]).includes(3, 3), true);        //fromIndex
    assert.deepEqual(Enumerable.from([0, 1, 2, 3, 4]).includes(3, 4), true);        //fromIndex
});

export const linq = "Contains";