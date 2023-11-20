import * as assert from "assert";
import { Enumerable, min } from "../../src/enumerable";

it('min', function () {
    assert.deepEqual(min([1, 2, 3, 1, 2, 3]), 1);
    assert.deepEqual(Enumerable.from([]).min(), undefined);
    assert.deepEqual(Enumerable.from([1]).min(), 1);
    assert.deepEqual(Enumerable.from([1, 2, 3, 1, 2, 3]).min(), 1);
    assert.deepEqual(Enumerable.from([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }, { id: 2 }, { id: 3 }]).min(x => x.id), 1);

    assert.deepEqual(min()([1, 2, 3, 1, 2, 3]), 1);
});

export const samples = [
    () => min([1, 2, 3, 1]),
    () => min(['a', 'bb', 'rrr', 'd'], x => x.length)
];

export const linq = "Min";
export const lodash = "min";
export const rxjs = "min";
export const fsharp = "min";
export const kotlin = "minOf";
export const java = "min";