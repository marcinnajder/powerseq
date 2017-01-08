import * as assert from "assert";
import { Enumerable, findindex } from "../../src/index";

it('findIndex', function () {
    assert.deepEqual(findindex([1, 2], x => x > 0), 0);
    assert.deepEqual(Enumerable.from([1, 2]).findindex(x => x > 0), 0);
    assert.deepEqual(Enumerable.from([1, 2]).findindex(x => x > 1), 1);
    assert.deepEqual(Enumerable.from([1, 2]).findindex(x => x > 2), undefined);
});

export const samples = [
    () => findindex([1, 2, 2, 3, 4], x => x > 1),
    () => findindex([1, 2, 2, 3, 4], (x, index) => x > 1 && index > 2)
];

export const jsarray = "findIndex";
export const lodash = "findIndex";
export const rxjs = "findIndex";