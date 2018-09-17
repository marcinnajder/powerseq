import * as assert from "assert";
import { Enumerable, except } from "../../src/enumerable";

it('except', function () {
    assert.deepEqual(Array.from(except([1, 2, 3, 4, 2, 4], [4, 5, 6, 1])), [2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).except([4, 5, 6, 1]).toarray(), [2, 3]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4, 2, 4]).except([4, 6], x => x % 3).toarray(), [2]);

    assert.deepEqual(Array.from(except([4, 5, 6, 1])([1, 2, 3, 4, 2, 4])), [2, 3]);
});

export const samples = [
    () => except([1, 2, 2, 3, 4], [2, 3]),
    () => except(['a', 'b', 'ba', 'xde'], ['poc'], x => x.length),
];

export const linq = "Except";
export const lodash = ["difference", "differenceBy", "differenceWith", "without"];
