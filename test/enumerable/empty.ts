import * as assert from "assert";
import { empty } from "../../src/index";

it('empty', function () {
    assert.deepEqual([...empty<number>()], []);
});

export const samples = [
    () => empty<number>()
];

export const rxjs = "empty";
export const fsharp = "empty";
export const kotlin = "emptySequence";
export const java = "empty";