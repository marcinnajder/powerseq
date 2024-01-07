import * as assert from "assert";
import { interleave, interleavep, pipe } from "../../src/index";

it('interleave', function () {
    assert.deepEqual([...interleave([1, 2, 3])], [1, 2, 3]);
    assert.deepEqual([...interleave([1, 2, 3], [10, 20, 30])], [1, 10, 2, 20, 3, 30]);
    assert.deepEqual([...interleave([1, 2, 3, 4], [10, 20, 30])], [1, 10, 2, 20, 3, 30]);

    assert.deepEqual([...interleave([1, 2, 3], [10, 20, 30], [100, 200])], [1, 10, 100, 2, 20, 200]);

    assert.deepEqual([...pipe([1, 2, 3], interleavep([10, 20, 30]))], [1, 10, 2, 20, 3, 30]);
});

export const samples = [
    () => interleave([1, 2, 3], [10, 20]),
    () => interleave([-1], [1, 2, 3], [10, 20]),
    () => interleave([1, 2, 3]),
];

export const clojure = "interleave";