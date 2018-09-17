import * as assert from "assert";
import { Enumerable, find } from "../../src/enumerable";

it('find', function () {
    assert.deepEqual(find([1, 2]), 1);
    assert.deepEqual(Enumerable.from([]).find(), undefined);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 2), 3);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find((x, index) => index > 2 && x > 2), 4);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 4), undefined);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x > 4, 100), 100);

    assert.deepEqual(find(x => x > 2)([1, 2, 3, 4]), 3);
});

export const samples = [
    () => find([1, 2, 2, 3, 4]),
    () => find([1, 2, 2, 3, 4], x => x > 2),
    () => find([1, 2, 2, 3, 4], x => x > 4),
    () => find([1, 2, 2, 3, 4], x => x > 4, 100),
    () => find([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)
];

export const jsarray = "find";
export const linq = "First";
export const lodash = ["first", "head", "find"];
export const rxjs = ["find", "first"];
export const fsharp = ["find~", "tryFind", "head"];