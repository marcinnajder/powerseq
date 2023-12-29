import * as assert from "assert";
import { ignoreelements } from "../../src/index";

it('ignoreelements', function () {
    assert.deepEqual(Array.from(ignoreelements([1, 2, 3])), []);
    assert.deepEqual([...ignoreelements()([1, 2, 3])], []);
});

export const samples = [
    () => ignoreelements([1, 3, 2])
];

export const rxjs = "ignoreElements";