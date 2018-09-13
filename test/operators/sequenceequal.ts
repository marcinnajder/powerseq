import * as assert from "assert";
import { Enumerable, sequenceequal } from "../../src/enumerable";

it('sequenceequal', function () {
    assert.deepEqual(sequenceequal([1, 2, 3], [1, 2, 3], [1, 2, 3]), true);
    assert.deepEqual(Enumerable.from([1, 2, 3]).sequenceequal([1, 2, 3]), true);
    assert.deepEqual(Enumerable.from([]).sequenceequal([]), true);
    assert.deepEqual(Enumerable.from([1, 2, 3]).sequenceequal([1, 2]), false);
    assert.deepEqual(Enumerable.from([1, 2, 3]).sequenceequal([1, 2, 3], [1, 3, 3]), false);
});

export const samples = [
    () => sequenceequal([1, 2, 3], [1, 2, 3]),
    () => sequenceequal([1, 2, 3], [1, 2, 2]),
    () => sequenceequal([1, 2, 3], [1, 2])
];

export const linq = "SequenceEqual";
export const rxjs = "sequenceEqual";

