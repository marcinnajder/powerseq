import * as assert from "assert";
import { Enumerable, isempty } from "../../src/index";

it('isempty', function () {
    assert.deepEqual(isempty([]), true);
    assert.deepEqual(isempty([1, 2]), false);
});

export const samples = [
    () => isempty([]),
    () => isempty([1, 2])
];

export const rxjs = "isEmpty";