import * as assert from "assert";
import { Enumerable, some } from "../../src/enumerable";

it('some', function () {
    assert.deepEqual(some([1, 2]), true);
    assert.deepEqual(Enumerable.from([1, 2]).some(), true);
    assert.deepEqual(Enumerable.from([]).some(), false);
    assert.deepEqual(Enumerable.from([1, 2]).some(x => x > 1), true);
});

export const samples = [
    () => some([1]),
    () => some([]),
    () => some([1, 2, 3], x => x > 2),
    () => some([1, 2, 3], x => x > 3),
];

export const jsarray = "some";
export const linq = "Any";
export const lodash = "some";
export const fsharp = "exists";