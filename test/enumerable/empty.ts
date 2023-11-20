import * as assert from "assert";
import { Enumerable, empty } from "../../src/enumerable";

it('empty', function () {
    var result = Enumerable.empty<number>();
    assert.deepEqual(result.toarray(), []);
});

export const samples = [
    () => empty<number>()
];

export const rxjs = "empty";
export const fsharp = "empty";
export const kotlin = "emptySequence";
export const java = "empty";