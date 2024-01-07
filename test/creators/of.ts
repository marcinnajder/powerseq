import * as assert from "assert";
import { of } from "../../src/index";

it('of', function () {
    assert.deepEqual([...of()], []);
    assert.deepEqual([...of(1, 2, 3, 4)], [1, 2, 3, 4]);
    assert.deepEqual([...of(1, 2, <any>"a", <any>"b")], [1, 2, "a", "b"]);
});

export const samples = [
    () => of<any>(1, 2, true, 'abc')
];

export const jsarray = "of";
export const rxjs = "of";
export const kotlin = "sequenceOf";
export const java = "of";
