import * as assert from "assert";
import { Enumerable, skiplast } from "../../src/index";

it('skiplast', function () {
    assert.deepEqual(Array.from(skiplast([1, 2, 3, 4], 2)), [1, 2]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skiplast(0).toarray(), [1, 2, 3, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skiplast(1).toarray(), [1, 2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skiplast(5).toarray(), []);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).skiplast(4).toarray(), []);
    assert.deepEqual(Enumerable.from([]).skiplast(5).toarray(), []);
});

export const samples = [
    () => skiplast([1, 2, 3, 4], 2),
    () => skiplast([1, 2, 3, 4], 0),
    () => skiplast([1, 2, 3, 4], 5)
];

export const lodash = ["dropRight", "initial"];