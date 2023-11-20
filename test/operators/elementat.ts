import * as assert from "assert";
import { Enumerable, elementat } from "../../src/enumerable";

it('elementat', function () {
    assert.deepEqual(elementat([1, 2, 13, 123, 114, 5, 6], 3), 123);
    assert.deepEqual(Enumerable.from([0, 1]).elementat(5), undefined);
    assert.deepEqual(Enumerable.from([0, 1]).elementat(-5), undefined);
    assert.deepEqual(Enumerable.from([0, 1]).elementat(5, 100), 100);

    assert.deepEqual(elementat(3)([1, 2, 13, 123, 114, 5, 6]), 123);
});

export const samples = [
    () => elementat([1, 2, 12, 15], 2),
    () => elementat([1, 2, 12, 15], 20),
    () => elementat([1, 2, 12, 15], 20, 100)
];

export const lodash = "nth";
export const rxjs = "elementAt";
export const fsharp = "nth";
export const kotlin = ["elementAt", "elementAtOrElse", "elementAtOrNull"];
export const clojure = ["nth", "get~"];