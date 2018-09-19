import * as assert from "assert";
import { Enumerable, ignoreelements } from "../../src/enumerable";

it('ignoreelements', function () {
    assert.deepEqual(Array.from(ignoreelements([1, 2, 3])), []);
    assert.deepEqual(Enumerable.from([1, 2, 3]).ignoreelements().toarray(), []);

    assert.deepEqual([...ignoreelements()([1, 2, 3])], []);
});

export const samples = [
    () => ignoreelements([1, 3, 2])
];

export const rxjs = "ignoreElements";