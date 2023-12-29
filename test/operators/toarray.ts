import * as assert from "assert";
import { toarray } from "../../src/index";
import { return123Iterator } from "../common";

it('toarray', function () {
    assert.deepEqual(toarray(return123Iterator()), [1, 2, 3]);
    assert.deepEqual(toarray([]), []);
    assert.deepEqual(toarray([1, 2, 3]), [1, 2, 3]);
    assert.deepEqual(toarray()(return123Iterator()), [1, 2, 3]);
});

export const samples = [
    () => toarray([1, 2, 2])
];

export const linq = "ToArray";
export const fsharp = "toArray";
export const kotlin = "toList";
export const java = ["toArray", "toList", "C.toList"];