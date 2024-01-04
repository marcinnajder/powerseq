import * as assert from "assert";
import { last } from "../../src/index";

it('last', function () {
    assert.equal(last([1, 2]), 2);
    assert.equal(last([]), undefined);
    assert.equal(last([1, 2, 2, 4, 4, 3, 1], x => x > 2), 3);
    assert.equal(last([1, 2, 2, 4, 4, 3, 1], (x, index) => index < 5 && x > 2), 4);
    assert.equal(last([1, 2, 2, 4, 4, 3, 1], x => x > 2), 3);
    assert.equal(last([1, 2, 3, 4], x => x > 4), undefined);

    assert.equal(last((x: number) => x > 2)([1, 2, 2, 4, 4, 3, 1]), 3);

    assert.equal(last([1, 2, 3], x => x > 10, -1), -1);
});

export const samples = [
    () => last([1, 2, 3]),
    () => last([]),
    () => last([1, 2, 3, 4, 5], x => x > 2),
    () => last([1, 2, 3, 4, 5], (x, index) => x > 2 && index < 4),
    () => last([1, 2, 3, 4, 5], x => x > 10),
    () => last([1, 2, 3, 4, 5], x => x > 10, -1),
];

export const linq = ["Last", "LastOrDefault"];
export const lodash = "findLast";
export const rxjs = "last";
export const fsharp = "last";
export const kotlin = ["findLast", "last~"];