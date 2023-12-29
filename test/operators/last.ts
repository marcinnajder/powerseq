import * as assert from "assert";
import { last } from "../../src/index";

it('last', function () {
    assert.deepEqual(last([1, 2]), 2);
    assert.deepEqual(last([]), undefined);
    assert.deepEqual(last([1, 2, 2, 4, 4, 3, 1], x => x > 2), 3);
    assert.deepEqual(last([1, 2, 2, 4, 4, 3, 1], (x, index) => index < 5 && x > 2), 4);
    assert.deepEqual(last([1, 2, 2, 4, 4, 3, 1], x => x > 2), 3);
    assert.deepEqual(last([1, 2, 3, 4], x => x > 4), undefined);

    assert.deepEqual(last((x: number) => x > 2)([1, 2, 2, 4, 4, 3, 1]), 3);
});

export const samples = [
    () => last([1, 2, 3]),
    () => last([]),
    () => last([1, 2, 3, 4, 5], x => x > 2),
    () => last([1, 2, 3, 4, 5], (x, index) => x > 2 && index < 4)
];

export const linq = "Last";
export const lodash = "findLast";
export const rxjs = "last";
export const fsharp = "last";
export const kotlin = ["findLast", "last~"];