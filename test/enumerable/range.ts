import * as assert from "assert";
import { Enumerable, range } from "../../src/index";

it('range', function () {
    assert.deepEqual(Enumerable.range(0, 4).toarray(), [0, 1, 2, 3]);
    assert.deepEqual(Enumerable.range(-2, 4).toarray(), [-2, -1, 0, 1]);
    assert.deepEqual(Enumerable.range(0, -2).toarray(), []);
});

export const samples = [
    () => range(10, 4)
];

export const linq = "Range";
export const lodash = "range";
export const rxjs = "range";
