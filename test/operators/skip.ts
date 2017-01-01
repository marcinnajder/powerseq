import * as assert from "assert";
import { Enumerable, skip } from "../../src/index";

it('skip', function () {
    assert.deepEqual(Array.from(skip([1, 2, 3, 4], 1)), [2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skip(0).toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skip(1).toarray(), [2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skip(5).toarray(), []);
});

export const linq = "Skip";

export const samples = [
    () => skip([1, 2, 3, 4, 5], 2)
];