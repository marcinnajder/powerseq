import * as assert from "assert";
import { Enumerable, take } from "../../src/index";

it('take', function () {
    assert.deepEqual(Array.from(take([1, 2, 3, 4], 2)), [1, 2]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).take(0).toarray(), []);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).take(2).toarray(), [1, 2]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).take(10).toarray(), [1, 2, 3, 4]);
});

export const samples = [
    () => take([1, 2, 3, 4, 5], 2)
];

export const linq = "Take";
export const lodash = "take";
