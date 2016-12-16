import * as assert from "assert";
import { Enumerable } from "../../src/index";

it('range', function () {
    assert.deepEqual(Enumerable.range(0, 4).toarray(), [0, 1, 2, 3]);
    assert.deepEqual(Enumerable.range(-2, 4).toarray(), [-2, -1, 0, 1]);
    assert.deepEqual(Enumerable.range(0, -2).toarray(), []);
});

export const linq = "Range";