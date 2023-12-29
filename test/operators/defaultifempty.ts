import * as assert from "assert";
import { defaultifemptyp, defaultifempty } from "../../src/index";

it('defaultifempty', function () {
    assert.deepEqual([...defaultifempty([1, 2, 3])], [1, 2, 3]);

    assert.deepEqual([...defaultifempty([1, 2, 3])], [1, 2, 3]);
    assert.deepEqual([...defaultifempty([])], [undefined]);
    assert.deepEqual([...defaultifempty([], 4)], [4]);

    assert.deepEqual([...defaultifemptyp()([1, 2, 3])], [1, 2, 3]);
});

export const samples = [
    () => defaultifempty([1, 2, 3]),
    () => defaultifempty([]),
    () => defaultifempty([], 10)
];

export const linq = "DefaultIfEmpty";
export const rxjs = "defaultIfEmpty";
export const kotlin = "ifEmpty";
