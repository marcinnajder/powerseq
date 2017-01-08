import * as assert from "assert";
import { Enumerable, last } from "../../src/index";

it('last', function () {
    assert.deepEqual(last([1, 2]), 2);
    assert.deepEqual(Enumerable.from([]).last(), undefined);
    assert.deepEqual(Enumerable.from([1, 2, 2, 4, 4, 3, 1]).last(x => x > 2), 3);
    assert.deepEqual(Enumerable.from([1, 2, 2, 4, 4, 3, 1]).last((x, index) => index < 5 && x > 2), 4);
    assert.deepEqual(Enumerable.from([1, 2, 2, 4, 4, 3, 1]).last(x => x > 2), 3);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 4), undefined);
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