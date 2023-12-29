import * as assert from "assert";
import { sequenceequal, sequenceequalp } from "../../src/index";

it('sequenceequal', function () {
    assert.deepEqual(sequenceequal([1, 2, 3], [1, 2, 3], [1, 2, 3]), true);


    assert.deepEqual(sequenceequal([], []), true);
    assert.deepEqual(sequenceequal([1, 2, 3], [1, 2]), false);
    assert.deepEqual(sequenceequal([1, 2, 3], [1, 2, 3], [1, 3, 3]), false);

    assert.deepEqual(sequenceequalp([1, 2, 3])([1, 2, 3]), true);
});

export const samples = [
    () => sequenceequal([1, 2, 3], [1, 2, 3]),
    () => sequenceequal([1, 2, 3], [1, 2, 2]),
    () => sequenceequal([1, 2, 3], [1, 2])
];

export const linq = "SequenceEqual";
export const rxjs = "sequenceEqual";

