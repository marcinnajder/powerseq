import * as assert from "assert";
import { min } from "../../src/index";

it('min', function () {
    assert.deepEqual(min([1, 2, 3, 1, 2, 3]), 1);
    assert.deepEqual(min([]), undefined);
    assert.deepEqual(min([1]), 1);
    assert.deepEqual(min([1, 2, 3, 1, 2, 3]), 1);
    assert.deepEqual(min([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }], x => x.id), 1);

    assert.deepEqual(min()([1, 2, 3, 1, 2, 3]), 1);

    assert.deepEqual(min([10, 5, 1], (x, index) => x * index), 0);
});

export const samples = [
    () => min([1, 2, 3, 1]),
    () => min(['a', 'bb', 'rrr', 'd'], x => x.length),
    () => min(['a', 'bb', 'rrr', 'd'], (x, index) => x.length * index)
];

export const linq = "Min";
export const lodash = "min";
export const rxjs = "min";
export const fsharp = "min";
export const kotlin = "minOf";
export const java = "min";