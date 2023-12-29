import * as assert from "assert";
import { isempty } from "../../src/index";

it('isempty', function () {
    assert.deepEqual(isempty([]), true);
    assert.deepEqual(isempty([1, 2]), false);

    assert.deepEqual(isempty()([]), true);
});

export const samples = [
    () => isempty([]),
    () => isempty([1, 2])
];

export const rxjs = "isEmpty";
export const fsharp = "isEmpty";
export const kotlin = "none";
export const clojure = "empty?";
