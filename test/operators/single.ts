import * as assert from "assert";
import { Enumerable, single } from "../../src/enumerable";

it('single', function () {
    assert.deepEqual(single([1, 3, 4, 6, 1], x => x > 5), 6);
    assert.deepEqual(Enumerable.from([]).single(), undefined);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).find(x => x < 0), undefined);
    assert.throws(() => {
        single([1, 3, 2, 0], x => x > 1);
    }, "More than one element satisfies the condition in predicate.");
    assert.throws(() => {
        single([1, 3]);
    }, "More than one element satisfies the condition in predicate.");

    assert.deepEqual(single()([]), undefined);
});

export const samples = [
    () => single([1]),
    () => single([1, 2, 3], x => x > 2),
    () => single([1, 2, 3], x => x > 1)
];

export const linq = "Single";
export const rxjs = "single";
export const fsharp = "exactlyOne";
export const kotlin = "single";